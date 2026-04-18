import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number, decimals: number = 1): string {
  if (value === null || value === undefined || isNaN(value)) return '0'

  const absValue = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  if (absValue < 1_000) return `${sign}${absValue}`
  if (absValue < 1_000_000) return `${sign}${(absValue / 1_000).toFixed(decimals)}K`
  if (absValue < 1_000_000_000) return `${sign}${(absValue / 1_000_000).toFixed(decimals)}M`
  if (absValue < 1_000_000_000_000) return `${sign}${(absValue / 1_000_000_000).toFixed(decimals)}B`
  return `${sign}${(absValue / 1_000_000_000_000).toFixed(decimals)}T`
}

export const formatAddress = (address?: string) =>
  address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";

/**
 * Convert user-entered SOL (or token) amount into lamports (BigInt)
 * @param uiAmount string or number input by the user (like "0.0005")
 * @param decimals number of decimals the token uses, default 9 for SOL
 * @returns BigInt lamports
 */
export function fromUiAmount(uiAmount: string | number, decimals = 9): bigint {
  // Convert string to number
  const amountNum =
    typeof uiAmount === "string" ? parseFloat(uiAmount) : uiAmount;

  if (isNaN(amountNum) || amountNum < 0) {
    throw new Error("Invalid amount");
  }

  // Multiply by 10^decimals as string to avoid floating point precision issues
  const multiplier = 10 ** decimals;
  const lamportsStr = (amountNum * multiplier).toFixed(0); // round to nearest integer as string

  return BigInt(lamportsStr);
}

export function lamportsToSol(lamports: number): number {
  return lamports / 1_000_000_000;
}

export function unixToDate(seconds: number): Date {
  return new Date(seconds * 1000);
}

export const getAvatarUrl = (address: string) => {
  return `https://api.dicebear.com/7.x/identicon/png?seed=${address || ''}`
}

export const getTwitterUrl = (username: string) => {
  if (!username) return '#'
  // Remove @ if present and format URL
  const cleanUsername = username.replace('@', '')
  return `https://twitter.com/${cleanUsername}`
}

export const getDiscordUrl = (username: string) => {
  if (!username) return '#'
  // Discord doesn't have direct profile links, but we can use discordapp.com
  return `https://discord.com/users/${username}`
}

export const handleCopy = async (address: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
  try {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  } catch (err) {
    console.error('Copy failed', err)
  }
}