class UserController {
   async handleUserInfo(req, res) {
      const userData = req.body;
      
      return res.json(userData);
   }
}

export default new UserController()