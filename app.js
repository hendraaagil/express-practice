const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongodb
const dbURI =
  'mongodb+srv://hendra:agil123@nodetuts.did91.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
// "views" is default dir name
app.set('view engine', 'ejs');
// if dir name not "views"
// app.set('views', 'myviews');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog two',
    snippet: 'about my new blog',
    body: 'more about my new blog',
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('5f0ef04691e4070ab8ab7f5f')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// routes
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
