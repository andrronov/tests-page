import pool from "../db.js"

class UserController {
   async createUser(req, res){
      const { username, email, password } = req.body
      const newUser = await pool.query('INSERT INTO users (name, email, password) values ($1, $2, $3) RETURNING *', [username, email, password])
      
      res.json(newUser.rows[0])
   }

   async getUsers(req, res){
      const users = await pool.query('SELECT * from users')

      res.json(users.rows)
   }

   async getOneUser(req, res){
      const id = req.params.id
      const user = await pool.query('SELECT * from users where person_id = $1', [id])

      res.json(user.rows[0])
   }

   async updateUser(req, res){
      const {person_id, name, password, email} = req.body
      const updatedUser = pool.query('UPDATE users set name = $1, password = $2, email = $3 where person_id = $4 RETURNING *', [name, password, email, person_id])

      res.json(updatedUser.rows[0])
   }

   async deleteUser(req, res){
      const {person_id} = req.body
      const deletedUser = pool.query('DELETE FROM users where person_id = $1', [person_id])

      res.json(deletedUser.rows[0])
   }
}

export default new UserController()