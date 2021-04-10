const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3030;

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
  } 5
});


// app.use(express.static(__dirname + '/frontend'));
// Static Files
app.use(express.static('public'));


// folder example
app.use('/css', express.static(__dirname + './public/css'))
app.use('/js', express.static(__dirname + './public/javascript'))
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



app.post('/post-listing', async (req, res) => {
  let message = req.body.listingData;
  console.log(message);
  let username = message.username;
  let email = message.email;
  let item = message.item;
  let category = message.category;
  let description = message.description;
  let price = message.price;

  let time = Math.floor(Math.random() * 1000) + 1;

  await ensureConnection();

  try {
    let db = client.db('MarkeTree');
    let collection = db.collection('Listings');
    let id = await collection.countDocuments();
    let document = await collection.insertOne({
      listing_id: id,
      price: price,
      name: item,
      description: description,
      category: category,
      seller: 1,
      buyer: null,
      time: time,
      images: null
    });
    userId = document.user_id;
  } catch (e) {
    console.error('Unable to search database', e);
  }

})







// Listen to the port 3000
app.listen(port, () => {
  console.log('listening on *:3030')
})