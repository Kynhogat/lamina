// app/market/types.ts
export type MarketType = "node-c" | "node-g" | "wrktmp";

export type AuthResponse = {
  displayname: string;
  accessToken?: string;
  refreshToken?: string;
};

export type ValidateResponse = {
  displayname: string;
  username: string;
};

export type SearchItem = {
  title: string;
  type: MarketType;
  shortDescription: string;
  longDescription?: string | null;
  username: string;
};

export type SearchResponse = {
  objectArray: SearchItem[];
};

export type MarketResult = {
  items: SearchItem[];
  usedMock: boolean;
  error?: string;
};
