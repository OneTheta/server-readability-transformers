const express = require('express');
const path = require('path');
const utils = require("./utils.js")

const publicPath = path.join(__dirname, '/public');

var app = express();
var port = process.env.PORT || 8080;

utils.download_latest_doc()

app.use('/', express.static(publicPath));


app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get("/models/:modelName", async (req, res) => {
        var modelName = req.params.modelName
        var fileurl = await utils.modelNameToLink(modelName)
        return res.status(200).json({
                "url": fileurl
        })
     
});
app.listen(port, () => {
    console.log("Server lisetning at ", port)
})