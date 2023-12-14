import express from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';

import { createMiddleware } from '@mswjs/http-middleware'
import { handlers } from './mock/handlers'
import { generateRandomInteger } from './helpers/generateApplicationId';
import { BalanceSheet } from './types/BalanceSheet';
import { BalanceSheetRequest } from './types/BalanceSheetREquest';
import { LoanApplication } from './types/LoanApplication';
import { getBalanceSheet } from './helpers/getBalanceSheet';
import { getPreAssessment } from './helpers/getPreAssessment';

const port = 3200;

const app = express();
const cache = new NodeCache();
const accountingApiUrl = 'http://localhost:3200/accounting/balance-sheet';

app.use(express.json());
app.use(createMiddleware(...handlers));

app.get('/test', (_req, res) => {
  res.send({ data: 'Hello from server' });
});

app.get('/api/initiate-application', (_req, res) => {
  // Generate a random integer between 1 and 100 
  const applicationId = generateRandomInteger(1, 100);
  res.send({ 'applicationId': applicationId });
});

app.post('/api/balance-sheet-request', async (req, res) => {
  const balanceSheetRequestData: BalanceSheetRequest = req.body;
  const balanceSheetUrl = `${accountingApiUrl}`+
                          `?business=${balanceSheetRequestData.businessDetails.name}`+
                          `&accountingProvider=${balanceSheetRequestData.accountingProvider}`;
  const balanceSheetData = await getBalanceSheet(balanceSheetUrl, cache);
  res.json(balanceSheetData);
});

app.post('/api/application-request', async (req, res) => {
  const applicationRequestData: LoanApplication = req.body;
  const balanceSheetUrl = `${accountingApiUrl}`+
                          `?business=${applicationRequestData.businessDetails.name}`+
                          `&accountingProvider=${applicationRequestData.accountingProvider}`;
  const balanceSheetData = await getBalanceSheet(balanceSheetUrl, cache);
  const preAssessment = getPreAssessment(balanceSheetData, applicationRequestData); 
  const response = await axios.get('http://localhost:3200/decision-engine-api/request');
  console.log("preassessment: ", preAssessment);

  // Process the response data as needed
  const responseData = response.data;

  res.json(responseData);
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});