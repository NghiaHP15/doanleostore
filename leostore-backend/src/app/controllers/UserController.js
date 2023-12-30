const UserService = require("../../services/UserService");

class UserController {
  async creatUser(req, res) {
    try {
      console.log(req.body);
      const { name, email, password, confirmPassword, phone } = req.body;
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const isEmail = reg.test(email);
      if (!name || !email || !password || !confirmPassword || !phone) {
        return res.status(200).json({
          status: "ERR",
          message: "The input is required",
        });
      } else if (!isEmail) {
        return res.status(200).json({
          status: "ERR",
          message: "The input is email",
        });
      } else if (password != confirmPassword) {
        return res.status(200).json({
          status: "ERR",
          message: "The password is equa confirmPassword",
        });
      }
      const result = await UserService.createUser(req.body);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  }
  async loginUser(req, res) {
    try {
      const result = await UserService.loginUser(req.body);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  }
  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const data = req.body;

      if (!userId) {
        res.status(200).json({
          status: "ERR",
          message: "The ID user is required",
        });
      }

      const result = await UserService.updateUser(userId, data);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  }
}
module.exports = new UserController();
