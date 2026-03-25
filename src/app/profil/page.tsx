"use client";

import { Typography, Icon } from "@vic-rep/design-system/atoms";
import { TierBadge } from "@/components/referral/TierBadge";
import { TierProgressBar } from "@/components/referral/TierProgressBar";
import { QuickCopyButton } from "@/components/referral/QuickCopyButton";
import { WalletBalanceSummary } from "@/components/referral/WalletBalanceSummary";
import { getTierProgress } from "@/lib/referral/logic";
import { MOCK_USER_PROFILE, MOCK_USER_NAME } from "@/lib/referral/mock-data";
import { useRouter } from "next/navigation";

export default function ProfilPage() {
  const router = useRouter();
  const profile = MOCK_USER_PROFILE;
  const tierProgress = getTierProgress(profile);

  return (
    <div style={{ maxWidth: 640 }}>
      {/* User identity header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--md)",
          marginBottom: "var(--lg)",
        }}
      >
        {/* Avatar placeholder */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--accent-200)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="fa-user" size="xl" weight="solid" />
        </div>
        <div>
          <Typography variant="h4" bold>
            {MOCK_USER_NAME}
          </Typography>
          <TierBadge
            tier={profile.currentTier}
            onClick={() => router.push("/profil/tier-progress")}
          />
        </div>
      </div>

      {/* Wallet balance on gradient card */}
      <div
        style={{
          padding: "var(--lg)",
          borderRadius: "var(--radius-lg)",
          background: "linear-gradient(135deg, var(--primary-800), var(--primary-600))",
          color: "white",
          marginBottom: "var(--lg)",
        }}
      >
        <Typography variant="textSm" color="white">
          Наличност в портфейла
        </Typography>
        <Typography variant="h4" bold color="white">
          {profile.walletBalance.toFixed(2)} € / {profile.walletBalanceBGN.toFixed(2)} лв.
        </Typography>
      </div>

      {/* Tier progress summary */}
      <TierProgressBar
        tierProgress={tierProgress}
        onClick={() => router.push("/profil/tier-progress")}
        className="mb-4"
      />

      {/* Quick-copy referral button */}
      <QuickCopyButton referralLink={profile.referralLink} className="mb-3" />

      {/* "Виж нивата" link */}
      <div
        style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "var(--xxs)" }}
        onClick={() => router.push("/profil/tier-progress")}
      >
        <Typography variant="textSm" color="accent">
          Виж нивата
        </Typography>
        <Icon name="fa-chevron-right" size="xs" />
      </div>

      {/* Моите застраховки section placeholder */}
      <div style={{ marginTop: "var(--xl)" }}>
        <Typography variant="h5" bold>
          Моите застраховки
        </Typography>
        <div
          style={{
            marginTop: "var(--md)",
            padding: "var(--lg)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--neutral-200)",
            backgroundColor: "var(--surface)",
          }}
        >
          <Typography variant="text" color="muted">
            Все още нямате активни застраховки.
          </Typography>
        </div>
      </div>
    </div>
  );
}
