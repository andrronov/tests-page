import pool from "../db.js"
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator"
import store from '../../src/vuex/store.js'
import jwt from 'jsonwebtoken'
import { secret } from './config.js'

const generateAccessToken = (id) => {
   const payload = {id}
   return jwt.sign(payload, secret, {expiresIn: "2h"})
}

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
      const user = await pool.query('SELECT password from users where name = $1', [id])

      res.json(user.rows[0])
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

   async login(req, res){
      try{
         const {username, password} = req.body
         const user_id = await pool.query('SELECT person_id FROM users where name = $1', [username])
         const user_password = await pool.query('SELECT password FROM users where name = $1', [username])
         if(user_password.rows.length < 1){
            return res.status(404).json({message: "Такого пользователя не существует."})
         }
         const compare = await bcrypt.compare(password, user_password.rows[0].password)
         if(!compare){
            return res.status(404).json({message: 'Пароль неверный'})
         }
         const token = generateAccessToken(user_id)
         res.status(200).json({token, message: 'Успешный вход!'})
      }
      catch(error){
         console.log(error)
         res.status(400).json({message: 'Ошибка во входе'})
      }
   }
}

export default new UserController()