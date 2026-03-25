"use client";

import { Typography, Icon, Badge } from "@vic-rep/design-system/atoms";
import { Button } from "@vic-rep/design-system/molecules";
import { TierBadge } from "@/components/referral/TierBadge";
import { getTierProgress } from "@/lib/referral/logic";
import {
  MOCK_USER_PROFILE,
  MOCK_TRANSACTIONS,
} from "@/lib/referral/mock-data";
import { ReferralTransaction } from "@/lib/referral/types";
import { useRouter } from "next/navigation";

const TRANSACTION_LABELS: Record<
  ReferralTransaction["type"],
  { label: string; variant: "accent" | "success" | "info" }
> = {
  referral_bonus: { label: "Реферал бонус", variant: "accent" },
  milestone_bonus: { label: "Milestone бонус", variant: "success" },
  insurance_discount: { label: "Отстъпка", variant: "info" },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PortfeylPage() {
  const router = useRouter();
  const profile = MOCK_USER_PROFILE;
  const tierProgress = getTierProgress(profile);

  const totalReceived = MOCK_TRANSACTIONS.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );
  const totalReceivedBGN = MOCK_TRANSACTIONS.reduce(
    (sum, tx) => sum + tx.amountBGN,
    0
  );

  // Tier-aware CTA copy
  const ctaCopy = (() => {
    if (profile.currentTier.level === 3) {
      return `Ти си Шампион! Продължавай да каниш и печелиш ${profile.currentTier.bonusPerReferral} € на реферал`;
    }
    if (profile.currentTier.level === 2 && tierProgress.next) {
      return `Още ${tierProgress.remaining} реферала до Шампион — вземай ${profile.currentTier.bonusPerReferral} € на реферал`;
    }
    return `Покани приятел и вземете по ${profile.currentTier.bonusPerReferral} € / ${profile.currentTier.bonusPerReferralBGN} лв. бонус за всеки!`;
  })();

  return (
    <div style={{ maxWidth: 640 }}>
      {/* Gradient bonus card */}
      <div
        style={{
          padding: "var(--lg)",
          borderRadius: "var(--radius-lg)",
          background:
            "linear-gradient(135deg, var(--primary-800), var(--primary-600))",
          color: "white",
          marginBottom: "var(--lg)",
          position: "relative",
        }}
      >
        {/* Tier badge top-right */}
        <div style={{ position: "absolute", top: "var(--md)", right: "var(--md)" }}>
          <TierBadge tier={profile.currentTier} />
        </div>

        <Typography variant="textSm" color="white">
          Наличност
        </Typography>
        <Typography variant="h3" bold color="white">
          {profile.walletBalance.toFixed(2)} €
        </Typography>
        <Typography variant="textSm" color="white">
          {profile.walletBalanceBGN.toFixed(2)} лв.
        </Typography>
      </div>

      {/* Summary rows */}
      <div
        style={{
          display: "flex",
          gap: "var(--md)",
          marginBottom: "var(--lg)",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "var(--md)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--neutral-200)",
            backgroundColor: "var(--surface)",
          }}
        >
          <Typography variant="textSm" color="muted">
            Получени
          </Typography>
          <Typography variant="h6" bold>
            {totalReceived.toFixed(2)} €
          </Typography>
          <Typography variant="caption" color="muted">
            {totalReceivedBGN.toFixed(2)} лв.
          </Typography>
        </div>
        <div
          style={{
            flex: 1,
            padding: "var(--md)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--neutral-200)",
            backgroundColor: "var(--surface)",
          }}
        >
          <Typography variant="textSm" color="muted">
            Похарчени
          </Typography>
          <Typography variant="h6" bold>
            0.00 €
          </Typography>
          <Typography variant="caption" color="muted">
            0.00 лв.
          </Typography>
        </div>
      </div>

      {/* Transaction list */}
      <div style={{ marginBottom: "var(--lg)" }}>
        <Typography variant="h6" bold className="mb-3">
          Получени
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sm)" }}>
          {MOCK_TRANSACTIONS.map((tx) => {
            const labelInfo = TRANSACTION_LABELS[tx.type];
            return (
              <div
                key={tx.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "var(--sm) var(--md)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--neutral-100)",
                  backgroundColor: "var(--surface)",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--xxs)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--xs)" }}>
                    <Badge variant={labelInfo.variant}>
                      <Typography variant="caption" color="inherit" as="span">
                        {labelInfo.label}
                      </Typography>
                    </Badge>
                    {tx.referredUserName && (
                      <Typography variant="textSm">
                        {tx.referredUserName}
                      </Typography>
                    )}
                  </div>
                  <Typography variant="caption" color="muted">
                    {formatDate(tx.createdAt)}
                  </Typography>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Typography variant="text" bold color="success">
                    +{tx.amount.toFixed(2)} €
                  </Typography>
                  <Typography variant="caption" color="muted">
                    {tx.amountBGN.toFixed(2)} лв.
                  </Typography>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Referral CTA banner */}
      <div
        style={{
          padding: "var(--lg)",
          borderRadius: "var(--radius-lg)",
          background: "var(--accent-50)",
          border: "1px solid var(--accent-200)",
        }}
      >
        <Typography variant="text" bold>
          {ctaCopy}
        </Typography>
        <Button
          variant="primary"
          onClick={() => router.push("/profil/pokani-priyatel")}
          className="mt-3"
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--xs)" }}>
            <Icon name="fa-user-plus" size="sm" />
            Покани приятел
          </span>
        </Button>
      </div>
    </div>
  );
}
