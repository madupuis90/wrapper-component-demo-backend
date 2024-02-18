const express = require('express');
const app = express();

let user = {
  name: 'bob',
  age: 15,
  email: 'a@n.com'
};

// Middleware to parse JSON body
app.use(express.json());

// Route for GET /user
app.get('/user', (req, res) => {
  console.log("GET User")
  res.json(user);
});


// Route for PUT 
app.put('/user', async (req, res) => {
  console.log('PUT User')
  user = req.body;
  console.log(user)
  res.json(user);
});

// Route for PATCH
app.patch('/user', async (req, res) => {
  console.log('PATCH User', req.body)

  if (req.body['age'] == 15) {
    res.status(400).send({ message: 'invalid age' });
    return;
  }
  user = { ...user, ...req.body };
  console.log('patched user:', user)
  res.json(user);
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
