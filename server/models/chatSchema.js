import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    fromUserId: String,
    fromUserName: String,
    toUserId: String,
    toUserName: String,
    message: String,
    listingId: String,
    createdAt: Date
});

const chatSchema = new Schema({
    Title: String,
    fromUserId: String,
    fromUserName: String,
    toUserId: String,
    toUserName: String,
    listingId: String,
    messages: [messageSchema],
    createdAt: Date
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
