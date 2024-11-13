// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).send('Token is required');
  
  try {
    const decoded = jwt.verify(token, '4023bbc4399ae3589bfe7e6a58d7023278ee2a1556105a529f960809993b35e35bc9f9f8c24daa4e6f05325554a3cd342e9dce9f68fcbb0632069042d17d85fd'); // Use your actual secret key
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).send('Invalid token');
  }
};

export default authenticate;
