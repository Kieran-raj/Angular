export interface AuthToken {
  /**
   * Bearer Token
   */
  token: string;

  /**
   * Expiration Time (mins)
   */
  expirationTime: string;
}
