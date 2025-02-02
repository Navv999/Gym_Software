const userModel = require('../model/usermdel');
const authModel = require('../model/authmodel');
const MySql = require('../database/dbmysql')

class AuthService {
    constructor() {
        this.MySqlData = new MySql();
        this.userModel = userModel;
        this.authModel = authModel;
    }

    async signUp(data) {
        console.log("SIGNUP_DATA", data)
        try {
            const result = await this.authModel.create(data)
            console.log("RESULT_USER", result)
            return result
        } catch (err) {
            throw err
        }
    }

    async checkEmailExist(email) {
        console.log("EMAIL", email)
        try {
            console.log("EMAIL", email)
            const result = await this.authModel.find({ email: email })
            console.log('EMAIL EXIST', result)
            return result
        } catch (err) {
            throw err
        }
    }

    async signIn(data) {
        try {
            let query = { email: data };
            const result = await this.authModel.find(query)
            console.log("RESULT", result)
            return result;
        } catch (err) {
            throw err
        }
    }

    async createUsers(data) {
        try {
            const result = await this.userModel.create(data)
            console.log("RESULT_USER", result)
            return result
        } catch (err) {
            throw err
        }
    }

    async fetchUsers(data) {
        try {
            const result = await this.userModel.find().skip(data.skip * data.limit).limit(data.limit)
            const countData = await this.userModel.countDocuments();
            console.log('FETCH_USERS', result, countData)
            return { result, countData }
        } catch (err) {
            throw err
        }

    }

    async emailCheck(email) {
        try {
            console.log("EMAIL", email)
            const result = await this.userModel.find({ email: email })
            console.log('EMAIL EXIST', result)
            return result
        } catch (err) {
            throw err
        }
    }

    async deleteUser(ID) {
        console.log('USER_ID', ID)
        try {
            let query = { email: ID };
            const result = await this.userModel.deleteOne(query)
            console.log("USER_DELETED_RESULT", result)
            return result;
        } catch (err) {
            throw err
        }
    }

    async filterUsers(data) {
        try {
            let query = { email: data };
            const result = await this.userModel.find(query)
            console.log('RESULT_SERVICE', result)
            return result;
        } catch (err) {
            throw err
        }
    }

    async getUserCount() {
        try {
            let query = { }; // Empty query to fetch all users
            const result = await this.userModel.find(query);

            // Counting total users
            const totalUsers = result.length;

             // Filtering Diamond users
             const platinumUsers = result.filter((user) => user.packages == 'platinum');
             const totalPlatinumUsers = platinumUsers.length;

            // Filtering Diamond users
            const diamondUsers = result.filter((user) => user.packages == 'diamond');
            const totalDiamondUsers = diamondUsers.length;

            // Filtering Gold users
            const goldUsers = result.filter(user => user.packages == 'gold');
            const totalGoldUsers = goldUsers.length;

             // Filtering Diamond users
             const silverUsers = result.filter((user) => user.packages == 'silver');
             const totalSilverUsers = silverUsers.length;

            console.log('Total Users:', totalUsers);
            console.log('Total Diamond Users:', totalDiamondUsers);
            console.log('Total Gold Users:', totalGoldUsers);

            return {
                totalUsers: totalUsers,
                totalPlatinumUsers: totalPlatinumUsers,
                totalDiamondUsers: totalDiamondUsers,
                totalGoldUsers: totalGoldUsers,
                totalSilverUsers: totalSilverUsers
            };
        } catch (err) {
            throw err;
        }
    }



    //insertOrSignup
    async createUser(user) {
        console.log("LLLLLLLLLLLLLLLLL", user)
        try {
            const query = `INSERT INTO auth(fname,lname,email,password,role,status) VALUES('${user.fname}','${user.lname}','${user.email}','${user.password}','${user.role}','${user.status}');`
            const result = await this.MySqlData.insert(query)
            return result;
        } catch (err) {
            throw err
        }
    }
    //fetchOrLogin
    async readUser(user) {
        try {
            const query = `SELECT fname, lname, email, password, id, role, status FROM auth WHERE email='${user.email}'`
            const result = await this.MySqlData.read(query);
            return result;
        } catch (err) {
            throw err
        }
    }
    //update
    async updateUser(id, updatedUser) {
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh", id, updatedUser)
        try {
            const query = `UPDATE auth SET ? WHERE id=?`
            const result = await this.MySqlData.update(id, updatedUser, query)
            return result;
        } catch (err) {
            throw err
        }
    }
    //findbyId
    async findById(id) {
        console.log('idddddddddd', id)
        try {
            const query = `SELECT fname,lname,email,password,id FROM auth WHERE id='${id}'`
            const result = await this.MySqlData.read(query)
            console.log('reddddddddd', result)
            return result
        }
        catch (err) {
            throw err
        }
    }
    //checkEmail
    async checkEmail(user) {
        console.log("XXXXXXXXXXXXXXXXXX", user)
        try {
            const query = `SELECT fname,lname,email,password,role,status,id FROM auth WHERE email='${user}'`
            const result = await this.MySqlData.read(query);
            return result;
        } catch (err) {
            throw err
        }
    }
    //fetchAllUser
    async readAllUser() {
        try {
            const query = `SELECT * FROM auth`;
            const result = await this.MySqlData.read(query);
            console.log('resulllll===>>>>', result)

            return { result }

        } catch (err) {
            throw err
        }

    }
    //filterUsers
    async filterUser(user) {
        // console.log('ssffff')
        try {
            const query = `SELECT fname,lname,email,password,role,status,id FROM auth WHERE status='${user}'`
            console.log("query", query)
            const response = await this.MySqlData.read(query)

            // console.log('resulllll===>>>>', response)
            return { response }

        } catch (err) {
            throw err
        }
    }
    //deleteUser
    async deleteUsers(id) {
        console.log('idddddd', id)
        try {
            const query = `DELETE FROM auth WHERE id=?`
            const result = await this.MySqlData.delete(id, query)
            return result;
        } catch (err) {
            throw err
        }
    }
    //countdata
    async getCountData() {
        try {
            // console.log('tryyy')
            // const status = 'Active'
            // data['status']= 'Active'
            const query = `SELECT * FROM auth`;
            const querys = `SELECT fname,lname,email,password,role,status,id FROM auth WHERE status='Active'`
            const result = await this.MySqlData.read(query);
            const response = await this.MySqlData.read(querys);

            // console.log('resulttttttttttttt', result.length)
            let totalData = result.length
            let ActiveData = response.length;
            let InActiveData = totalData - ActiveData
            console.log('userCount==>', ActiveData)

            // for (let i = 0; i <= result.length; i++) {
            //     if (result[i]?.status == 'Active') {
            //         ActiveData++
            //     }
            //     else if (result[i]?.status == 'In Active') {
            //         InActiveData++
            //     }
            // }
            return { totalData, ActiveData, InActiveData }
        } catch (err) {
            throw err
        }
    }

    //verify
    // async sendVerifyEmail(){
    //     console.log("XXXXXXXXXXXXXXXXXX", user)
    //     try {
    //         const query = `SELECT fname,lname,email,password FROM auth WHERE email='${user}'`
    //         const result = await this.MySqlData.read(query);
    //         return result;
    //     } catch (err) {
    //         throw err
    //     }

    // }
}

module.exports = AuthService