"use strict";

var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
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
        lastEditDate: {type: Date, default: Date.now},
        blogCollectionId: {type: String, default: ""}
    }
);

var BlogCollectionSchema = new Schema(
    {
        title: {type: String, default: "默认"},
        blogIds: []
    }
);

var AdminUserSchema = new Schema(
    {
        username: {type: String},
        password: {type: String}
    }
);

var BlogCommentSchema = new Schema(
    {
        blogId: {type: String},
        replyToId: {type: String},
        replyToName: {type: String},
        nickName: {type: String},
        email: {type: String},
        url: {type: String},
        commentContent: {type: String},
        commentDate: {type: Date, default: Date.now}
    }
);


var BlogModel = mongoose.model("blogs", BlogsSchema);
var BlogCollectionModel = mongoose.model("blogCollections", BlogCollectionSchema);
var AdminUserModel = mongoose.model("adminUsers", AdminUserSchema);
var BlogCommentModel = mongoose.model("blogComments", BlogCommentSchema);

dbtools.saveNewBlog = function (newBlog, callback)
{
    var blog = new BlogModel();
    blog.title = newBlog.title;
    blog.content = newBlog.content;
    blog.blogCollectionId = newBlog.blogCollectionId;
    
    blog.save(function (error)
    {
        if (error)
        {
            console.error(error);
        }
        else
        {
            console.log("Save" + blog);
        }
        callback(error);
    });
};

dbtools.saveNewComment = function (newComment, callback)
{
    var comment = new BlogCommentModel();
    comment.blogId = newComment.blogId;
    comment.replyToId = newComment.replyToId;
    comment.replyToName = newComment.replyToName;
    comment.nickName = newComment.nickName;
    comment.email = newComment.email;
    comment.url = newComment.url;
    comment.commentContent = newComment.commentContent;
    
    comment.save(function (error)
    {
        callback(error);
    });
}

/**
 * When executing a query with a callback function, you specify your query as a JSON document.
 * The JSON document's syntax is the same as the MongoDB shell.
 * /

/**
 * All callbacks in Mongoose use the pattern: callback(error, result)
 * What results is depends on the operation: For findOne() it is a potentially-null single document, 
 * find() a list of documents, count() the number of documents, update() the number of documents affected, etc
 */

dbtools.getAllCommentsByBlogId = function (blogId, callback)
{
    var query = BlogCommentModel.
                find({"blogId": ObjectId(blogId)}).
                select("_id blogId replyToId replyToName nickName email url commentContent commentDate").
                sort({commentDate: 1});
    query.exec(function(error, result)
    {
        callback(error, result);
    });
}

dbtools.getAllBlogs = function (callback)
{
    BlogModel.find({}, "_id title lastEditDate blogCollectionId", function(error, result)
    {
        callback(error, result);
    });
}

dbtools.getAllBlogsCount = function (callback)
{
    BlogModel.count({}, function(error, count)
    {
        callback(error, count);
    });
}

dbtools.getBlogsCountByCollectionId = function (collectionId, callback)
{
    BlogModel.count({"blogCollectionId": ObjectId(collectionId)}, function(error, count)
    {
        callback(error, count);
    });
}

dbtools.getBlogsPageNum = function (pageNum, blogsPerPage, callback)
{
    var query = BlogModel.
                find({}).
                select("_id title content lastEditDate blogCollectionId").
                sort({lastEditDate: -1}).
                skip((pageNum - 1) * blogsPerPage).
                limit(blogsPerPage);
    
    query.exec(function(error, result)
    {
        callback(error, result);
    });
}

dbtools.getBlogsPageNumByCollectionId = function (collectionId, pageNum, blogsPerPage, callback)
{
    var query = BlogModel.
                find({"blogCollectionId": ObjectId(collectionId)}).
                select("_id title content lastEditDate blogCollectionId").
                sort({lastEditDate: -1}).
                skip((pageNum - 1) * blogsPerPage).
                limit(blogsPerPage);
    query.exec(function(error, result)
    {
        callback(error, result);
    });
}

dbtools.getBlogById = function (blogId, callback)
{
    var query = BlogModel.findById(ObjectId(blogId));
    query.select("_id title content lastEditDate blogCollectionId");
    query.exec(function (error, result)
    {
        callback(error, result);
    });
}

dbtools.getBlogsByBlogCollectionId = function (collectionId, callback)
{
    var query = BlogModel.find({blogCollectionId: ObjectId(collectionId)});
    query.exec(function (error, blogs)
    {
        callback(error, blogs);
    });
}

dbtools.updateBlogById = function (blogId, updatedBlog, callback)
{
    var blog = {};
    blog.title = updatedBlog.title;
    blog.content = updatedBlog.content;
    blog.blogCollectionId = updatedBlog.blogCollectionId;
    blog.lastEditDate = Date.now();
    
    var queryAndUpdate = BlogModel.findOneAndUpdate({"_id": ObjectId(blogId)}, blog);
    queryAndUpdate.exec(function (error, result)
    {
        callback(error, result);
    });
}

dbtools.removeBlogById = function (blogId, callback)
{
    var removeQuery = BlogModel.remove({"_id": ObjectId(blogId)});
    removeQuery.exec(function (error)
    {
        callback(error);
    });
}

dbtools.getBlogCollectionById = function (collectionId, callback)
{
    var query = BlogCollectionModel.findById(ObjectId(collectionId));
    query.exec(function(error, result)
    {
        callback(error, result);
    });
}

dbtools.saveNewBlogCollection = function (collection, callback)
{
    var newCollection = new BlogCollectionModel();
    newCollection.title = collection.title;
    newCollection.save(function (error)
    {
        callback(error);
    });
}

dbtools.getAllBlogCollections = function (callback)
{
    var query = BlogCollectionModel.find({}, "_id title");
    query.exec(function (error, result)
    {
        callback(error, result);
    });
}

dbtools.removeBlogCollectionById = function (collectionId, callback)
{
    var removeQuery = BlogCollectionModel.remove({"_id": ObjectId(collectionId)});
    removeQuery.exec(function (error, data)
    {
        console.log(data.result);
        callback(error);
    });
}

dbtools.removeCommentsByBlogId = function (blogId, callback)
{
    var removeQuery = BlogCommentModel.remove({"blogId": ObjectId(blogId)});
    removeQuery.exec(function (error, data)
    {
        console.log(data.result);
        callback(error);
    });
}

dbtools.getPasswordByUsername = function (username, callback)
{
    var query = AdminUserModel.
                find({"username": username}).
                select("password");
                
    query.exec(function (error, result)
    {
        callback(error, result);
    });
}

module.exports = dbtools;