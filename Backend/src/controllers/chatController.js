
const chatModel = require('../models/chatModel')
const userModel = require('../models/userModel')


const createChat = async (req, res) => {
      const { userId } = req.body;

      if (!userId) {
            return res.status(400).send({ status: false, message: 'Something went wrong with user param' });
      }

      var isChat = await chatModel.find({
            isGroupChat: false,
            $and: [
                  { users: { $elemMatch: { $eq: req.user._id } } },
                  { users: { $elemMatch: { $eq: userId } } },
            ],
      })
            .populate('users', '-password')
            .populate('latestMessage');

      isChat = await userModel.populate(isChat, {
            path: 'latestMessage.sender',
            select: 'name picture email'
      });

      if (isChat.length > 0) {
            res.send(isChat[0]);
      } else {
            var chatData = {
                  chatName: 'sender',
                  isGroupChat: false,
                  users: [req.user._id, userId],
            };
            try {
                  const createdChat = await chatModel.create(chatData);
                  const fullChat = await chatModel.findOne({ _id: createdChat._id })
                        .populate('users', '-password');
                  return res.status(200).send({ status: true, fullChat });
            } catch (error) {
                  return res.status(500).send({ status: false, message: error.message });
            }
      }
}

const fetchChat = async (req, res) => {
      try {
            let data = await chatModel.find({
                  users: { $elemMatch: { $eq: req.user._id } }
            }).populate('users', '-password')
                  .populate('groupAdmin', '-password')
                  .populate('latestMessage')
                  .sort({ updatedAt: -1 })
                  .then(async (res1) => {
                        res1 = await userModel.populate(res1, {
                              path: "latestMessage.sender",
                              select: "name picture email",
                        })
                        return res.status(200).send(  res1 );

                  })
      } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
      }
}

const createGroupChat = async (req, res) => {
      if (!req.body.users || !req.body.name) {
            return res.status(400).send({ status: false, message: 'Please fill all the field' });
      }

      var user = JSON.parse(req.body.users);

      if (user.length < 2) {
            return res.status(400).send({ status: false, message: 'Required more than 2 user in group chat' });
      }
      user.push(req.user);
      try {
            const groupChat = await chatModel.create({
                  chatName: req.body.name,
                  users: user,
                  isGroupChat: true,
                  groupAdmin: req.user,
            });

            const fullGroupChat = await chatModel.findOne({ _id: groupChat._id })
                  .populate('users', '-password')
                  .populate('groupAdmin', '-password');

            return res.status(200).send({ status: true, fullGroupChat });
      } catch (error) {
            return res.status(500).send({ status: false, message: error.message });
      }
}

const renameGroup = async (req, res) => {
      try {
            const { chatId, chatName } = req.body;

            const updatedChat = await chatModel.findByIdAndUpdate(chatId, { $set: { chatName: chatName } },
                  { new: true })
                  .populate('users', '-password')
                  .populate('groupAdmin', '-password');
            if (!updatedChat) {
                  return res.status(400).send({ Status: false, message: 'something went wrong on group' })
            } else {
                  return res.status(200).send({ status: true, updatedChat });
            }
      } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
      }
}

const removeFromGroup = async (req, res) => {
      try {
            const { chatId, userId } = req.body;

            const removed = await chatModel.findByIdAndUpdate(
                  chatId, {
                  $pull: { users: userId },
            }, { new: true }
            ).populate('users', '-password')
                  .populate('groupAdmin', '-password');

            if (!removed) {
                  return res.status(400).send({ status: false, message: 'something went wrong in group' })
            } else {
                  return res.status(200).send({ Status: true, removed })
            }
      } catch (error) {
            return res.status(500).send({ Status: false, message: error.message });
      }
}

const addTOGroup = async (req, res) => {
      try {
            const { chatId, userId } = req.body;

            const added = await chatModel.findByIdAndUpdate(
                  chatId, {
                  $push: { users: userId }
            }, { new: true }
            ).populate('users', '-password')
                  .populate('groupAdmin', '-password')

            if (!added) {
                  return res.status(400).send({ status: false, message: 'something went wrong in group' })
            } else {
                  return res.status(200).send({ status: true, added })
            }
      } catch (error) {
            return res.status(500).send({ status: false , message: error.message})
      }
}

module.exports = { createChat, fetchChat, createGroupChat, renameGroup, removeFromGroup, addTOGroup }