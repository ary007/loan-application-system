import { BusinessDetails } from "./BusinessDetails";

type ProfitOrLossByYear = {
  year: number;
  profitOrLoss: number;
};
export type LoanApplication = {
  businessDetails: BusinessDetails;
  preAssessment: number;
  profitOrLossSummary: ProfitOrLossByYear[];
  accountingProvider: string;
  loanAmount: number;
  applicationDate: Date
};