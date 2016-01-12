"use strict";

// require mongo modules
var mongo = require('mongodb');
var monk = require('monk');
var db = monk("127.0.0.1:27017/blog_site_db");

// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
//   if (err) {
//     throw err;
//   }
//   db.collection('mammals').find().toArray(function(err, result) {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//   });
// });