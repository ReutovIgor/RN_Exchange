export type TickerStoreState = "pending" | "done" | "error" | "pending_error"

export type TickerStoreItem = {
  id: number;
  name: string;
  last: string;
  highestBid: string;
  percentChange: string;
}
