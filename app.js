//jshint esversion: 6

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/*ROUTES*/

app.get("/", function(req,res) {
  res.render("home");
});

app.listen(3000, function() {
  console.log("Server connected to port 3000");
});
