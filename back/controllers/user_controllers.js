import pool from "../db.js"

class UserController {
   async createUser(req, res){
      const { username, email, password } = req.body
      const newUser = await pool.query('INSERT INTO users (name, email, password) values ($1, $2, $3) RETURNING *', [username, email, password])
      
      res.json(newUser)
   }

   async getUsers(req, res){

   }

   async getOneUser(req, res){

   }

   async updateUser(req, res){

   }

   async deleteUser(req, res){

   }
}

export default new UserController()