var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
	title: {
		type: String,
		required: true, 
		unique: true
	},
	thetext: {
		type: String,
		required: true
	},
	url: {
		type: String,
		unique: true
	},
	datestamp: Date,
	comments: [{type: Schema.Types.ObjectId, ref: "articleComment"}]	
});


var newsArticle = mongoose.model("newsArticle", articleSchema);

module.exports = newsArticle;
