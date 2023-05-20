
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
                        return res.status(200).send({ status: true, res1 });

                  })
                  console.log(data);
      } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
      }
}

module.exports = { createChat, fetchChat }