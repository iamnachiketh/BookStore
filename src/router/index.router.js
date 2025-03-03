const router = require("express").Router();
const userRouter = require("./user.router");

const handleRouter = () => {

    router.use("/users", userRouter);

    return router;
}

module.exports = handleRouter;