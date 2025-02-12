export interface ConsentOptions {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export type ConsentType = "accepted" | "rejected";