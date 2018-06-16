
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var mongoconnect = require("../config/mongoconnect");
var articleComment = require("../model/comment-schema");
var newsArticle = require("../model/article-schema");



const firstPage = "http://www.theguardian.com/us";
const firstPageLink = ".fc-item__content a";
const mainTextSelect = ".content__article-body";

function getArticleLinks() {


    axios.get(firstPage).then(function(html){
        var html = html.data;

        var $ = cheerio.load(html);

        $(firstPageLink).each(function(i, element) {

            var artTitle = $(element).text();
            var artLink = $(element).attr("href");

            console.log(artLink);

            if (artLink.indexOf("http") == -1) {
                artLink = firstPage + artLink;
            }

            
            if (i < 25) 
            { 
               
                axios.get(artLink).then(function(html){
                    var html = html.data;
                    var $ = cheerio.load(html);

                      
                        var thistext = $(mainTextSelect).text();
        
                        var fixtext = thistext.replace(/\n/gi, "</p><p>");

                        console.log("article #"+i);
                        console.log(fixtext);
                        var document = new newsArticle({ 
                             title: artTitle,
                             thetext: fixtext,
                             url: artLink,
                             datestamp: Date.now()
                            });

                            document.save(function(err, gotback){

                             if (err) console.log(err);

                            });
                });
            } 

        });
    });
}

getArticleLinks();

module.exports = getArticleLinks;