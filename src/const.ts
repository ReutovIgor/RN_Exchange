import { TickerStoreState } from "./types"

export const UPDATE_DALAY = 5000

export const TICKER_STORE_DONE:TickerStoreState = "done"
export const TICKER_STORE_PENDING:TickerStoreState = "pending"
export const TICKER_STORE_PENDING_ERROR:TickerStoreState = "pending_error"
export const TICKER_STORE_ERROR:TickerStoreState = "error"