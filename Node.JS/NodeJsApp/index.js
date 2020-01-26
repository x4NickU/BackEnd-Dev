const express = require("express");
const app = express();
const port = 8080;

// default route handler
app.get("/", (req, res) => {
    res.send("Hello World!");
})

// start express server
app.listen(port, () => {
    console.log('server started at http://localhost:${port}')
})