import { connectToDb } from '../../db.js';
import { ObjectId } from 'mongodb';


const chatController = {
    
    saveMessage: async (req, res) => {
        try {
            const db = await connectToDb();
            const fromUserId = req.user.userId;
            console.log(fromUserId)

            const { toUserId, message, listingId } = req.body;
    
            const chatId = `${fromUserId}-${toUserId}-${listingId}`;
            const chatMessage = {
                fromUserId,
                toUserId,
                message,
                listingId,
                createdAt: new Date()
            };
    
            let chatSession = await db.collection('chatMessages').findOne({ _id: chatId });
            if (!chatSession) {
                chatSession = {
                    _id: chatId,
                    fromUserId,
                    toUserId,
                    listingId,
                    messages: [],
                    createdAt: new Date()
                };
                await db.collection('chatMessages').insertOne(chatSession);
            }
    
            await db.collection('chatMessages').updateOne(
                { _id: chatId },
                { $push: { messages: chatMessage } }
            );
    
            res.status(201).json({ message: 'Message saved successfully', chatMessage });
        } catch (error) {
            console.error('Error saving message:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    
    getChatHistory: async (req, res) => {
        try {
            const db = await connectToDb();
            const { userId, listingId } = req.params;

            const chatHistory = await db.collection('chatMessages')
                                        .find({ $or: [{ fromUserId: userId, listingId }, { toUserId: userId, listingId }] })
                                        .sort({ createdAt: 1 })
                                        .toArray();

            res.status(200).json({ message: 'Chat history fetched successfully', chatHistory });
        } catch (error) {
            console.error('Error fetching chat history:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    createChatSession: async (req, res) => {
        try {
            const db = await connectToDb();
            const { userIds, listingId } = req.body; 

            const chatSession = {
                userIds,
                listingId,
                createdAt: new Date()
            };

            const result = await db.collection('chatSessions').insertOne(chatSession);
            if (result.acknowledged) {
                res.status(201).json({ message: 'Chat session created successfully', chatSession });
            } else {
                res.status(500).json({ error: 'Failed to create chat session' });
            }
        } catch (error) {
            console.error('Error creating chat session:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAllChatsForUser: async (req, res) => {
        try {
            const db = await connectToDb();
            const userId = req.params.userId; 
            const chats = await db.collection('chatMessages')
                                   .find({ $or: [{ fromUserId: userId }, { toUserId: userId }] })
                                   .sort({ createdAt: 1 })
                                   .toArray();

            res.status(200).json({ message: 'All chats for user fetched successfully', chats });
        } catch (error) {
            console.error('Error fetching all chats for user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAllChatsForListing: async (req, res) => {
        try {
            const db = await connectToDb();
            const listingId = req.params.listingId; 

            const chats = await db.collection('chatMessages')
                                   .find({ listingId })
                                   .sort({ createdAt: 1 })
                                   .toArray();

            res.status(200).json({ message: 'All chats for listing fetched successfully', chats });
        } catch (error) {
            console.error('Error fetching all chats for listing:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export default chatController;
