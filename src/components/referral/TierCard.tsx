"use client";

import { Typography, Icon, Badge } from "@vic-rep/design-system/atoms";
import { ProgressBar } from "@vic-rep/design-system/molecules";
import { ReferralTier, UserReferralProfile } from "@/lib/referral/types";
import { TIER_ICONS } from "@/lib/referral/tiers";

type TierCardState = "completed" | "active" | "locked";

interface TierCardProps {
  tier: ReferralTier;
  state: TierCardState;
  referralCount: number;
  className?: string;
}

export function TierCard({ tier, state, referralCount, className }: TierCardProps) {
  const iconName = TIER_ICONS[tier.level];

  const progressToNext =
    state === "active" && tier.level < 3
      ? referralCount / (tier.level === 1 ? 3 : 10)
      : state === "active"
        ? 1
        : 0;

  return (
    <div
      className={className}
      style={{
        padding: "var(--lg)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid",
        borderColor:
          state === "active"
            ? "var(--accent-600)"
            : state === "completed"
              ? "var(--success-500)"
              : "var(--neutral-200)",
        backgroundColor: "var(--surface)",
        boxShadow: state === "active" ? "var(--elevation-level2)" : "none",
        opacity: state === "locked" ? 0.7 : 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--sm)", marginBottom: "var(--md)" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "var(--radius-full)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              state === "completed"
                ? "var(--success-100)"
                : state === "active"
                  ? "var(--accent-100)"
                  : "var(--neutral-100)",
          }}
        >
          <Icon
            name={iconName}
            size="xl"
            weight="solid"
          />
        </div>
        <div style={{ flex: 1 }}>
          <Typography variant="h5" bold>
            {tier.name}
          </Typography>
          <Typography variant="textSm" color="muted">
            {tier.threshold === 0
              ? "Начално ниво"
              : `${tier.threshold} успешни реферала`}
          </Typography>
        </div>
        <div>
          {state === "completed" && (
            <Badge variant="success">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--xxs)" }}>
                <Icon name="fa-check-circle" size="xs" weight="solid" />
                <Typography variant="caption" color="inherit" as="span">
                  Отключено
                </Typography>
              </span>
            </Badge>
          )}
          {state === "active" && (
            <Badge variant="accent">
              <Typography variant="caption" color="inherit" as="span">
                Текущо
              </Typography>
            </Badge>
          )}
          {state === "locked" && (
            <Badge variant="default">
              <Typography variant="caption" color="inherit" as="span">
                Заключено
              </Typography>
            </Badge>
          )}
        </div>
      </div>

      {/* Benefits list */}
      <div style={{ marginBottom: "var(--md)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "var(--xs) 0", borderBottom: "1px solid var(--neutral-100)" }}>
          <Typography variant="textSm" color="muted">
            Бонус на реферал
          </Typography>
          <Typography variant="textSm" bold>
            {tier.bonusPerReferral} € / {tier.bonusPerReferralBGN} лв.
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "var(--xs) 0", borderBottom: "1px solid var(--neutral-100)" }}>
          <Typography variant="textSm" color="muted">
            Milestone бонус
          </Typography>
          <Typography variant="textSm" bold>
            {tier.milestoneBonus
              ? `${tier.milestoneBonus} € / ${tier.milestoneBonusBGN} лв.`
              : "—"}
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "var(--xs) 0" }}>
          <Typography variant="textSm" color="muted">
            Отстъпка застраховка
          </Typography>
          <Typography variant="textSm" bold>
            {tier.insuranceDiscount ? `${tier.insuranceDiscount}%` : "—"}
          </Typography>
        </div>
      </div>

      {/* State-specific content */}
      {state === "active" && tier.level < 3 && (
        <div>
          <ProgressBar value={progressToNext * 100} />
          <Typography variant="textSm" color="muted">
            {referralCount} от{" "}
            {tier.level === 1 ? 3 : 10} реферала
          </Typography>
        </div>
      )}
      {state === "locked" && (
        <Typography variant="textSm" color="muted">
          Нужни още {tier.threshold - referralCount} реферала
        </Typography>
      )}
    </div>
  );
}
