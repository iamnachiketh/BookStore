const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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


const loginUser = async function (userData) {
    try {
        const user = await User.findOne({
            where: {
                email: userData.email
            }
        })

        if (!user) {
            const error = new Error("User not found");
            error.status = StatusCodes.NOT_FOUND;
            throw error;
        }

        const isMatch = await bcrypt.compare(userData.password, user.password);

        if (!isMatch) {
            const error = new Error("User credentials are wrong");
            error.status = StatusCodes.UNAUTHORIZED;
            throw error;
        }

        const accessToken = jwt.sign({
            id: user.uid,
            email: user.email,
            role: user.role
        }, process.env.JWT_ACCESS_SECRET, { expiresIn: "3d" });

        const refreshToken = jwt.sign({
            id: user.uid,
            email: user.email,
            role: user.role
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });

        await User.update({ refreshtoken: refreshToken }, { where: { uid: user.uid } });

        return { status: StatusCodes.OK, message: "User logged in successfully", token: accessToken, data: user };

    } catch (error) {
        return { status: error.status || StatusCodes.INTERNAL_SERVER_ERROR, message: error.message, data: null, token: null };
    }
}


module.exports = {
    registerUser,
    loginUser
};