const express = require('express');
const router = express.Router();
const Control = require('../controllers/taskcontrol')

const control = new Control()

router.post('/create', control.create), 

 router.get('/task-list', control.fetch);

 router.put('/update/:id', control.update);

router.delete('/delete/:id', control.delete);

router.get('/findbytask/:userID', control.findByTask);

router.get('/UserTaskById', control.getCountTask);

router.get('/allUserTask', control.getCountAllTask)

router.get('/findbyID', control.findByID);

router.get('/filter', control.filterTask);

router.get('/items', control.getPaginatedItems);



module.exports= router;
