const express = require('express')
const app = express()
const port = 3000


const path = require('path')
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

// About page 
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
app.get('/listing', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/Listing/listing.html'))
})
app.listen(port, () => {
  console.log('listening on *:3000')
})