const bcrypt = require("bcryptjs");
const UserService = require("../service/user.service");

const handleRegisterUser = async (req, res) => {
    const userData = req.body;

    userData.password = bcrypt.hashSync(userData.password, 10);

    const response = await UserService.registerUser(userData);

    res.status(response.status).json(response);
}


module.exports = {
    handleRegisterUser
}