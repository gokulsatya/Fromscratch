const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sources: [{
        type: String,
        ref: 'MitreSource'
    }],
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const chatSchema = new mongoose.Schema({
    messages: [messageSchema],
    shareId: {
        type: String,
        unique: true,
        sparse: true
    },
    isPrivate: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);