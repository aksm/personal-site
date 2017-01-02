var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var blogPostSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  postDate: {
    type: Date,
    default: Date.now
  },
  postType: {
    type: String
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