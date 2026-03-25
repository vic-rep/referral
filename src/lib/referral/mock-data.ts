import { UserReferralProfile, ReferralTransaction } from "./types";
import { getTierFromCount } from "./logic";

/**
 * Mock user profile for development.
 * Change successfulReferralCount to test different tier states.
 */
export const MOCK_USER_PROFILE: UserReferralProfile = {
  currentTier: getTierFromCount(4),
  successfulReferralCount: 4,
  referralLink: "https://trusti.bg/ref/ABC123",
  referralCode: "ABC123",
  walletBalance: 35.22,
  walletBalanceBGN: 68.89,
};

export const MOCK_USER_NAME = "Иван Петров";

export const MOCK_TRANSACTIONS: ReferralTransaction[] = [
  {
    id: "txn-001",
    type: "referral_bonus",
    amount: 7.67,
    amountBGN: 15.0,
    createdAt: "2026-03-20T14:30:00Z",
    referredUserName: "Мария Георгиева",
  },
  {
    id: "txn-002",
    type: "milestone_bonus",
    amount: 10.23,
    amountBGN: 20.0,
    createdAt: "2026-03-18T10:00:00Z",
  },
  {
    id: "txn-003",
    type: "referral_bonus",
    amount: 5.11,
    amountBGN: 9.99,
    createdAt: "2026-03-15T09:15:00Z",
    referredUserName: "Петър Николов",
  },
  {
    id: "txn-004",
    type: "referral_bonus",
    amount: 5.11,
    amountBGN: 9.99,
    createdAt: "2026-03-10T16:45:00Z",
    referredUserName: "Елена Димитрова",
  },
  {
    id: "txn-005",
    type: "referral_bonus",
    amount: 5.11,
    amountBGN: 9.99,
    createdAt: "2026-03-05T11:20:00Z",
    referredUserName: "Георги Стоянов",
  },
  {
    id: "txn-006",
    type: "insurance_discount",
    amount: 3.5,
    amountBGN: 6.85,
    createdAt: "2026-03-01T08:00:00Z",
  },
];
