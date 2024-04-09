import { PlaywrightTestConfig } from "@playwright/test";

export interface environmentConfig extends PlaywrightTestConfig {
  baseUrl: string;
  username: string;
  password: string;
  // Declare more properies or variables
  // Repeat same steps like baseUrl
}

export const environment: Record<string, environmentConfig> = {
  dev: {
    baseUrl: "https://www.saucedemo.com/",
    username: "brian.rivadulla@ttcglobal.com",
    password: "Test@1234"
  },
  test: {
    baseUrl: "https://stage.mysite.com",
    username: "brian.rivadulla@ttcglobal.com",
    password: "Test@1234"
  },
  prod: {
    baseUrl: "https://prod.mysite.com",
    username: "brian.rivadulla@ttcglobal.com",
    password: "Test@1234"
  },
};
