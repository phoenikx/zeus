var mongoose = require("mongoose");

var DownloadSchema = new mongoose.Schema({
    url: String,
    file_name: String,
    category: String,
    hits: Number,
    username: String,
    ip: String,
    mac: String,
    time: String
});

module.exports = mongoose.model("Download", DownloadSchema);