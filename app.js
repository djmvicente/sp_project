//jshint esversion: 6

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

mongoose.connect("mongodb://localhost:27017/customerDB", {useNewUrlParser: true});

//------------------------Customer Schema-------------------------//

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  id: Number,
  firstName: String,
  lastName: String,
  email: String
});

const Customer = mongoose.model("Customer", customerSchema);

//---------------------------------------------------------------//

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/*ROUTES*/

app.get("/", function(req,res) {
  res.render("home");
});

app.get("/profile", function(req,res) {
  res.render("profile");
});

app.get("/customers", function(req,res) {

  Customer.find({}, function(err, foundCustomers) {
    if(foundCustomers) {
      res.render("customers", {
        customerArray: foundCustomers
      });
    }
  });
});

app.get("/about", function(req,res) {
  res.render("about");
});

app.post("/addCustomer", function(req, res) {
  Customer.countDocuments({}, function(err, count) {
    if(!err) {
      const customer = new Customer({
        id: (count+1),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      });

      customer.save(function(err) {
        if(err) {
          console.log(err);
        } else {
          res.redirect("/customers");
        }
      });
    }
  });
});

app.post("/deleteCustomer", function(req, res) {
  const customerId = req.body.deleteRecord;

  Customer.findByIdAndRemove(customerId, function(err) {
    if(!err) {
      console.log("Successfully delete record!");
      res.redirect("/customers");
    }
  });
});

app.post("/editCustomer", function(req, res) {

});

app.listen(3000, function() {
  console.log("Server connected to port 3000");
});
