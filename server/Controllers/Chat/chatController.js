import { connectToDb } from '../../db.js';
import { ObjectId } from 'mongodb';


const chatController = {
    
    saveMessage: async (fromUserId,fromUserName, toUserId,toUserName, message, listingId) => {
        try {
            const db = await connectToDb();
    
            const chatId = [fromUserId, toUserId, listingId].sort().join('-');  // Create a consistent ID
            const chatMessage = {
                fromUserId,
                fromUserName,
                toUserId,
                toUserName,
                message,
                listingId,
                createdAt: new Date()
            };
    
            // Add message to existing session
            await db.collection('chatMessages').updateOne(
                { _id: chatId },
                { $push: { messages: chatMessage } }
            );
    
            return chatMessage;  // Return the saved message for further processing
        } catch (error) {
            console.error('Error saving message:', error);
            throw new Error('Failed to save message');
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

    
    getOrCreateChatSession: async (req, res) => {
        try {
            const db = await connectToDb();
            const { listingId, userId, username } = req.params;
    
            const product = await db.collection('products').findOne({ _id: new ObjectId(listingId) });
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
    
            const chatId = [userId, product.user._id, listingId].sort().join('-'); 
    
            let chatSession = await db.collection('chatMessages').findOne({ _id: chatId });
            if (!chatSession) {
                chatSession = {
                    _id: chatId,
                    Title: product.title, 
                    fromUserId: userId,
                    fromUserName:username ,
                    toUserId: product.user._id.toString(),
                    toUserName: product.user.firstName,
                    listingId,
                    messages: [],
                    createdAt: new Date()
                };
                await db.collection('chatMessages').insertOne(chatSession);
            }
    
            res.status(200).json(chatSession);
        } catch (error) {
            console.error('Error fetching or creating chat session:', error);
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
