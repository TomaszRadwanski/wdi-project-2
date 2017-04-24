const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, trim: true, required: true},
  option1: { type: String, trim: true, required: true },
  option2: { type: String, trim: true, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);
