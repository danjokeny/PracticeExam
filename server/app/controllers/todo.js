//todo.js module

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    asyncHandler = require('express-async-handler'),
    Todo = mongoose.model('Todo');


module.exports = function (app, config) {
    app.use('/api', router);

    //API call routes below
    
    //Get All Todo Async Request
    //Sample: http://localhost:3300/api/todo/todos
    router.get('/todos', asyncHandler(async (req, res) => {
        logger.log('info', 'Get (ALL) Todos Async Request');
        let query = Todo.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
                logger.log('info', 'JSON = ' + result);
                res.status(200).json(result);
        })
    }));
    
    //create new todo api Post request with json passed in raw body
    //Sample: http://localhost:3300/api/Todo/todos
    /*Raw Data Json format
    {
        "Todo" : "Help get Exam correct",    
        "Priority" : "Critical"
    }
    */
    router.post('/todos', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating (POST) Todo Async Post');
        var user = new Todo(req.body);
        logger.log('info',req.body);
        await user.save()
                .then(result => {
                        logger.log('info', 'Created Todo = ' + result);
                        res.status(201).json(result);
        })
    }));

    //Get specific todo  id Request 
    //Sample: http://localhost:5000/api/todos/5bd7af2e0ba51068bc63f58f
    router.get('/todos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get specific todo by id =  %s', req.params.id);
        await Todo.findById(req.params.id).then(result => {
                logger.log('info', 'getbyID Todo = ' + result);
                res.status(200).json(result);
        })
    }));

};