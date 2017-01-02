var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema({
  commenterName: {
    type: String,
    trim: true
  },
  commenterEmail: {
    type: String,
    trim: true
  },
  comment: {
    type: String
  },
  postDate: {
    type: Date,
    default: Date.now
  }
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;