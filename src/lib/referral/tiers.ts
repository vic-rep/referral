import { ReferralTier } from "./types";

export const TIERS: readonly ReferralTier[] = [
  {
    level: 1,
    name: "Приятел",
    slug: "friend",
    threshold: 0,
    bonusPerReferral: 5.11,
    bonusPerReferralBGN: 9.99,
    milestoneBonus: null,
    milestoneBonusBGN: null,
    insuranceDiscount: null,
  },
  {
    level: 2,
    name: "Посланик",
    slug: "ambassador",
    threshold: 3,
    bonusPerReferral: 7.67,
    bonusPerReferralBGN: 15.0,
    milestoneBonus: 10.23,
    milestoneBonusBGN: 20.0,
    insuranceDiscount: 5,
  },
  {
    level: 3,
    name: "Шампион",
    slug: "champion",
    threshold: 10,
    bonusPerReferral: 12.78,
    bonusPerReferralBGN: 24.99,
    milestoneBonus: 25.56,
    milestoneBonusBGN: 49.99,
    insuranceDiscount: 10,
  },
] as const;

export const FRIEND_BONUS = {
  eur: 5.11,
  bgn: 9.99,
} as const;

export const TIER_ICONS: Record<number, string> = {
  1: "fa-user",
  2: "fa-star",
  3: "fa-trophy",
};

export function getTierByLevel(level: 1 | 2 | 3): ReferralTier {
  return TIERS[level - 1];
}
