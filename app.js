const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

const postOne = "Choose a stack and then, Practice! Practice! Practice!.";
const aboutContent = "Hi, I am Sinni Singla. I have 3+ years of experience in the industry and high level proﬁciency in HTML, CSS, Angular, React Js, JQuery, expertise with C#, Node JS and more. I have developed web applications across multiple APIs and third-party integrations. I have worked on many applications either the requirment is to add a new feature to an existing application or build a new website from the ground up. I have worked in a team as well as independently.";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// Database Connection and Model Definition
const url = "mongodb://localhost:27017/mybucketlist";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const postSchema = {
                    title: String,
                    post: String
                }
const Post = mongoose.model("post", postSchema);

//Create dummy data

app.get("/", function(req, res) {
    Post.find({}, function(err, posts) {
        res.render("home", {postList: posts});
    })
});

app.get("/compose", function(req, res) {
    res.render("compose");
});

app.post("/compose", function(req, res) {
    const blogPost =new  Post({
        title: req.body.title,
        post: req.body.post
    });
    blogPost.save();
    res.redirect("/");
});

app.get("/posts/:postid", function(req, res) {
    const postId = req.params.postid;
    let postCurrent = {};
    Post.findOne({_id: postId}, function(err, post) {
        res.render("post",  {post: post});
    });
});

app.get("/about", function(req, res) {
    res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
    res.render("contact");
});







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
