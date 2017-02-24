var mongoose = require("mongoose");

var CategorySchema = new mongoose.Schema({
    name: String,
    importance: Number
});

module.exports = mongoose.model("Category", CategorySchema);