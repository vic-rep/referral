"use client";

import { Typography, Icon, Badge } from "@vic-rep/design-system/atoms";
import { Button, Input } from "@vic-rep/design-system/molecules";
import { FRIEND_BONUS } from "@/lib/referral/tiers";
import { getTierFromCount } from "@/lib/referral/logic";
import { ReferralTier } from "@/lib/referral/types";

/**
 * Feature flag for A/B testing referrer tier badge.
 * Controlled by NEXT_PUBLIC_REFERRAL_TIER_BADGE_AB env var.
 */
const SHOW_TIER_BADGE =
  process.env.NEXT_PUBLIC_REFERRAL_TIER_BADGE_AB === "true";

/**
 * Mock referrer data — in production this would come from an API call
 * using the referral code from the URL params.
 */
interface ReferrerInfo {
  name: string;
  tier: ReferralTier;
}

function getMockReferrerInfo(code: string): ReferrerInfo | null {
  // Simulating an API call — returns null if referrer not found
  return {
    name: "Иван Петров",
    tier: getTierFromCount(4), // Tier 2 — Посланик
  };
}

const TIER_BADGE_VARIANTS: Record<number, "default" | "accent" | "success"> = {
  1: "default",
  2: "accent",
  3: "success",
};

export default function ReferralLandingPage({
  params,
}: {
  params: { code: string };
}) {
  const referrerInfo = getMockReferrerInfo(params.code);

  // Only show social proof for Tier 2+ referrers when feature flag is on
  const showSocialProof =
    SHOW_TIER_BADGE &&
    referrerInfo &&
    referrerInfo.tier.level >= 2;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, var(--primary-900), var(--primary-700))",
        padding: "var(--xl)",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          padding: "var(--xl)",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--surface)",
          boxShadow: "var(--elevation-level3)",
          textAlign: "center",
        }}
      >
        {/* Hero */}
        <Typography variant="h3" bold>
          Бяхте поканени в Тръсти
        </Typography>
        <Typography variant="text" color="muted" className="mt-2 mb-4">
          Регистрирайте се и получете
        </Typography>

        {/* Bonus amount */}
        <div
          style={{
            padding: "var(--md)",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--success-50)",
            marginBottom: "var(--lg)",
          }}
        >
          <Typography variant="h4" bold color="success">
            {FRIEND_BONUS.eur} € / {FRIEND_BONUS.bgn} лв.
          </Typography>
          <Typography variant="textSm" color="muted">
            бонус при първа покупка на застраховка
          </Typography>
        </div>

        {/* Phone input */}
        <div style={{ marginBottom: "var(--md)" }}>
          <Input
            placeholder="Телефонен номер"
            type="tel"
            style={{ width: "100%" }}
          />
        </div>

        {/* CTA */}
        <Button variant="primary" style={{ width: "100%" }}>
          Продължи
        </Button>

        {/* Social proof — A/B tested, feature-flagged */}
        {showSocialProof && referrerInfo && (
          <div
            style={{
              marginTop: "var(--md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--xs)",
            }}
          >
            <Typography variant="textSm" color="muted">
              Поканен от
            </Typography>
            <Badge variant={TIER_BADGE_VARIANTS[referrerInfo.tier.level]}>
              <Typography variant="caption" color="inherit" as="span">
                {referrerInfo.tier.name}
              </Typography>
            </Badge>
            <Typography variant="textSm" color="muted">
              {referrerInfo.name}
            </Typography>
          </div>
        )}

        {/* Product showcase */}
        <div style={{ marginTop: "var(--xl)" }}>
          <Typography variant="textSm" color="muted">
            Сравнете цени на застраховки от водещи компании в България
          </Typography>
        </div>
      </div>
    </div>
  );
}
