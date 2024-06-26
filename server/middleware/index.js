// Middleware for extracting API key
const extractApiKey = (req, res, next) => {
    req.apiKey = req.headers['api-key'];
    if (!req.apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }
    next();
  };
  
// Middleware for error handling
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
  
module.exports = { extractApiKey, asyncHandler };