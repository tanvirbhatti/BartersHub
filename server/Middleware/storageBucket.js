import multer from 'multer';
import admin from 'firebase-admin';
import serviceAccount from '../Controllers/Products/bartershub-ce704-firebase-adminsdk-xteoa-7eb3778243.json' assert { type: 'json' };;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'bartershub-ce704.appspot.com'
  });
  
  const bucket = admin.storage().bucket();


  const upload = multer({
    storage: multer.memoryStorage(),
  });
  
  // Middleware to upload a file to Firebase Storage
  const uploadToFirebaseStorage = upload.single('image');
  
  export const firebaseUploadMiddleware = (req, res, next) => {
    uploadToFirebaseStorage(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      // Proceed only if a file is received
      if (!req.file) {
        return next();
      }
  
      // Define file name and upload the file to Firebase
      const fileName = `uploads/${Date.now()}-${req.file.originalname}`;
      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
  
      blobStream.on('error', (error) => {
        console.error(error);
        return res.status(500).json({ error: 'Failed to upload file to Firebase Storage.' });
      });
  
      blobStream.on('finish', async () => {
        // Make the file publicly accessible (optional based on your requirement)
        await blob.makePublic();
  
        // Construct the file URL
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        
        // Attach the URL to the request object
        req.file.firebaseUrl = publicUrl;
  
        next();
      });
  
      blobStream.end(req.file.buffer);
    });
  };
  
//   export default firebaseUploadMiddleware;