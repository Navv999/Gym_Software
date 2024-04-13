const taskModel = require('../model/taskmodel')
// const MySql = require('../database/mysql_db');


class TaskAPI {
    constructor() {
        this.taskModel = taskModel;

    }


    //create
    async createTask(data) {
        try {
            const result = await this.taskModel.create(data)
            return { result }
        } catch (err) {
            throw err
        }
    }

    //fetch
    async fetchTask(data) {
        // console.log("BBBBBBBBBBBBBBBBBBBBBBBBBB", data)
        try {
            const result = await this.taskModel.find().skip(data.skip * data.limit).limit(data.limit)
            const totalData = await this.taskModel.countDocuments();
            // const response = await this.taskModel.find({ status: 'Completed' }).skip(data.skip * data.limit).limit(data.limit)
            // const output = await this.taskModel.find({ status: 'Pending' }).skip(data.skip * data.limit).limit(data.limit)
            // console.log("MMMMMMMMMMMMMMMMMMMMMMMM", totalData)
            // const result = await this.todoModel.find({_id:id})
            // let res ={
            //     total:result,
            //     completed:response,
            //     pending : result-response
            // }
            // let totalTask = result
            // let completeTask = response
            // let pendingTask = output

            return { result, totalData }

        } catch (err) {
            throw err
        }
    }

    //filterTask
    async filterTask(data) {
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBB", data)
        try {
            const result = await this.taskModel.find(data)
            console.log("resultssss===>>",result)
            return {result} 

        } catch (err) {
            throw err
        }
    }

    //update
    async updateTask({ _id: id }, upadatedTask) {
        console.log('ussssssssssssss===>', { _id: id }, upadatedTask)
        try {
            const result = await this.taskModel.findByIdAndUpdate({ _id: id }, upadatedTask, { new: true })
            return result
        } catch (err) {
            throw err
        }
    }

    //delete
    async deleteTask(id) {
        try {
            const result = await this.taskModel.findByIdAndDelete(id)
            return { result }
        } catch (err) {
            throw err
        }
    }

    //findbynameuser
    async findByTask(data) {
        
        try {
            const result = await this.taskModel.find(data)
            // const response = await this.taskModel.find({data, status: 'Completed' })
            // const output = await this.taskModel.find({data, status: 'Pending' })

            // let totalTask = result
            // let completeTask = response
            // let pendingTask = output

            return { result }

        } catch (err) {
            throw err
        }
    }

    //countbyId
    async getCountTask(id) {
        try {
            // console.log('zzzzzzz')
            const result = await this.taskModel.find({ userID: id })
            const response = await this.taskModel.find({ userID: id, status: 'Completed' });
            // console.log('count id', result.length)
            let totalTask = result.length
            let completeTask = response.length
            let pendingTask = totalTask - completeTask
            // console.log('ptaskkk==>>',pendingTask,result.length,completeTask)

            // for (let i = 0; i <= result.length; i++) {
            //     if (result[i]?.status == 'Completed') {
            //         completeTask++
            //     }
            //     else if (result[i]?.status == 'Pending') {
            //         pendingTask++
            //     }
            // }
            return { totalTask, completeTask, pendingTask }

        } catch (err) {
            throw err
        }
    }

    //countalldata
    async getCountAllTask() {
        try {

            // console.log('zzzzzzz')
            const result = await this.taskModel.find();
            const response = await this.taskModel.find({ status: 'Completed' });

            // console.log('count DATAAAAAAAAA', result,response)
            let totalTask = result.length
            let completeTask = response.length
            let pendingTask = totalTask - completeTask
            // console.log('ptaskkk==>>',pendingTask,result.length)

            // for (let i = 0; i <= result.length; i++) {
            //     if (result[i]?.status == 'Completed') {
            //         completeTask++
            //     }
            //     else if (result[i]?.status == 'Pending') {
            //         pendingTask++
            //     }
            // }
            return { totalTask, completeTask, pendingTask }


        } catch (err) {
            throw err
        }
    }

    //pagination
    // async getAllItems() {
    //     return await this.taskModel.find(data)
    // }

    // async getPaginatedItems(pageSize, skip) {
    //     console.log("DDDDDDDD", pageSize, skip)
    //     return await this.taskModel.find(data).skip(skip).limit(pageSize);
    // }

    // async getTotalItemsCount() {
    //     return await this.taskModel.countDocuments();
    // }


}
module.exports = TaskAPI;