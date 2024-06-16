const express = require('express');
const path = require('path');
const app = express();

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app in production
  app.use(express.static(path.join(__dirname, 'client/build')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Put all API endpoints under '/api'
app.get('/api', (req, res) => {
  // Handle API requests here
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});