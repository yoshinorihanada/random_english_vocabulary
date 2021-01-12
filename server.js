
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

const fs = require('fs');


let elementary = JSON.parse(fs.readFileSync(__dirname +'/vocab/elementary.json'));
let middle = JSON.parse(fs.readFileSync(__dirname +'/vocab/middle.json'));
let high = JSON.parse(fs.readFileSync(__dirname +'/vocab/high.json'));
let university = JSON.parse(fs.readFileSync(__dirname +'/vocab/university.json'));
let common = JSON.parse(fs.readFileSync(__dirname +'/vocab/common.json'));  

let vocabs = {
  elementary,
  middle,
  high,
  university,
  common
}

// console.log(words);


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");

});

// app.get("/test_words",function(req,res){
//   res.json(vocabs);
//
// });

app.get("/vocabs",function(req,res){
  res.json(vocabs);

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
