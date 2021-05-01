const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');
const uuidv4 = require('uuid').v4;
const cors = require('cors');
const fs = require("fs");

const app = express();
const port = 3030;

app.use(cors());

app.use(bodyParser.json({ limit: '5tb' }));
app.use(bodyParser.urlencoded({
  extended: false
}));

// MongoDB client link to connect to the Database.
let connected = false;
const client = new MongoClient(
  'mongodb+srv://dbUser:MarkeTreePassword@marketree.ridw2.mongodb.net/MarkeTree?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Function to connect with MongoDB and ensure the connection.
async function ensureConnection() {
  if (connected) return;
  try {
    await client.connect();
    connected = true;
  } catch (e) {
    console.error('unable to connect to MongoDB', e);
  }
}


// with a username and password
// INPUT: { username, password }
// OUTPUT: { cookie } or { err }
app.post('/api/create-user', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  console.log(username);
  console.log(password);

  if (username == null || username == '' || password == null || password == '') {
    res.json('bad username/password characters');
    return;
  }

  await ensureConnection();
  try {
    let db = client.db('MarkeTree');
    let collection = db.collection('Users');
    let existinguser = await collection.findOne({ username: username });
    if (existinguser) {
      console.log("note: user already exists ", existinguser);
      res.json({ err: 'user already exists' });
      return;
    }
  } catch (e) {
    console.error('Unable to search database', e);
    res.json({ err: 'unable to add user' });
    return;
  }

  let saltBuff = crypto.randomBytes(128);
  let salt = saltBuff.toString('hex');
  let saltedPass = password + salt;

  let hasher = crypto.createHash('sha256');
  hasher.update(saltedPass);
  let hashedPass = hasher.digest('hex');

  let cookieBuff = crypto.randomBytes(128);
  let cookie = cookieBuff.toString('hex');

  let cookieSaltBuff = crypto.randomBytes(128);
  let cookieSalt = cookieSaltBuff.toString('hex');

  let saltedCookie = cookie + cookieSalt;

  let hasherCookie = crypto.createHash('sha256');
  hasherCookie.update(saltedCookie);

  let cookieHash = hasherCookie.digest('hex');

  let user = {
    user_id: uuidv4(),
    username: username,
    password_hash: hashedPass,
    password_salt: salt,
    user_rating: null,
    number_ratings: 0,
    cookie_hash: cookieHash,
    cookie_salt: cookieSalt,
  }

  try {
    let db = client.db('MarkeTree');
    let collection = db.collection('Users');
    await collection.insertOne(user);
  } catch (e) {
    console.error('Unable to search database', e);
    res.json({ err: 'unable to add user' });
    return;
  }

  res.json({ cookie: cookie });
});

// With a username and a password
// INPUT: { username, password }
// OUTPUT: { cookie } or { err }
app.post('/api/authenticate-user', async (req, res) => {
  // username-password for now
  let username = req.body.username;
  let password = req.body.password;
  // assumed strings, not null
  console.log("User '" + username + "' attemps to login");
  let userId = null;
  await ensureConnection();
  try {
    let db = client.db('MarkeTree');
    let collection = db.collection('Users');
    let document = await collection.findOne({
      username: username
    });

    if (document != null) {
      let salt = document.password_salt;
      let saltedPass = password + salt;

      let hasher = crypto.createHash('sha256');
      hasher.update(saltedPass);
      let hashedPass = hasher.digest('hex');
      if (document.password_hash == hashedPass) {
        userId = document.user_id;
      } else {
        console.log('bad password');
        userId = null;
      }
    } else {
      console.log('bad username');
      userId = null;
    }
  } catch (e) {
    console.error('Unable to search database', e);
    res.json({ err: 'unable to authenticate user' });
    return;
  }

  if (userId == null) {
    res.json({ err: 'bad username/password combination' });
    return;
  }

  // create a cookie for the user
  let cookieBuff = crypto.randomBytes(128);
  let cookie = cookieBuff.toString('hex');

  let cookieSaltBuff = crypto.randomBytes(128);
  let cookieSalt = cookieSaltBuff.toString('hex');

  let saltedCookie = cookie + cookieSalt;

  let hasherCookie = crypto.createHash('sha256');
  hasherCookie.update(saltedCookie);

  let cookieHash = hasherCookie.digest('hex');

  await ensureConnection();
  try {
    let db = client.db('MarkeTree');
    let collection = db.collection('Users');
    await collection.updateOne({ user_id: userId }, { $set: { cookie_hash: cookieHash, cookie_salt: cookieSalt } });
  } catch (e) {
    console.error('this is really bad...', e);
    res.json({ err: 'unable to authorize user' });
    return;
  }

  console.log(username + "'s cookie: " + cookie);
  res.json({ cookie: cookie });
});


// Verifies a cookie is a certain user and returns the user object.
async function verifyCookie(cookie) {
  let allUsers = null;
  await ensureConnection();
  try {
    let db = client.db('MarkeTree');
    let collection = db.collection('Users');
    let cursor = collection.find({}); // high effort, high quality, high efficiency code here.
    allUsers = await cursor.toArray();
  } catch (e) {
    console.error('this pretty bad...', e);
    return null;
  }

  for (user of allUsers) {
    let cookieHash = user.cookie_hash;
    let cookieSalt = user.cookie_salt;

    let hasher = crypto.createHash('sha256');
    hasher.update(cookie + cookieSalt);

    let foundCookieHash = hasher.digest('hex');

    if (foundCookieHash == cookieHash) {
      let outputUser = {
        username: user.username,
        email: user.email,
        user_rating: user.user_rating,
        number_ratings: user.number_ratings,
        rpi_status: user.rpi_status,
      };
      return outputUser;
    }
  }

  return null;
}

// With a cookie token
// INPUT: { cookie }
// OUTPUT: { success: true, user } or { err }
app.post('/api/verify-user', async (req, res) => {
  let cookie = req.body.cookie;

  let user = await verifyCookie(cookie);

  if (user == null) {
    console.log('bad cookie: ', cookie);
    res.json({ err: 'unable to verify user' });
  } else {
    res.json({ success: true, user: user });
  }
});

// INPUT: {  }
// OUTPUT: { listings: [] } or { err }
app.get('/api/listings', async (req, res) => {
  let listings = null;
  await ensureConnection();
  try {
    let db = client.db('MarkeTree');
    let collection = db.collection('Listings');
    let document = collection.find({});
    listings = await document.toArray();
  } catch (e) {
    console.error('Unable to search database', e);
  }
  if (listings == null) {
    res.json({ err: 'Unable to search listings' })
  } else {
    res.json({ listings: listings });
  }
});



// Create an event, store the event info into the Event collection in the MongoDB
// INPUT: { data: { host, eventName, eventLocation, date, time, description } }
// OUTPUT: {  }
app.post('/post-event', async (req, res) => {
  let message = req.body.data;
  console.log(message);
  let host = message.host;
  let name = message.eventName;
  let location = message.eventLocation;
  let date = message.date;
  let time = message.time;
  let desc = message.description;

  var data = date.split("-");
  var tmp = time.split(":");
  var hour = tmp[0];
  var min = tmp[1];

  // Mongodb Connection
  await ensureConnection();
  let db = client.db('MarkeTree');
  let collection = db.collection('Event');
  let id = await collection.countDocuments();
  let document = await collection.insertOne({
    event_id: id,
    event_host: host,
    event_name: name,
    event_location: location,
    event_month: data[1],
    event_day: data[2],
    event_year: data[0],
    event_hour: hour,
    event_min: min,
    event_description: desc
  });

})

// Get the 'event' information from the DB, and send back to the client.
// INPUT: {  }
// OUTPUT: { [] }, a list of events
app.get('/get-event', async (req, res) => {
  await ensureConnection();
  let db = client.db('MarkeTree');
  let collection = db.collection('Event');
  let document = await collection.find();
  let listings = await document.toArray();
  res.send(listings);
})

//image uploading
function readAndWriteFile(singleImg, newPath) {

  fs.readFile(singleImg.path, function (err, data) {
    fs.writeFile(newPath, data, function (err) {
      if (err) console.log('ERRRRRR!! :' + err);
      console.log('Fitxer: ' + singleImg.originalFilename + ' - ' + newPath);
    })
  })
}

// Create listing, store the listing item info into the Listing collection in the MongoDB
// INPUT: { listingData: { username, item, category, description, price, images } }
// OUTPUT: { listing_id } or { err }
app.post('/api/post-listing', async (req, res) => {
  let message = req.body.listingData;
  let username = message.username;
  let item = message.item;
  let category = message.category;
  let description = message.description;
  let price = message.price;
  let images = message.images;

  let time = 1;

  if (item == null || item == '' || category == null || category == ''
    || description == null || description == '' || price == null || price == '') {
    res.json('please fill out all fields');
    return;
  }

  await ensureConnection();

  try {
    let db = client.db('MarkeTree');
    let collection = db.collection('Listings');
    let id = uuidv4();//await collection.countDocuments();
    let document = await collection.insertOne({
      listing_id: id,
      price: price,
      name: item,
      description: description,
      category: category,
      seller: username,
      buyer: null,
      time: time
    });
    userId = document.user_id;

    let bigText = '';

    for (var i = 0; i < images.length; i++) {
      var newPath = '../frontend/src/images/' + id + '/';
      if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath);
      }
      var base64Image = images[i]; //base64 encode image text
      bigText += base64Image + '\n';
      // readAndWriteFile(singleImg, newPath);
    }
    newPath += 'images.img';
    fs.writeFileSync(newPath, bigText);
    console.log('writing base64Images to ' + newPath, bigText.length, 'bytes');

    console.log('responding to post-listing with', { listing_id: id });

    res.json({ listing_id: id });

  } catch (e) {
    console.error('Unable to search database', e);
    res.json({ err: 'unable to search database' });
  }

});

// Browse Listing API
// INPUT: {  }
// OUTPUT: { [] } list of listings
app.get('/browse-listing', async (req, res) => {

  await ensureConnection();
  try {
    let db = client.db('MarkeTree');
    let collection = db.collection('Listings');
    let document = await collection.find({ buyer: null });
    let listings = await document.toArray();

    for (let listing of listings) {
      if (fs.existsSync('../frontend/src/images/' + listing.listing_id + '/images.img')) {
        let imagesText = fs.readFileSync('../frontend/src/images/' + listing.listing_id + '/images.img').toString();
        let images = imagesText.split('\n').filter(e => e != '');
        listing.images = images;
      } else {
        for (let listing of listings) {
          listing.images = [];
        }
      }
    }
    res.send(listings);
  } catch (e) {
    console.error('Unable to search database', e);
  }

})

// Filter Listing API
// INPUT: { cat } category
// OUTPUT: { [] } list of listings
app.get('/filter-listing/:cat', async (req, res) => {
  await ensureConnection();
  try {
    let cat = req.params.cat;
    console.log(cat);
    let db = client.db('MarkeTree');
    let collection = db.collection('Listings');
    let document = await collection.find({ category: cat, buyer: null });
    let listings = await document.toArray();
    for (let listing of listings) {
      if (fs.existsSync('../frontend/src/images/' + listing.listing_id + '/images.img')) {
        let imagesText = fs.readFileSync('../frontend/src/images/' + listing.listing_id + '/images.img').toString();
        let images = imagesText.split('\n').filter(e => e != '');
        listing.images = images;
      } else {
        for (let listing of listings) {
          listing.images = [];
        }
      }
    }
    res.send(listings);
  } catch (e) {
    console.error('Unable to search database', e);
  }
});

//http://localhost:3030/get-listing/1
// INPUT: { id }
// OUTPUT: { listing } or { err }
app.get('/get-listing/:id', async (req, res) => {

  await ensureConnection();
  try {
    let db = client.db('MarkeTree');
    let collection = db.collection('Listings');
    console.log('params', req.params);
    let id = req.params.id;
    let document = await collection.findOne({ listing_id: id });
    if (fs.existsSync('../frontend/src/images/' + id + '/images.img')) {
      let imagesText = fs.readFileSync('../frontend/src/images/' + id + '/images.img').toString();
      let images = imagesText.split('\n').filter(e => e != '');
      document.images = images;
    } else {
      document.images = [];
    }
    console.log('giving back id#', document.listing_id);
    res.json(document);
  } catch (e) {
    console.error('Unable to search database', e);
    res.json({ err: 'unable to search db' });
  }

});

// INPUT: { ratingData: { username, seller, rating, id } }
// OUTPUT: { success: true } or { err }
app.post('/rate-user', async (req, res) => {

  let username = req.body.ratingData.username;
  let seller = req.body.ratingData.seller;
  let rating = req.body.ratingData.rating;
  let listingid = req.body.ratingData.id;

  console.log("BODY: ", req.body);

  await ensureConnection();
  try {
    let db = client.db('MarkeTree');
    let userscollection = db.collection('Users');
    let listingscollection = db.collection('Listings');

    console.log(seller);
    console.log(listingid);
    // listingscollection.findOneAndUpdate();
    let listingdocument = await listingscollection.findOne({ listing_id: listingid });
    let userdocument = await userscollection.findOne({ username: seller });

    let noratings = parseInt(userdocument.number_ratings);
    let currentrating = parseFloat(userdocument.user_rating);

    if (currentrating == null || isNaN(currentrating)) {
      currentrating = 0;
    }

    currentrating = parseFloat((currentrating * noratings + rating) / (noratings + 1));
    console.log('new rating:', currentrating, noratings + 1);
    let newvalues = { $set: { buyer: username } };
    listingscollection.updateOne({ listing_id: listingid }, newvalues);
    newvalues = { $set: { user_rating: currentrating, number_ratings: noratings + 1 } };
    userscollection.updateOne({ username: seller }, newvalues);

    res.json({ success: true });

    // console.log('giving back id#', document.id);
    // res.json(document);
  } catch (e) {
    console.error('Unable to search database', e);
    res.json({ err: 'unable to search db' });
  }
});

/* ******************************  Listen to the port 3000 **********************************************/
app.listen(port, () => {
  console.log('listening on *:3030')
})