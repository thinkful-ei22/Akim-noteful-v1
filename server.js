'use strict';

const express = require('express');

const data = require('./db/notes');

const app = express();

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    let queryString = req.query.searchTerm;
    if(queryString !== undefined) {
        res.json(
            data.filter(item =>
            item.title.includes(queryString)
            ||item.content.includes(queryString)
        )
        );
    }

    else {
    res.json(data);
    }
    console.log(req.query);
});

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const queryString = req.query.searchTerm
    res.json(data.find(item => item.id === parseInt(id)));
    console.log('with ID');
});


app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
