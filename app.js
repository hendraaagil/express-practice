const express = require('express');

// express app
const app = express();

// register view engine
// "views" is default dir name
app.set('view engine', 'ejs');
// if dir name not "views"
// app.set('views', 'myviews');

// listen for request
app.listen(3000);

app.get('/', (req, res) => {
  const blogs = [
    {
      title: 'Yoshi finds eggs',
      snippet: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    },
    {
      title: 'Mari finds stars',
      snippet: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    },
    {
      title: 'How to defeat monsters',
      snippet: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    },
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a New Blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404 Not Found!' });
});
