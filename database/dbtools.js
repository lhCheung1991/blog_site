"use strict";

var mongoose = require("mongoose");
var dbtools = {};
/**
 * Mongoose buffers all the commands until it's connected to the database. 
 * This means that you don't have to wait until it connects to MongoDB 
 * in order to define models, run queries, etc
 */

/**
 * If you opened a separate connection using mongoose.createConnection() 
 * but attempt to access the model through mongoose.model('ModelName') 
 * it will not work as expected since it is not hooked up to an active db connection. 
 * In this case access your model through the connection you created
 */

mongoose.connect("mongodb://127.0.0.1:27017/blog_site_db");

/**
 * Models are defined through the Schema interface
 */

var Schema = mongoose.Schema;

var BlogsSchema = new Schema(
    {
        title: {type: String, default: "New Blog"},
        content: String,
        lastEidtDate: {type: Date, default: Date.now}
    }
);

var BlogModel = mongoose.model("blogs", BlogsSchema);

dbtools.saveNewBlog = function (newBlog)
{
    var blog = new BlogModel();
    blog.content = newBlog.content;
    
    blog.save(function (error)
    {
        if (error)
        {
            console.error(error);
        }
        else
        {
            console.error("Save" + blog);
        }
    });
};

/**
 * When executing a query with a callback function, you specify your query as a JSON document.
 * The JSON document's syntax is the same as the MongoDB shell.
 * /

/**
 * All callbacks in Mongoose use the pattern: callback(error, result)
 * What results is depends on the operation: For findOne() it is a potentially-null single document, 
 * find() a list of documents, count() the number of documents, update() the number of documents affected, etc
 */

dbtools.getAllBlogs = function (callback)
{
    BlogModel.find({}, {}, function(error, result)
    {
        callback(error, result);
    });
}

module.exports = dbtools;