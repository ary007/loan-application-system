export type BalanceSheet = {
  /**
   * year of the record.
   */
  year: number;
  /**
   * month of the record in the particular year.
   */  
  month: number;
  /**
   * profit or loss in the particular month of that year.
   */
  profitOrLoss: number;
  /**
   * total assets in the particular month of that year.
   */
  assetsValue: number;
}