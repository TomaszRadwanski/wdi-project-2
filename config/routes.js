const express = require('express');
const router  = express.Router();

const questions = require('../controllers/questions');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');

// function secureRoute(req, res, next) {
//   if (!req.session.userId) {
//     return req.session.regenerate(() => {
//       req.flash('danger', 'You must be logged in.');
//       res.redirect('/login');
//     });
//   }
//
//   return next();
// }

router.get('/', (req, res) => res.render('statics/home'));

router.route('/questions')
  .get(questions.index)
  .post(questions.create);
router.route('/questions/new')
  .get(questions.new);
router.route('/questions/:id')
  .get(questions.show)
  .put(questions.update)
  .delete(questions.delete);
router.route('/questions/:id/edit')
  .get(questions.edit);
router.route('/questions/:id/option2')
  .post(questions.option2);
router.route('/questions/:id/option1')
  .post(questions.option1);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);
router.route('/logout')
  .get(sessions.delete);

module.exports = router;
