"use client";

import { Typography, Icon } from "@vic-rep/design-system/atoms";
import { Button } from "@vic-rep/design-system/molecules";
import { TierCard } from "@/components/referral/TierCard";
import { TIERS } from "@/lib/referral/tiers";
import { getTierProgress } from "@/lib/referral/logic";
import { MOCK_USER_PROFILE } from "@/lib/referral/mock-data";
import { useRouter } from "next/navigation";
import { ReferralTier } from "@/lib/referral/types";

function getTierCardState(
  tier: ReferralTier,
  currentTierLevel: number
): "completed" | "active" | "locked" {
  if (tier.level < currentTierLevel) return "completed";
  if (tier.level === currentTierLevel) return "active";
  return "locked";
}

export default function TierProgressPage() {
  const router = useRouter();
  const profile = MOCK_USER_PROFILE;
  const progress = getTierProgress(profile);
  const isChampion = profile.currentTier.level === 3;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {/* Page title */}
      <Typography variant="h3" bold>
        Твоите нива
      </Typography>

      <div
        style={{
          marginTop: "var(--lg)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--md)",
        }}
      >
        {TIERS.map((tier) => (
          <TierCard
            key={tier.level}
            tier={tier}
            state={getTierCardState(tier, profile.currentTier.level)}
            referralCount={profile.successfulReferralCount}
          />
        ))}
      </div>

      {/* Champion celebration */}
      {isChampion && (
        <div
          style={{
            marginTop: "var(--xl)",
            padding: "var(--xl)",
            borderRadius: "var(--radius-lg)",
            background:
              "linear-gradient(135deg, var(--accent-100), var(--success-100))",
            textAlign: "center",
          }}
        >
          <Icon name="fa-trophy" size="xl" weight="solid" />
          <Typography
            variant="h4"
            bold
            color="accent"
            className="mt-2"
          >
            Достигнахте върха!
          </Typography>
          <Typography variant="text" color="muted" className="mt-1">
            Вие сте Шампион! Продължавайте да каните приятели и да печелите{" "}
            {profile.currentTier.bonusPerReferral} € за всеки успешен реферал.
          </Typography>
        </div>
      )}

      {/* Primary CTA */}
      <div
        style={{
          marginTop: "var(--xl)",
          position: "sticky",
          bottom: "var(--lg)",
          textAlign: "center",
        }}
      >
        <Button
          variant="primary"
          onClick={() => router.push("/profil/pokani-priyatel")}
          style={{ width: "100%" }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--xs)" }}>
            <Icon name="fa-user-plus" size="sm" />
            Покани приятел сега
          </span>
        </Button>
      </div>
    </div>
  );
}
