import axios from 'axios';

const BINANCE_API_BASE = 'https://api.binance.com/api/v3';
const BINANCE_WS_BASE = 'wss://stream.binance.com:9443/ws';

export interface BinanceSymbol {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  status: string;
  baseAssetPrecision: number;
  quotePrecision: number;
  quoteAssetPrecision: number;
  orderTypes: string[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: any[];
  permissions: string[];
}

export interface BinanceTicker {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

export interface BinanceKline {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteAssetVolume: string;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: string;
  takerBuyQuoteAssetVolume: string;
  ignore: string;
}

export interface BinanceOrderBook {
  lastUpdateId: number;
  bids: [string, string][];
  asks: [string, string][];
}

export interface BinanceTrade {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

export interface BinanceWebSocketTicker {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  c: string; // Close price
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  v: string; // Total traded base asset volume
  q: string; // Total traded quote asset volume
  P: string; // Price change percent
  p: string; // Price change
  Q: string; // Last quantity
  F: number; // First trade ID
  L: number; // Last trade ID
  n: number; // Total number of trades
}

export interface BinanceWebSocketTrade {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  t: number; // Trade ID
  p: string; // Price
  q: string; // Quantity
  b: number; // Buyer order ID
  a: number; // Seller order ID
  T: number; // Trade time
  m: boolean; // Is the buyer the market maker?
  M: boolean; // Ignore
}

export interface BinanceWebSocketDepth {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  U: number; // First update ID in event
  u: number; // Final update ID in event
  b: [string, string][]; // Bids to be updated
  a: [string, string][]; // Asks to be updated
}

class BinanceApiService {
  private ws: WebSocket | null = null;
  private subscribers: Map<string, Function[]> = new Map();

  // Get exchange info
  async getExchangeInfo(): Promise<{ symbols: BinanceSymbol[] }> {
    try {
      const response = await axios.get(`${BINANCE_API_BASE}/exchangeInfo`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exchange info:', error);
      throw error;
    }
  }

  // Get 24hr ticker statistics
  async get24hrTicker(symbol?: string): Promise<BinanceTicker | BinanceTicker[]> {
    try {
      const url = symbol 
        ? `${BINANCE_API_BASE}/ticker/24hr?symbol=${symbol}`
        : `${BINANCE_API_BASE}/ticker/24hr`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching 24hr ticker:', error);
      throw error;
    }
  }

  // Get kline/candlestick data
  async getKlines(symbol: string, interval: string, limit: number = 500): Promise<BinanceKline[]> {
    try {
      const response = await axios.get(`${BINANCE_API_BASE}/klines`, {
        params: {
          symbol,
          interval,
          limit
        }
      });
      return response.data.map((kline: any[]) => ({
        openTime: kline[0],
        open: kline[1],
        high: kline[2],
        low: kline[3],
        close: kline[4],
        volume: kline[5],
        closeTime: kline[6],
        quoteAssetVolume: kline[7],
        numberOfTrades: kline[8],
        takerBuyBaseAssetVolume: kline[9],
        takerBuyQuoteAssetVolume: kline[10],
        ignore: kline[11]
      }));
    } catch (error) {
      console.error('Error fetching klines:', error);
      throw error;
    }
  }

  // Get order book
  async getOrderBook(symbol: string, limit: number = 100): Promise<BinanceOrderBook> {
    try {
      const response = await axios.get(`${BINANCE_API_BASE}/depth`, {
        params: {
          symbol,
          limit
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching order book:', error);
      throw error;
    }
  }

  // Get recent trades
  async getRecentTrades(symbol: string, limit: number = 500): Promise<BinanceTrade[]> {
    try {
      const response = await axios.get(`${BINANCE_API_BASE}/trades`, {
        params: {
          symbol,
          limit
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recent trades:', error);
      throw error;
    }
  }

  // Get current price
  async getCurrentPrice(symbol: string): Promise<{ symbol: string; price: string }> {
    try {
      const response = await axios.get(`${BINANCE_API_BASE}/ticker/price`, {
        params: { symbol }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching current price:', error);
      throw error;
    }
  }

  // WebSocket connection management
  connectWebSocket(streams: string[]): void {
    if (this.ws) {
      this.ws.close();
    }

    const streamParam = streams.join('/');
    const wsUrl = `${BINANCE_WS_BASE}/${streamParam}`;
    
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleWebSocketMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      // Attempt to reconnect after 3 seconds
      setTimeout(() => {
        if (streams.length > 0) {
          this.connectWebSocket(streams);
        }
      }, 3000);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private handleWebSocketMessage(data: any): void {
    if (data.stream) {
      const stream = data.stream;
      const eventData = data.data;
      
      const subscribers = this.subscribers.get(stream);
      if (subscribers) {
        subscribers.forEach(callback => callback(eventData));
      }
    }
  }

  // Subscribe to WebSocket events
  subscribe(stream: string, callback: Function): void {
    if (!this.subscribers.has(stream)) {
      this.subscribers.set(stream, []);
    }
    this.subscribers.get(stream)?.push(callback);
  }

  // Unsubscribe from WebSocket events
  unsubscribe(stream: string, callback: Function): void {
    const subscribers = this.subscribers.get(stream);
    if (subscribers) {
      const index = subscribers.indexOf(callback);
      if (index > -1) {
        subscribers.splice(index, 1);
      }
    }
  }

  // Disconnect WebSocket
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.subscribers.clear();
  }

  // Utility methods
  formatPrice(price: string | number): string {
    const num = typeof price === 'string' ? parseFloat(price) : price;
    if (num >= 1) {
      return num.toFixed(2);
    } else if (num >= 0.01) {
      return num.toFixed(4);
    } else {
      return num.toFixed(8);
    }
  }

  formatVolume(volume: string | number): string {
    const num = typeof volume === 'string' ? parseFloat(volume) : volume;
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    } else {
      return num.toFixed(2);
    }
  }

  formatMarketCap(marketCap: number): string {
    if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(2)}B`;
    } else if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(2)}M`;
    } else if (marketCap >= 1000) {
      return `$${(marketCap / 1000).toFixed(2)}K`;
    } else {
      return `$${marketCap.toFixed(2)}`;
    }
  }
}

export const binanceApi = new BinanceApiService();
