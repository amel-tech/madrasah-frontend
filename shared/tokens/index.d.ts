/**
 * Type definitions for @madrasah/tokens
 */

export interface TokenValue {
  [key: string]: string | TokenValue
}

export interface Tokens {
  color?: TokenValue
  font?: TokenValue
  [key: string]: TokenValue | undefined
}

export interface Colors extends TokenValue { }
export interface Fonts extends TokenValue { }

export const tokens: Tokens
export const colors: Colors
export const fonts: Fonts

export function getToken(path: string): string | TokenValue | undefined
export function getCSSVariable(tokenName: string): string

declare const defaultExport: {
  tokens: Tokens
  colors: Colors
  fonts: Fonts
  getToken: typeof getToken
  getCSSVariable: typeof getCSSVariable
}

export default defaultExport
