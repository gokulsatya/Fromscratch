const Chat = require('../models/chat.model');
const MitreService = require('../services/mitre.service');

exports.createChat = async (req, res) => {
    try {
        // Search MITRE data
        const attackResults = await MitreService.searchTechniques(req.body.message);
        
        // Create chat with both user message and AI response
        const chat = new Chat({
            messages: [
                {
                    role: 'user',
                    content: req.body.message
                },
                {
                    role: 'assistant',
                    content: generateResponse(req.body.message, attackResults),
                    sources: attackResults.map(result => result.id)
                }
            ]
        });
        await chat.save();
        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addMessage = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        chat.messages.push({
            role: req.body.role,
            content: req.body.content,
            sources: req.body.sources
        });
        await chat.save();
        res.json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};