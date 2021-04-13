const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');
const uuidv4 = require('uuid').v4;

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

let connected = false;
const client = new MongoClient(
  'mongodb+srv://dbUser:MarkeTreePassword@marketree.ridw2.mongodb.net/MarkeTree?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

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
app.post('/api/create-user', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username == null || username == '' || password == null || password == '') {
    res.json('bad username/password characters');
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
    cookie_hash: cookieHash,
    cookie_salt: cookieSalt,
  }

  await ensureConnection();
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
app.post('/api/authorize-user', async (req, res) => {
  // username-password for now
  let username = req.body.username;
  let password = req.body.password;
  // assumed strings, not null

  let userId = null;
  await ensureConnection();
  try {
    let db = client.db('MarkeTree');
    let collection = db.collection('Users');
    let document = await collection.findOne({
      username: username
    });
    userId = document.user_id;
  } catch (e) {
    console.error('Unable to search database', e);
    res.json({ err: 'unable to authorize user' });
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

  res.json({ cookie: cookie });
});

// With a cookie token
app.post('/api/verify-user', async (req, res) => {
  let cookie = req.body.cookie;

  let allUsers = null;
  await ensureConnection();
  try {
    let db = client.db('MarkeTree');
    let collection = db.collection('Users');
    let cursor = collection.find({}); // high effort, high quality, high efficiency code here.
    allUsers = await cursor.toArray();
  } catch (e) {
    console.error('this pretty bad...', e);
    res.json({ err: 'unable to verify user' });
    return;
  }

  for (user of allUsers) {
    let cookieHash = user.cookie_hash;
    let cookieSalt = user.cookie_salt;

    let hasher = crypto.createHash('sha256');
    hasher.update(cookie + cookieSalt);
    
    let foundCookieHash = hasher.digest('hex');

    if (foundCookieHash == cookieHash) {
      res.json({ success: true });
      return;
    }
  }
  console.log('bad cookie: ', cookie);
  res.json({ err: 'unable to verify user' });
});

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
  }5
});


// app.use(express.static(__dirname + '/frontend'));
// Static Files
app.use(express.static('public'));


// folder example
app.use('/css', express.static(__dirname + './public/css'))
app.use('/css', express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")))

app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
// Set View's
// app.set('views', './frontend');
// app.set('view engine', 'ejs');


// Navigation
app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/Dashboard/dashboard.html'))
})

// Home Page
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/Dashboard/dashboard.html'))
})

// Home page after login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/LoginDashboard/LoginDashboard.html'))

})
// About
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/About/about.html'))
})

// Event Page
app.get('/event', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/BrowseEvents/browseEvents.html'))
})

// Profile Page
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/Profile/profile.html'))
})

// Help center
app.get('/help', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/FileScam/fileScam.html'))
})

//BrowseListing api
app.get('/browselisting', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/BrowseListings/browseListings.html'))
})
// listing api
app.get('/listing', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/Listing/listing.html'))
})


//Create Listing API
app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/CreateListing/createListing.html'))
})

// Listen to the port 3000
app.listen(port, () => {
  console.log('listening on *:3000')
})