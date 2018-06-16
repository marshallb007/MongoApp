var express = require("express");

var path = require("path");
var moment = require("moment");
var bodyParser = require("body-parser");
var scraper = require("./scraper");
var mongoose = require("mongoose");
var mongoconnect = require("../config/mongoconnect");
var articleComment = require("../model/comment-schema");
var newsArticle = require("../model/article-schema");


module.exports = function(app) {

    app.get("/", function(req, res, next) {

        console.log("query = " + req.query.artid);
        if (!req.query.artid) {
            newsArticle.count().exec(function(err, count) {
                var random = Math.floor(Math.random() * count);

                newsArticle.findOne().skip(random).exec(
                    function(err, articles) {

                        console.log("results: " + articles);

                        res.render("index", {
                            articles: articles,
                            commentview: false
                        });

                    });

            })
        } else {
            newsArticle.findOne({
                _id: req.query.artid
            }, function(err, articles) {
                res.render("index", {
                    articles: articles,
                    commentview: false
                });
            });
        }

    })

    .delete("/deletecomment", function(req, res, next){
        console.log("post id to delete" + req.body.postId);
        articleComment.remove({_id: req.body.postId}, function (err){
            if (err) console.log(err);
            if (!err) res.sendStatus(202);

        });
    })

    .get("/commentpage/:artid", function(req, res, next) {
        
        newsArticle.findOne({
            _id: req.params.artid
        }, function(err, articles) {
            res.render("index", {
                articles: articles,
                commentview: true,
                commentbox: true
            });
        });

    })

    .get("/commentshow/:artid", function(req, res, next) {
        newsArticle.findOne({
            _id: req.params.artid
        })
            .populate("comments")
            .exec(function(err, comment) {
              
                var allComments = comment.comments || "";

                newsArticle.findOne({
                    _id: req.params.artid
                }, function(err, articles) {
                    res.render("index", {
                        articles: articles,
                        commentview: true,
                        commentbox: true,
                        commentArray: allComments
                    });
                });
            });
    })

    .post("/addcomment/:articleid", function(req, res, next) {
        var articleid = req.params.articleid;

        console.log(req.body.yourName + " comment : " + req.body.commentText);
        res.json({
            id: req.params.articleid
        });

        var addComment = new articleComment({
            username: req.body.yourName,
            comment: req.body.commentText,
            datestamp: moment().format("MMMM Do YYYY")
        })

        addComment.save(function(error, respond) {
            if (error) console.log("error: " + error);
            console.log(respond);
            
            newsArticle.update({
                _id: articleid
            }, {
                $push: {
                    comments: respond._id
                }
            }, function() {
                console.log("updated!");
            });

        })


    })

    .get("/getcomments/:articleid", function(req, res, next) {

        newsArticle.findOne({
            id: req.params.articleid
        })
            .populate("comments")
            .exec(function(err, comment) {
                if (err) return handleError(err);
                console.log("return: " + comment);
                res.json("ok");
            });
    })
};