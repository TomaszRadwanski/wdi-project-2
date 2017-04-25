const mongoose = require('mongoose');

// const voteSchema = new mongoose.Schema({
//   option1Vote: [],
//   option2Vote: []
// });

const questionSchema = new mongoose.Schema({
  question: { type: String, trim: true, required: true},
  option1: { type: String, trim: true, required: true },
  option2: { type: String, trim: true, required: true },
  // votes: [voteSchema]
  option1Vote: [],
  option2Vote: []
}, {
  timestamps: true
});



module.exports = mongoose.model('Question', questionSchema);
// module.exports = mongoose.model('Vote', voteSchema);
