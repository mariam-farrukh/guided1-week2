const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    // get data from database and return it to the client
    // select * from posts
    //in knex documentation this is knex.select, but we just rename it with our db.
    db.select('*')
    .from('posts') //this is our table
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.json(err);
    })
});

router.get('/:id', (req, res) => {

});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;