const express = require("express");
const sequelize = require("./config/dbconnect");
const handleRouter = require("./router/index.router");
const app = express();

app.use(express.json());

sequelize.authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch((error) => console.log(`Unable to connect to the database error ${error.message}`))

app.use("/api/v1", handleRouter());

app.listen(process.env.PORT, () => console.log(`Server is running on the port ${process.env.PORT}`));