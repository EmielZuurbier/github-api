const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const fetch = require('node-fetch');
const open = require('open');
const CacheService = require('./cache');
const { getUser, searchUsers } = require('./github-api');

const app = express();

const ttl = 60 * 60 * 1; // cache for 1 Hour.
const searchCache = new CacheService(ttl); // Create a new cache service instance.
const userCache = new CacheService(ttl); // Create a new cache service instance.

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('build'));

// Home page.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/users/:name', async (req, res) => {
  const { name } = req.params;

  // Check cache if request has been made before.
  const user = await userCache.get(name, async () => {
    const foundUser = await getUser(name);
    return foundUser;
  });

  res.json({
    message: `User ${name} fetched`,
    user
  });
  
});

// Search endpoint.
app.post('/search', async (req, res) => {
  const { query } = req.body;

  // Return empty results.
  if (query === '') {
    res.json({
      message: 'No query has been given',
      users: []
    });
  }

  // Check cache if request has been made before.
  const users = await searchCache.get(query, async () => {
    const foundUsers = await searchUsers(query);
    return foundUsers;
  })

  // Send users either fetched or from cache.
  res.json({
    message: `Users found with the "${query}" query`,
    users
  });

});

app.listen(3000);
open('http://localhost:3000/');
console.log('Running server at http://localhost:3000/');