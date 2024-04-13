const TaskAPI = require("../services/taskservice")

class Control {
    constructor() {
        this.controlTask = new TaskAPI();

        this.create = this.create.bind(this);
        this.fetch = this.fetch.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.findByTask = this.findByTask.bind(this);
        this.getPaginatedItems = this.getPaginatedItems.bind(this);
        this.getCountTask = this.getCountTask.bind(this);
        this.getCountAllTask = this.getCountAllTask.bind(this);
        this.findByID = this.findByID.bind(this);
        this.filterTask = this.filterTask.bind(this);

    }

    async create(req, res, next) {
        console.log('qqqqqqqq====>>')
        try {
            const data = req.body
            console.log('dataaaaaaa', data)
            let result = await this.controlTask.createTask(data)
            if (result) {
                res.status(200).send(result)
            }
            else {
                res.status(400).send('something went wrong')
            }
        } catch (err) {
            res.status(500).send(err)

        }
    }

    async fetch(req, res, next) {
        console.log("NNNNNNNNNNNNNNNNNNNNNNNNNNNNN",req.query)
        try {
            const data = {
                skip:req.query.skip,
                limit:req.query.pageSize
            }

            let result = await this.controlTask.fetchTask(data)
            if (result) {
                res.status(200).send(result)
            }
            else {
                res.status(400).send('something went wrong')
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }

    async filterTask(req, res, next) {
        try {
            console.log("NNNNNNNNNNNNNNNNNNNNNNNNNNNNN",req.query)
            const data = {
              status:req.query.status
            }
            
            console.log("dddddddd",data)
            let result = await this.controlTask.filterTask(data)
            console.log("sssss",result)
            if (result) {
                res.status(200).send(result)
            }
            else {
                res.status(400).send('something went wrong')
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id
            const upadatedTask = req.body
            const result = await this.controlTask.updateTask({ _id: id }, upadatedTask)
            if (result) {
                res.status(200).send(result)
            }
            else {
                res.status(400).send('something went wrong')
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id
            console.log('idddddddddddd===', id)
            const result = await this.controlTask.deleteTask(id)
            if (result) {
                res.status(200).send(result)
            }
            else {
                res.status(400).send('something went wrong')
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }

    async findByTask(req, res, next) {
        console.log('print====>>111')
        try {
            // const data = req.body
            const data = {
                userID: req.params.userID
            }
            let result = await this.controlTask.findByTask(data)
            console.log('resulttt=====>>', result)
            if (result) {
                res.status(200).send(result)
            }
            else {
                res.status(400).send('something went wrong')
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }

    async findByID(req, res, next) {
        console.log('print====>>111')
        try {
            // const data = req.body
            const data = {
                userID: req.query.userID
            }
            let result = await this.controlTask.findByTask(data)
            console.log('resulttt=====>>', result)
            if (result) {
                res.status(200).send(result)
            }
            else {
                res.status(400).send('something went wrong')
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }

    async getCountTask(req, res) {
        console.log("yyyyyyyyy",req.query)
        const id = req.query.id
        try {
            const result = await this.controlTask.getCountTask(id);
            console.log('resssssssss===>.', result)
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send(error)
        }
    }

    async getCountAllTask(req, res) {
        try {
            const result = await this.controlTask.getCountAllTask();
            console.log('resssssssss===>.', result)
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send(error)
        }
    }

    async getPaginatedItems(req, res) {
           console.log('bbbbbb')
           const page = parseInt(req.query.page) || 1;
           const pageSize = parseInt(req.query.pageSize) || 2;
           const skip = parseInt(req.query.skip) || 0;
           try {
            const data = req.body
            const result = await this.controlTask.getPaginatedItems(pageSize, skip);
            const totalItemsData = await this.controlTask.getAllItems(data)
            const totalItems = totalItemsData.length
            const totalPages = Math.ceil(totalItems / pageSize);
            //   console.log("")
            console.log("QQQQQQQQQQQQQ", result)
            res.json({
                result,
                totalItems,
                totalPages,
            });

        } catch (err) {
            console.error('Error fetching paginated data:', err);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = Control;