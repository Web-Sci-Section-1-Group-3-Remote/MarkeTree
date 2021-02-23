const express = require('express')
const app = express()
const port = 3000
const http = require('http')

app.use(express.static(__dirname + '/'));

// Connecting to the html page with file reading.
// const fs = require('fs');
// const server = http.createServer((req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   fs.readFile('./index.html', (err, data) => {
//     if (err) {
//       console.log(err);
//       res.end();
//     } else {
//       res.write(data);
//       res.end();
//     }
//   })
// });

app.listen(port, () => {
  console.log('listening on *:3000')
})