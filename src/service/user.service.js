const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const registerUser = async function (userData) {
    try {

        const isUserExist = await User.findOne({ where: { email: userData.email } });

        if (isUserExist) {
            const error = new Error("User already exist");
            error.status = StatusCodes.CONFLICT;
            throw error;
        }

        const user = await User.create(userData);

        return { status: StatusCodes.CREATED, message: "User created successfully", data: user };

    } catch (error) {
        return { status: error.status || StatusCodes.INTERNAL_SERVER_ERROR, message: error.message, data: null };
    }
}


module.exports = {
    registerUser
};