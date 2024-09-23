const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    content: {type: String, required: true},
    userId: {type: String, required: true},
    createdOn: {type: Date, default: new Date().getTime()},
});

module.exports = mongoose.model("Note", noteSchema);