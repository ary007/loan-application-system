import { http, HttpResponse } from 'msw'
import balanceSheet from "./stubs/balance-sheet.json"
import decisionResponse from "./stubs/decision-response.json"
 
export const handlers = [
  http.get('/accounting/balance-sheet', () => {
    return HttpResponse.json((balanceSheet))
  }),
  http.get('/decision-engine-api/request', () => {
    return HttpResponse.json((decisionResponse))
  }),
];