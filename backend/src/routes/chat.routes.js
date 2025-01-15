const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

router.post('/', chatController.createChat);
router.get('/:id', chatController.getChat);
router.post('/:id/message', chatController.addMessage);

module.exports = router;