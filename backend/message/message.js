const Messages = require("../model/messages");
const express = require("express");
const router = express.Router();

// create new message
router.post(
  "/create-new-message",async (req, res) => {
    try {
      const messageData = req.body;
 

      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Messages({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
;

// get all messages with conversation id
router.get(
  "/get-all-messages",async (req, res) => {
    try {
      const messages = await Messages.find();

      res.status(201).json({
        success: true,
        messages,
      });

    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
;

module.exports = router;
