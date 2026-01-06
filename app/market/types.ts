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

export type CreateObjectInput = {
  type: MarketType;
  title: string;
  shortDescription: string;
  longDescription: string;
  file: File;
  // username can be in form (your backend currently expects it in POST);
  // if later you derive it from token, you can remove it from UI.
  username: string;
};

export type UpdateObjectInput = {
  type: MarketType;
  username: string;
  oldTitle: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  file?: File | null;
};
