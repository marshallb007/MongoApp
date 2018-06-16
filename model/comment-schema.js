var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleComment = new Schema({
	username: {
		type: String,
		require: true
	},
	comment: {
		type: String,
		require: true
	},
	upvotes: {
		type: Number,
		default: 0
	},
	downvotes: {
		type: Number,
		default: 0
	},
	deleteflag: {
		type: Number,
		default: false
	},
	datestamp: String
});

var articleComment = mongoose.model("articleComment", articleComment);

module.exports = articleComment;