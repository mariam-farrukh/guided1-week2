const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    // get data from database and return it to the client
    // select * from posts
    //in knex documentation this is knex.select, but we just rename it with our db.
    // db.select('*')
    db('posts') //this is our table
    .select('title', 'contents')
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.json(err);
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    db('posts')
    .where({id})
    .first() //picks the first element from the resulting array
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.json(err);
    })
});

router.post('/', (req, res) => {
//insert into pots () values ()
    const postData =req.body;
    //validate the data before inserting into db
    db('posts')
    .insert(postData, 'id') //by default this will return the id
    .then(([id]) => {
        db('posts')
            .where({id})
            .first() //picks the first element from the resulting array
            .then(post => {
                res.status(200).json(post);
            })
    })
    .catch(err => {
        res.json(err);
    })

});

router.put('/:id', (req, res) => {
    const changes = req.body;
    db('posts').where('id', req.params.id).update(changes)
    .then(count => {
        res.status(200).json({message: `updated ${count} records`});
    })
    .catch( err => {
        res.json(err);
    })
});

router.delete('/:id', (req, res) => {
    db('posts')
    .where({id: req.params.id})
    .del()
    .then(count => {
        res.status(200).json({message: `deleted ${count} records`});
    })
    .catch( err => {
        res.json(err);
    })
});

module.exports = router;