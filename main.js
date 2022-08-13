require('dotenv').config()
require("log-timestamp")("ͱ");
require("./db/mongoose");
const { app } = require("./constants/constants")

const { orderManagement } = require("./orderManagement/orderManagement")

const server = app
    .listen(process.env.PORT || 4000, async () => {
        console.log("App running on port 4000")
    })
