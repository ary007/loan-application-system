import { BalanceSheet } from "../types/BalanceSheet";
import { LoanApplication } from "../types/LoanApplication";

export const getPreAssessment = (balanceSheetData: BalanceSheet[], applicationRequestData: LoanApplication): number => {
  const applicationDate = new Date();
  const loanAmount = applicationRequestData.loanAmount;
  const twelveMonthsAgo = new Date(applicationDate.getFullYear() - 1, applicationDate.getMonth(), applicationDate.getDate());
  const balanceSheetDataForLastTwelveMonths = balanceSheetData.filter((balanceSheet: BalanceSheet) => {
    const balanceSheetDate = new Date(balanceSheet.year, balanceSheet.month, 1);
    return balanceSheetDate > twelveMonthsAgo && balanceSheetDate <= applicationDate;
  });
    const profitOrLossForLastTwelveMonths = balanceSheetDataForLastTwelveMonths.reduce((accumulator: number, balanceSheet: BalanceSheet) => {
    return accumulator + balanceSheet.profitOrLoss;
  }, 0);
  const assetsValueForLastTwelveMonths = balanceSheetDataForLastTwelveMonths.reduce((accumulator: number, balanceSheet: BalanceSheet) => {
    return accumulator + balanceSheet.assetsValue;
  }, 0);
  const averageAssetsValueForLastTwelveMonths = assetsValueForLastTwelveMonths / 12;
  if (averageAssetsValueForLastTwelveMonths> loanAmount) {
    return 100;
  } else if (profitOrLossForLastTwelveMonths > 0) {
    return 60;
  } else {
    return 20;
  }
}

