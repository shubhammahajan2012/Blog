//Express Setup
const express = require("express");
const app = express();
//Body Parser Setup
app.use(express.urlencoded());
//EJS Setup
const ejs = require("ejs");
app.set('view engine', 'ejs');
//Static Files Setup
app.use(express.static("public"));
//Mongoose Setup
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin-shups:shups123@cluster0.rxtfytw.mongodb.net/blogDB");


//Home page, Contact page and About page Content
const homeStartingContent = "While the city of Berlin boasts a number of classy Michelin star restaurants such as Restaurant Facil and Tim Raue, my stomach craved its street food that makes Berlin a mecca for foodies. I ended my walking tour at one such no-frills pit stop. Aptly named ‘Curry at the Wall’, it served traditional and vegan currywurst: a Berlin staple composed of sliced up German sausage, or wurst, doused with ketchup and a sprinkle of curry powder. Tangy, warm and served with a side of delicious fries, it made for an ideal snack on that autumn afternoon.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


//Mongoose Schema
const postSchema = {
  title: String,
  content: String
};
//Mongoose model
const Post = mongoose.model("Post", postSchema);

//GET request for Landing Page
app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

//GET request for Compose Page
app.get("/compose", function(req, res){
  res.render("compose");
});

//POST request for adding content on Compose Page
app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

//GET request when user clicks on Read More
app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    if(!err){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  }
  });
});

//GET request for About Page
app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

//GET request for Contact Page
app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

//LOCAL PORT
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
