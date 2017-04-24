const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const env        = require('../config/env');

// Require models
const User         = require('../models/user');
const Question     = require('../models/question');

mongoose.connect(env.db, () => {
  console.log('Connected');
});

User.collection.drop();
Question.collection.drop();

User
  .create([
    {
      username: 'mgscott ',
      email: 'mgscott@mgscott.com',
      password: 'mgscott',
      passwordConfirmation: 'mgscott'
    }
  ])
  .then(users => {
    console.log(`${users.length} were created`);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  })
  .finally(() => {
    mongoose.connection.close();
  });

Question
  .create([
    {
      question: 'Would you rather:',
      option1: 'never be allowed to use the internet again',
      option2: 'never be allowed to leave your country'
    }
  ])
  .then(questions => {
    console.log(`${questions.length} were created`);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  })
  .finally(() => {
    mongoose.connection.close();
  });
