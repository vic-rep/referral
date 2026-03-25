"use client";

import { useState } from "react";
import { Typography, Icon, Badge } from "@vic-rep/design-system/atoms";
import { Button, Alert, Toast } from "@vic-rep/design-system/molecules";
import { Accordion } from "@vic-rep/design-system/organisms";
import { TierBadge } from "@/components/referral/TierBadge";
import { TierProgressBar } from "@/components/referral/TierProgressBar";
import { getTierProgress, getReferralBonus } from "@/lib/referral/logic";
import { TIERS } from "@/lib/referral/tiers";
import { MOCK_USER_PROFILE } from "@/lib/referral/mock-data";
import { useRouter } from "next/navigation";

const SHARE_CHANNELS = [
  { name: "Facebook", icon: "fa-facebook", color: "#1877F2" },
  { name: "Messenger", icon: "fa-facebook-messenger", color: "#0084FF" },
  { name: "WhatsApp", icon: "fa-whatsapp", color: "#25D366" },
  { name: "Viber", icon: "fa-viber", color: "#7360F2" },
  { name: "Email", icon: "fa-envelope", color: "var(--neutral-600)" },
];

export default function PokaniPriyatelPage() {
  const router = useRouter();
  const profile = MOCK_USER_PROFILE;
  const tierProgress = getTierProgress(profile);
  const bonus = getReferralBonus(profile.currentTier);
  const isChampion = profile.currentTier.level === 3;
  const [showToast, setShowToast] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profile.referralLink);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = profile.referralLink;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const tierAccordionItems = TIERS.map((tier) => ({
    title: `${tier.name} (Ниво ${tier.level})`,
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--xs)" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="textSm" color="muted">Праг</Typography>
          <Typography variant="textSm" bold>
            {tier.threshold === 0 ? "Начално ниво" : `${tier.threshold} успешни реферала`}
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="textSm" color="muted">Бонус на реферал</Typography>
          <Typography variant="textSm" bold>
            {tier.bonusPerReferral} € / {tier.bonusPerReferralBGN} лв.
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="textSm" color="muted">Milestone бонус</Typography>
          <Typography variant="textSm" bold>
            {tier.milestoneBonus ? `${tier.milestoneBonus} € / ${tier.milestoneBonusBGN} лв.` : "—"}
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="textSm" color="muted">Отстъпка</Typography>
          <Typography variant="textSm" bold>
            {tier.insuranceDiscount ? `${tier.insuranceDiscount}%` : "—"}
          </Typography>
        </div>
      </div>
    ),
  }));

  return (
    <div style={{ maxWidth: 640 }}>
      {/* Tier header block */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--sm)",
          marginBottom: "var(--sm)",
        }}
      >
        <TierBadge tier={profile.currentTier} />
        <Typography variant="h5" bold>
          {profile.currentTier.name}
        </Typography>
      </div>
      <Typography variant="text" color="muted" className="mb-4">
        Печелиш {bonus.eur} € / {bonus.bgn} лв. за всеки успешен реферал
      </Typography>

      {/* Progress bar */}
      {!isChampion && (
        <TierProgressBar tierProgress={tierProgress} className="mb-4" />
      )}

      {/* Next tier teaser */}
      {!isChampion && tierProgress.next && (
        <Alert variant="info" className="mb-4">
          <div>
            <Typography variant="textM" bold>
              Стигни до {tierProgress.next.name} и спечели:
            </Typography>
            <ul style={{ marginTop: "var(--xs)", paddingLeft: "var(--md)", listStyle: "disc" }}>
              <li>
                <Typography variant="textSm">
                  {tierProgress.next.bonusPerReferral} € / {tierProgress.next.bonusPerReferralBGN} лв. на реферал
                </Typography>
              </li>
              {tierProgress.next.milestoneBonus && (
                <li>
                  <Typography variant="textSm">
                    {tierProgress.next.milestoneBonus} € milestone бонус
                  </Typography>
                </li>
              )}
              {tierProgress.next.insuranceDiscount && (
                <li>
                  <Typography variant="textSm">
                    {tierProgress.next.insuranceDiscount}% отстъпка на собствена застраховка
                  </Typography>
                </li>
              )}
            </ul>
          </div>
        </Alert>
      )}

      {/* Champion celebration */}
      {isChampion && (
        <div
          style={{
            padding: "var(--lg)",
            borderRadius: "var(--radius-lg)",
            background: "linear-gradient(135deg, var(--accent-100), var(--success-100))",
            textAlign: "center",
            marginBottom: "var(--lg)",
          }}
        >
          <Icon name="fa-trophy" size="xl" weight="solid" />
          <Typography variant="h4" bold color="accent">
            Ти си Шампион!
          </Typography>
          <Typography variant="text" color="muted">
            Продължавай да каниш приятели и да печелиш {bonus.eur} € за всеки.
          </Typography>
        </div>
      )}

      {/* Share section */}
      <div style={{ marginBottom: "var(--lg)" }}>
        <Typography variant="h6" bold className="mb-3">
          Сподели реферален линк
        </Typography>

        {/* Copy link */}
        <div
          style={{
            display: "flex",
            gap: "var(--sm)",
            marginBottom: "var(--md)",
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "var(--sm) var(--md)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--neutral-200)",
              backgroundColor: "var(--surface)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Typography variant="textSm" color="muted">
              {profile.referralLink}
            </Typography>
          </div>
          <Button variant="primary" onClick={handleCopyLink}>
            <Icon name="fa-copy" size="sm" />
          </Button>
        </div>

        {/* Social share icons */}
        <div style={{ display: "flex", gap: "var(--sm)" }}>
          {SHARE_CHANNELS.map((channel) => (
            <button
              key={channel.name}
              title={channel.name}
              style={{
                width: 44,
                height: 44,
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--neutral-200)",
                backgroundColor: "var(--surface)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={channel.icon} size="lg" />
            </button>
          ))}
        </div>
      </div>

      {/* "Виж всички нива" link */}
      <div
        style={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--xxs)",
          marginBottom: "var(--lg)",
        }}
        onClick={() => router.push("/profil/tier-progress")}
      >
        <Typography variant="textSm" color="accent">
          Виж всички нива
        </Typography>
        <Icon name="fa-chevron-right" size="xs" />
      </div>

      {/* Информация за бонуса accordion */}
      <div>
        <Typography variant="h6" bold className="mb-3">
          Информация за бонуса
        </Typography>
        <Accordion items={tierAccordionItems} />
      </div>

      {showToast && <Toast>Линкът е копиран!</Toast>}
    </div>
  );
}
