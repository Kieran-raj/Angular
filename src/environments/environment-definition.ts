export interface Environment {
  production: boolean;
  baseUrl: string;
  domain: string;
  clientId: string;
  clientSecret: string;
  audience: string;
  callbackUrl: string;
  logoutReturnUrl: string;
}
