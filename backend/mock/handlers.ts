import { http, HttpResponse } from 'msw'
import balanceSheet from "./stubs/balance-sheet.json"
 
export const handlers = [
  http.get('/accounting/balance-sheet', () => {
    return HttpResponse.json((balanceSheet))
  }),
];