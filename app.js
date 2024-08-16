// Building your own restful apis .......

const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/articleDB");
 const Articleschema =new mongoose.Schema({
    title: String,
    content: String,
 })

 const Article = mongoose.model("article", Articleschema);

 //Chained Route Handler

 app.route('/articles')
 
 .get(async(req ,res)=> {
    const art = await Article.find();    
    res.send(art);    
 })
 
 .post((req,res) => {
    const newarticle = new Article({
        title: req.body.title,
        content: req.body.content,
    })
 })
 
 .delete(async(req,res) => {
    const deletearticle = await Article.deleteMany();
    if(deletearticle){
        res.send("Successfuly deleted Articles!")
    }
    else{
        res.send("Deletion process unsuccessful!!");
    }
 });

 app.route('/article/:articletitle')

 .get((req, res) =>{

   Article.findOne({title:req.params.articletitle});
 })

 .put((req, res) => {
   Article.updateOne(
      {title: req.params.articletitle},
      {title: req.body.title , content: req.body.content},
      {overwrite: true},
   )
 })

 .patch((req,res) => {
   Article.updateOne(
      {title: req.params.articletitle},
      {$set: req.body},
   )
 })

 .delete((req,res) => {
   Article.deleteOne(
      {title: req.params.articletitle}
   )
})





//  app.get('/articles', )

//  app.post('/articles', )

//  app.delete('/articles', )


 app.listen(PORT, ()=> {
    console.log(`The server is started at port: ${PORT}!!`)
 })