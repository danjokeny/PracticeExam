//todo.js module

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    asyncHandler = require('express-async-handler'),
    Todo = mongoose.model('Todo');


module.exports = function (app, config) {
    app.use('/api/todo', router);

    //API call routes below
    
    //Get All Todo Async Request
    //Sample: http://localhost:3300/api/todo/
    router.get('/todos', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all Todos Async Request');
        let query = Todo.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
                res.status(200).json(result);
        })
    }));
    
    //create new todo api Post request with json passed in raw body
    //Sample: http://localhost:3300/api/Todo/createNew
    /*Raw Data Json format
    {
        "Todo" : "Help get Exam correct",    
        "Priority" : "Critical"
    }
    */
    router.post('/Todos', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating Todo Async Post');
        var user = new Todo(req.body);
        logger.log('info',req.body);
        await user.save()
                .then(result => {
                        res.status(201).json(result);
        })
    }));

};