const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

PORT = process.env.PORT || 3000;

//Connect to Mongodb
const dbURI = 'mongodb+srv://<user-id>:<password>@cluster0.mdcck.mongodb.net/<database-name>?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology : true })
    .then((result) => app.listen(PORT, (req, res) => {
        console.log(`Server is running at ${PORT}`);
    }))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//Morgan middleware
app.use(morgan('dev'));

//Middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
  
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});
  
// blog routes
app.use(blogRoutes);


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

