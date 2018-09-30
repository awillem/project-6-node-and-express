const express = require('express');
const data = require('./data.json');
const app = express();
const projects = data.projects;

app.use('/static', express.static('public'));
app.use('/images', express.static('images'));

app.set('view engine', 'pug');

app.get ('/', (req, res) => {
    
    res.render('index', { projects });
});

app.get ('/about', (req, res) => {
    res.render('about', {projects});
});

app.get ('/projects/:id', (req, res) => {
    const {id} = req.params;
    res.render('project', {id, projects});
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});