const shell = require('shelljs')
require('dotenv').config()

// Import required AWS SDK clients and commands for Node.js
const { ListObjectsCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./libs/s3Client.js"); // Helper function that creates Amazon S3 service client module.

// Create the parameters for the bucket
const bucketParams = { Bucket: "1theta-readability-transformers" };


function download_latest_doc() {   
    shell.cd(__dirname)
    shell.exec('rm -rf ./readability-transformers')
    shell.exec('git clone https://github.com/OneTheta/readability-transformers')
    shell.exec('cp -rf readability-transformers/docs/build/html/* ./public/')
    shell.exec('rm -rf ./readability-transformers')
}

async function modelNameToLink(modelName){
    var data = await s3Client.send(new ListObjectsCommand(bucketParams));
    var name = data.Name 
    var keys = data.Contents.map((obj) => obj.Key.replace(".tar.gz", ""))
    keys = keys.filter((key) => key.startsWith("models/"))
    if (keys.includes(`models/${modelName}`)) {
        var fileurl = `https://${name}.s3.amazonaws.com/models/${modelName}.tar.gz`
        return fileurl
    } else {
        return null
    }
}
module.exports = { download_latest_doc, modelNameToLink }