"use strict";

var adminLoginMiddleware = {};

adminLoginMiddleware.getAdminLoginPage = function ()
{
    function __getAdminLoginPage(req, res, next)
    {
        res.render("adminlogin", {});
    }
    
    return __getAdminLoginPage;
}

module.exports = adminLoginMiddleware;