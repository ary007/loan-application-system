import express from 'express';
import axios from 'axios';

import { createMiddleware } from '@mswjs/http-middleware'
import { handlers } from './mock/handlers'

const port = 3200;

const app = express();

app.use(createMiddleware(...handlers));

app.get('/test', (_req, res)=>{
 res.send({data: 'Hello from server'});
});

app.post('/api/initiate-application', (_req, res)=>{
  res.send({'message': 'Application initiated'});
 });

app.post('/api/balance-sheet', async (_req, res)=>{
  const response = await axios.get('http://localhost:3200/accounting/balance-sheet');

  // Process the response data as needed
  const responseData = response.data;

  res.json(responseData);
}); 

app.listen(port, ()=>{
  console.log(`Server running on ${port}`);
});