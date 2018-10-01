const express = require('express');
const data = require('./data.json');
const app = express();
const projects = data.projects;

app.use('/static', express.static('public'));
app.use('/images', express.static('images'));

app.set('view engine', 'pug');

// app.use((req, res, next) => {
//     if(projects.length === 0) {
        
//     }
// });

app.get ('/', (req, res) => {
    
    res.render('index', { projects });
});

app.get ('/about', (req, res) => {
    res.render('about', {projects});
});

app.get('/projects', (req, res) => {
    res.redirect('/');
});

app.get ('/projects/:id', (req, res) => {
    const {id} = req.params;
    if( isNaN(id) || id >= projects.length) {
      return  res.redirect('/');
    }
    res.render('project', {id, projects});
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    const message = "Sorry, that page is not found.";
    console.log(message);
    err.status = 404
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});