var express = require('express');
var router = express.Router();

/**
 * Basically we're requiring our Express functionality, 
 * then attaching a "router" variable to Express's router method, 
 * then using that method when an attempt is made to 
 * HTTP get the top level directory of our website. 
 * Finally we export our router function back to our app.
 */
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('artical', { title: 'GOGOGO' });
});

router.get("/helloworld", function (req, res)
{
    var db = req.db;
    var blogsCollection = db.get("blogs");
    blogsCollection.find({}, {}, function (e, result)
    {
        try
        {
           res.render("index", {title:result[0]}); 
           console.log(result);
        }
        catch(e)
        {
            console.log(e);            
        }
        
    });

});

module.exports = router;
