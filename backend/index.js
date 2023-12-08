const express = require('express');

const port = 3200;

const app = express();

app.get('/test', (req, res)=>{
 res.send({data: 'Hello from server'});
});

app.listen(port, ()=>{
  console.log(`Server running on ${port}`);
});