const Message = require('../models/messageModel');

exports.getMessages = async (req, res) => {
    const messages = await Message.getAll();
    res.json(messages);
};

exports.createMessage = async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const newMessage = await Message.create({ name, email, message });
    res.status(201).json(newMessage);
};

exports.deleteMessage = async (req, res) => {
    const { id } = req.params;
    await Message.delete(id);
    res.status(204).end();
};
