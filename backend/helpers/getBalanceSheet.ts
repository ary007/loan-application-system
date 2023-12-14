import NodeCache from "node-cache";
import { BalanceSheet } from "../types/BalanceSheet";
import axios from "axios";

export const getBalanceSheet = async (balanceSheetUrl: string, cache: NodeCache): Promise<BalanceSheet[]> => {
  if (cache.get(balanceSheetUrl)) {
    return cache.get(balanceSheetUrl) as BalanceSheet[];
  }
  else {
    const response = await axios.get(balanceSheetUrl);
    const balanceSheetData: BalanceSheet[] = response.data;
    // Cache the API response for 10 minutes
    cache.set(balanceSheetUrl, balanceSheetData, 600);
    return balanceSheetData;
  }
};