const Question = require('../models/question');
// function questionsVote(req, res) {
//   Question
//   .find()
//   .exec()
//   .then(() => {
//     console.log(res.locals.user);
//     console.log(req.params.id);
//   });
// }
function questionsIndex(req, res) {
  Question
    .find()
    .exec()
    .then(questions => {
      return res.render('questions', { questions });
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
  // questionsVote();
}
function questionsShow(req, res) {
  Question
    .findById(req.params.id)
    .exec()
    .then(question => {
      if (!question) {
        return res.render('error', { error: 'No question found.' });
      }
      return res.render('questions/show', { question });
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}
function questionsNew(req, res) {
  return res.render('questions/new');
}
function questionsCreate(req, res) {
  Question
    .create(req.body)
    .then(question => {
      if (!question) return res.render('error', { error: 'Question was not created' });
      return res.redirect('/questions');
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}
function questionsEdit(req, res) {
  Question
    .findById(req.params.id)
    .exec()
    .then(question => {
      if (!question) {
        return res.render('error', { error: 'No questionSchema found.' });
      }
      return res.render('questions/edit', { question });
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}
function questionsUpdate(req, res) {
  Question
    .findById(req.params.id)
    .exec()
    .then((question) => {
      if (!question) {
        return res.render('error', { error: 'No question was found.'});
      }
      for (const field in req.body) {
        question[field] = req.body[field];
      }
      return question.save();
    })
    .then((question) => {
      if (!question) {
        return res.render('error', { error: 'Something went wrong during the update.'});
      }
      return res.render('questions/show', { question });
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}
function questionsDelete(req, res) {
  Question
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      return res.redirect('/questions');
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function questionsOption2(req, res) {
  const questionId    = req.params.id;
  const currentUserId = res.locals.user._id;

  Question
    .findById(questionId)
    .exec()
    .then(data => {

      if (isInArray(currentUserId, data.option1Vote) === true) {
        const index = data.option1Vote.indexOf(currentUserId.toString());
        data.option1Vote.splice(index, 1);
        data.option2Vote.push(currentUserId.toString());
        console.log(data);
        data.save();
      } else if (isInArray(currentUserId, data.option2Vote) === false){
        data.option2Vote.push(currentUserId.toString());
        console.log(data);
        data.save();
      } else {
        console.log('nopeee**************');
      }
      return console.log('done');
      // if ()
    });
}
function questionsOption1(req, res) {
  const questionId = req.params.id;
  const currentUserId = res.locals.user._id;
  Question
    .findById(questionId)
    .exec()
    .then(data => {
      if (isInArray(currentUserId, data.option2Vote) === true) {
        const index = data.option2Vote.indexOf(currentUserId.toString());
        data.option2Vote.splice(index, 1);
        data.option1Vote.push(currentUserId.toString());
        console.log(data);
        return data.save();
      } else if (isInArray(currentUserId, data.option1Vote) === false ) {
        data.option1Vote.push(currentUserId.toString());
        console.log(data);
        return data.save();
      } else {
        return res.status(500).json({ message: 'Error' });
      }
    })
    .then(data => {
      res.status(200).json({ message: 'Success' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Fail' });
    })
}


module.exports = {
  index: questionsIndex,
  show: questionsShow,
  new: questionsNew,
  create: questionsCreate,
  edit: questionsEdit,
  update: questionsUpdate,
  delete: questionsDelete,
  option2: questionsOption2,
  option1: questionsOption1
};
