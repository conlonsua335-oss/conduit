import { apiRequest } from "./client";
import type { ArticlesResponse } from "../types";

export const listArticles = (limit = 10, offset = 0, tag?: string) =>
  apiRequest<ArticlesResponse>(
    `/articles?limit=${limit}&offset=${offset}${tag ? `&tag=${tag}` : ""}`
  );

export const feedArticles = (limit = 10, offset = 0) =>
  apiRequest<ArticlesResponse>(
    `/articles/feed?limit=${limit}&offset=${offset}`
  );