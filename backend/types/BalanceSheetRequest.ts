import { BusinessDetails } from "./BusinessDetails";

export type BalanceSheetRequest = {
  businessDetails: BusinessDetails; 
  accountingProvider: string;
}