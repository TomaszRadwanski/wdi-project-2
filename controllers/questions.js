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
  let opt1Vote;
  let opt2Vote;
  Question
    .findById(questionId)
    .exec()
    .then(data => {
      opt1Vote = data.option1Vote;
      opt2Vote = data.option2Vote;
      if (isInArray(currentUserId, opt1Vote) === true) {
        const index = opt1Vote.indexOf(currentUserId.toString());
        opt1Vote.splice(index, 1);
        opt2Vote.push(currentUserId.toString());
        console.log(data);
        data.save();
        return res.json(data);
      } else if (isInArray(currentUserId, opt2Vote) === false){
        opt2Vote.push(currentUserId.toString());
        console.log(data);
        data.save();
        return res.json(data);
      } else {
        return res.status(202).json({ message: 'Already Scelected' });
      }
      // if ()
    })
    .then(data => {
      res.status(200).json({ message: 'Success' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Fail' });
    });
}
function questionsOption1(req, res) {
  const questionId = req.params.id;
  const currentUserId = res.locals.user._id;
  let opt1Vote;
  let opt2Vote;
  Question
    .findById(questionId)
    .exec()
    .then(data => {
      opt1Vote = data.option1Vote;
      opt2Vote = data.option2Vote;
      if (isInArray(currentUserId, opt2Vote) === true) {
        const index = opt2Vote.indexOf(currentUserId.toString());
        opt2Vote.splice(index, 1);
        opt1Vote.push(currentUserId.toString());
        console.log(data);
        data.save();
        return res.json(data);

      } else if (isInArray(currentUserId, opt1Vote) === false ) {
        opt1Vote.push(currentUserId.toString());
        console.log(data);
        data.save();
        return res.json(data);

      } else {
        return res.status(202).json({ message: 'Already Scelected' });
      }
    })
    .then(data => {
      res.status(200).json({ message: 'Success' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Fail' });
    });
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
