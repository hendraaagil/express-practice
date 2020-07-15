const express = require('express');

// express app
const app = express();

// listen for request
app.listen(3000);

app.get('/', (req, res) => {
  // res.send('<p>Homepage</p>');
  res.sendfile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  // res.send('<p>About Page</p>');
  res.sendfile('./views/about.html', { root: __dirname });
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 page
app.use((req, res) => {
  res.status(404).sendfile('./views/404.html', { root: __dirname });
});
