export type TierLevel = 1 | 2 | 3;

export type TierSlug = "friend" | "ambassador" | "champion";

export type TierName = "Приятел" | "Посланик" | "Шампион";

export type ReferralTier = {
  level: TierLevel;
  name: TierName;
  slug: TierSlug;
  threshold: number;
  bonusPerReferral: number;
  bonusPerReferralBGN: number;
  milestoneBonus: number | null;
  milestoneBonusBGN: number | null;
  insuranceDiscount: number | null;
};

export type UserReferralProfile = {
  currentTier: ReferralTier;
  successfulReferralCount: number;
  referralLink: string;
  referralCode: string;
  walletBalance: number;
  walletBalanceBGN: number;
};

export type ReferralTransactionType =
  | "referral_bonus"
  | "milestone_bonus"
  | "insurance_discount";

export type ReferralTransaction = {
  id: string;
  type: ReferralTransactionType;
  amount: number;
  amountBGN: number;
  createdAt: string;
  referredUserName?: string;
};

export type TierProgress = {
  current: ReferralTier;
  next: ReferralTier | null;
  progress: number;
  remaining: number;
};
