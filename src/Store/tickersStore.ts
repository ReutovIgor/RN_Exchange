import { makeAutoObservable, runInAction } from "mobx"
import { TICKER_STORE_DONE, TICKER_STORE_ERROR, TICKER_STORE_PENDING, TICKER_STORE_PENDING_ERROR, UPDATE_DALAY } from "../const"
import { TickerStoreItem, TickerStoreState } from "../types"

class TickerStore {
  state: TickerStoreState = TICKER_STORE_PENDING
  tickers: Array<TickerStoreItem> | null = null
  timerId: number | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async fetchTickerData() {
    runInAction(() => {
      this.state = this.state === TICKER_STORE_ERROR ? TICKER_STORE_PENDING_ERROR : TICKER_STORE_PENDING
    })
    try {
      const response = await fetch("https://poloniex.com/public?command=returnTicker")
      const json = await response.json()
      const newData: Array<TickerStoreItem> = []
      for (let name in json) {
        newData.push({
          id: json[name].id,
          name,
          last: json[name].last,
          highestBid: json[name].highestBid,
          percentChange: json[name].percentChange,
        })
      }
      runInAction(() => {
        this.tickers = newData
        this.state = TICKER_STORE_DONE
        this.startTimer()
      })
    } catch (err) {
      console.error("Error", err);
      runInAction(() => {
        this.state = TICKER_STORE_ERROR
        this.startTimer()
      })
    }
  }

  startTimer() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId)
    }
    this.timerId = setTimeout(() => { this.fetchTickerData() }, UPDATE_DALAY)
  }

  stopTimer() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId)
      this.timerId = null
    }
  }
}

export const tickersStore = new TickerStore();
