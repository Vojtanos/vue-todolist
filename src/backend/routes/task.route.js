const express = require('express');
const userRoute = express.Router();

// user model
let TaskModel = require('../models/Task');

userRoute.route('/').get((req, res) => {
    TaskModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

 userRoute.route('/last5').get((req, res) => {
    TaskModel.find({isDone: true}, 
        (error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   }).sort('-isDoneDate').limit(5)
 })

 userRoute.route('/new').post((req, res, next) => {
    TaskModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

userRoute.route('/edit/:id').get((req, res) => {
   TaskModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update user
userRoute.route('/:id').post((req, res, next) => {
  TaskModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('User successfully updated!')
    }
  })
})

// Delete user
userRoute.route('/:id').delete((req, res, next) => {
  TaskModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = userRoute;