import pool from "../db.js"
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator"
import store from '../../src/vuex/store.js'

class UserController {
   async createUser(req, res){
      const validErrors = validationResult(req)
      if(!validErrors.isEmpty()){
         return res.status(400).json({message: "Ошибка при регистрации", validErrors})
      }
   
      const { username, email, password } = req.body
      const allUsersMailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email])
      const allUsersNameCheck = await pool.query('SELECT * FROM users WHERE name = $1', [username])
      if(allUsersMailCheck.rows.length > 0 || allUsersNameCheck.rows.length > 0){
         return res.status(404).json({message: "Пользователь с такой почтой или именем уже зарегистрирован"})
      } else {
         const hashPass = bcrypt.hashSync(password, 5)
         const newUser = await pool.query('INSERT INTO users (name, email, password) values ($1, $2, $3) RETURNING *', [username, email, hashPass])
         return res.status(200).json({message: "Пользователь успешно зарегистрирован!"})
      }
   }

   async getUsers(req, res){
      const users = await pool.query('SELECT * from users')

      res.json(users.rows)
   }

   async getOneUserByName(req, res){
      const id = req.params.id
      const user = await pool.query('SELECT * from users where name = $1', [id])

      res.json(user)
   }

   async updateUser(req, res){
      const {person_id, name, password, email} = req.body
      const updatedUser = pool.query('UPDATE users set name = $1, password = $2, email = $3 where person_id = $4 RETURNING *', [name, password, email, person_id])

      res.json(updatedUser.rows[0])
   }

   async deleteUser(req, res){
      const person_id = req.params.id
      const deletedUser = pool.query('DELETE FROM users where person_id = $1', [person_id])

      res.json(deletedUser.rows)
   }
}

export default new UserController()