const mongoose = require('mongoose');
const { Schema } = mongoose;


const noteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        default: 'GENERAL'
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }

});
const Notes = mongoose.model("Notes", noteSchema);
module.exports = Notes