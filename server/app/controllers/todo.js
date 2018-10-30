//todo.js module

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    asyncHandler = require('express-async-handler'),
    Todo = mongoose.model('Todo');


module.exports = function (app, config) {
    app.use('/api', router);

    //API calls below
    //Get All Users Async Request
    //Sample: http://localhost:5000/api/users/
    router.get('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all users Async Request');
        let query = User.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
                res.status(200).json(result);
        })
    }));
    
    //Get specific User id Request 
    //Sample: http://localhost:5000/api/users/5bd080092c9c2a74ecf2ace2
    router.get('/users/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get specific user by id =  %s', req.params.id);
        await User.findById(req.params.id).then(result => {
                res.status(200).json(result);
        })
    }));

    //create new user api Post request with json passed in raw body
    //Sample: http://localhost:5000/api/createNew
    /*{
        "fname" : "Amy",    
        "lname" : "Vankauwenberg",    
        "email" : "AmyV@nm.com",   
        "password" : "987654321",
        "role" : "admin"
    }*/
    router.post('/createNew', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating user Async Post');
        var user = new User(req.body);
        console.log(req.body);
        await user.save()
                .then(result => {
                        res.status(201).json(result);
        })
    }));

    //Update existing data row with json passed in raw body
    //Sample:http://localhost:5000/api/update
    /*{ "active": false,
        "_id": "5bd080092c9c2a74ecf2ace2",
        "fname": "Danny",
        "lname": "Forero",
        "email": "danjokeny@gmail.com", <--must not change/unique key
        "password": "Pass12345",
        "role": "admin",
        "registerDate": "2018-10-24T14:22:01.128Z",
        "__v": 0
    }*/
    router.put('/update', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating user');
        await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    //Delete existing data
    //Sample:http://localhost:5000/api/Delete/5bd080092c9c2a74ecf2ace2
    router.delete('/Delete/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting user id =  %s', req.params.id);
        await User.remove({ _id: req.params.id })
                .then(result => {
                        res.status(200).json(result);
        })
    }));

    //HTML calls below 

    //get all users from html index page link
    router.post('/users/all', asyncHandler(async (req, res) => {
        logger.log('info', 'post request to retrieve all users from db in html Request');
        let query = User.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
                logger.log('info', 'get all users = complete' );
                res.status(201).json(result);

        })
    }));

    //Login/retrieve existing user id from html index page link
    router.post('/login', asyncHandler(async (req, res) => {
        var id = req.body.id
        logger.log('info', 'logging in user id = ' + id);
        await User.findById(req.body.id).then(result => {
                logger.log('info', 'info for user id = ' + result);
                res.status(201).json(result);
        })
    }));

    //create new userid from html index page link
    router.post('/create', asyncHandler(async (req, res) => {
        var user = new User(req.body);
        var email = req.body.email
        logger.log('info', 'Creating user from html for email ' + email);
        logger.log('info', 'insert row ' + user);
        await user.save()
                .then(result => {
                        res.status(201).json(result);
        })
    }));

};