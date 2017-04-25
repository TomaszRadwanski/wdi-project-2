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


module.exports = {
  index: questionsIndex,
  show: questionsShow,
  new: questionsNew,
  create: questionsCreate,
  edit: questionsEdit,
  update: questionsUpdate,
  delete: questionsDelete
};
