import { ReferralTier, UserReferralProfile, TierProgress } from "./types";
import { TIERS } from "./tiers";

/**
 * Derive current tier from referral count.
 * Iterates tiers in reverse to find the highest tier the user qualifies for.
 */
export function getTierFromCount(count: number): ReferralTier {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (count >= TIERS[i].threshold) {
      return TIERS[i];
    }
  }
  return TIERS[0];
}

/**
 * Check if a count crosses tier thresholds between previousCount and newCount.
 * Returns all tiers that were newly crossed (for milestone bonus logic).
 */
export function getCrossedTiers(
  previousCount: number,
  newCount: number
): ReferralTier[] {
  return TIERS.filter(
    (tier) =>
      tier.threshold > 0 &&
      previousCount < tier.threshold &&
      newCount >= tier.threshold
  );
}

/**
 * Calculate bonus for a referral at a given tier.
 */
export function getReferralBonus(tier: ReferralTier): {
  eur: number;
  bgn: number;
} {
  return {
    eur: tier.bonusPerReferral,
    bgn: tier.bonusPerReferralBGN,
  };
}

/**
 * Progress to next tier.
 */
export function getTierProgress(profile: UserReferralProfile): TierProgress {
  const current = profile.currentTier;
  const nextTierIndex = TIERS.findIndex((t) => t.level === current.level) + 1;
  const next = nextTierIndex < TIERS.length ? TIERS[nextTierIndex] : null;

  if (!next) {
    return {
      current,
      next: null,
      progress: 1,
      remaining: 0,
    };
  }

  const rangeStart = current.threshold;
  const rangeEnd = next.threshold;
  const countInRange = profile.successfulReferralCount - rangeStart;
  const rangeSize = rangeEnd - rangeStart;

  return {
    current,
    next,
    progress: Math.min(countInRange / rangeSize, 1),
    remaining: Math.max(rangeEnd - profile.successfulReferralCount, 0),
  };
}

/**
 * Validate a referral event.
 */
export function isValidReferral(
  referrerId: string,
  friendId: string,
  purchaseStatus: string
): boolean {
  if (referrerId === friendId) return false;
  if (purchaseStatus !== "confirmed") return false;
  return true;
}
