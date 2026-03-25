"use client";

import { Badge, Icon, Typography } from "@vic-rep/design-system/atoms";
import { ReferralTier } from "@/lib/referral/types";
import { TIER_ICONS } from "@/lib/referral/tiers";

type TierBadgeVariant = "default" | "accent" | "success";

const TIER_BADGE_VARIANTS: Record<number, TierBadgeVariant> = {
  1: "default",
  2: "accent",
  3: "success",
};

interface TierBadgeProps {
  tier: ReferralTier;
  onClick?: () => void;
  className?: string;
}

export function TierBadge({ tier, onClick, className }: TierBadgeProps) {
  const variant = TIER_BADGE_VARIANTS[tier.level];
  const iconName = TIER_ICONS[tier.level];

  return (
    <Badge
      variant={variant}
      className={`${className ?? ""} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--xxs)" }}>
        <Icon name={iconName} size="xs" weight="solid" />
        <Typography variant="caption" color="inherit" as="span">
          {tier.name}
        </Typography>
      </span>
    </Badge>
  );
}
