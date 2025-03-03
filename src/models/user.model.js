const sequelize = require("../config/dbconnect");
const { DataTypes } = require("sequelize");

const User = sequelize.define("users", {
    uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user"
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10, 10]
        }
    },
    refreshtoken: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: " "
    }

}, { 
    timestamps: true,
    freezeTableName: true
});

module.exports = User;