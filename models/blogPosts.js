var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var blogPostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  postDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  postType: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true,
    unique: true
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]

});

var BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;