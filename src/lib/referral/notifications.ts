import { ReferralTier, UserReferralProfile } from "./types";
import { getTierProgress, getReferralBonus } from "./logic";
import { TIER_ICONS } from "./tiers";

/**
 * Notification types for the referral program.
 * These generate email-safe HTML using Typography-equivalent patterns.
 */

export interface NotificationPayload {
  to: string;
  subject: string;
  htmlBody: string;
  pushTitle?: string;
  pushBody?: string;
}

/**
 * 1. Successful referral notification
 * Trigger: Friend's insurance purchase confirmed.
 */
export function buildSuccessfulReferralNotification(params: {
  referrerEmail: string;
  referrerProfile: UserReferralProfile;
  friendName: string;
  bonusAmount: number;
  bonusAmountBGN: number;
}): NotificationPayload {
  const { referrerEmail, referrerProfile, friendName, bonusAmount, bonusAmountBGN } = params;
  const progress = getTierProgress(referrerProfile);

  const progressText = progress.next
    ? `${referrerProfile.successfulReferralCount} от ${progress.next.threshold} реферала до ${progress.next.name}`
    : "Достигнахте върха — Шампион!";

  return {
    to: referrerEmail,
    subject: `${friendName} купи застраховка — получихте ${bonusAmount} € бонус!`,
    htmlBody: `
      <div style="font-family: 'Source Sans 3', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h2 style="font-size: 24px; font-weight: 700; color: #1a1a1a; margin: 0 0 8px;">
          Ново реферално възнаграждение!
        </h2>
        <p style="font-size: 16px; color: #666; margin: 0 0 24px;">
          Вашият приятел <strong>${friendName}</strong> закупи застраховка чрез вашия линк.
        </p>

        <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
          <p style="font-size: 14px; color: #666; margin: 0 0 4px;">Получен бонус</p>
          <p style="font-size: 28px; font-weight: 700; color: #16a34a; margin: 0;">
            +${bonusAmount.toFixed(2)} € / ${bonusAmountBGN.toFixed(2)} лв.
          </p>
        </div>

        <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <p style="font-size: 14px; color: #666; margin: 0 0 4px;">
            Текущо ниво: <strong>${referrerProfile.currentTier.name}</strong>
          </p>
          <p style="font-size: 14px; color: #666; margin: 0;">
            ${progressText}
          </p>
        </div>

        <a href="https://trusti.bg/profil/pokani-priyatel"
           style="display: inline-block; background: #6366f1; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 16px;">
          Покани още приятели
        </a>
      </div>
    `,
    pushTitle: `+${bonusAmount.toFixed(2)} € бонус!`,
    pushBody: `${friendName} купи застраховка. Печалбата ви е добавена.`,
  };
}

/**
 * 2. Tier upgrade notification
 * Trigger: successfulReferralCount crosses threshold.
 */
export function buildTierUpgradeNotification(params: {
  referrerEmail: string;
  newTier: ReferralTier;
  milestoneBonus: number;
  milestoneBonusBGN: number;
}): NotificationPayload {
  const { referrerEmail, newTier, milestoneBonus, milestoneBonusBGN } = params;

  const benefitsList = [
    `<li style="margin-bottom: 8px;">Бонус на реферал: <strong>${newTier.bonusPerReferral} € / ${newTier.bonusPerReferralBGN} лв.</strong></li>`,
    newTier.milestoneBonus
      ? `<li style="margin-bottom: 8px;">Milestone бонус: <strong>${newTier.milestoneBonus} € / ${newTier.milestoneBonusBGN} лв.</strong> (кредитиран!)</li>`
      : "",
    newTier.insuranceDiscount
      ? `<li style="margin-bottom: 8px;">Отстъпка: <strong>${newTier.insuranceDiscount}%</strong> на собствена застраховка</li>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  return {
    to: referrerEmail,
    subject: `🎉 Поздравления! Вече сте ${newTier.name}!`,
    htmlBody: `
      <div style="font-family: 'Source Sans 3', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="font-size: 48px; margin-bottom: 8px;">
            ${newTier.level === 3 ? "🏆" : "⭐"}
          </div>
          <h2 style="font-size: 28px; font-weight: 700; color: #1a1a1a; margin: 0 0 8px;">
            Поздравления!
          </h2>
          <p style="font-size: 18px; color: #6366f1; font-weight: 600; margin: 0;">
            Вече сте ${newTier.name}!
          </p>
        </div>

        ${milestoneBonus > 0 ? `
        <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
          <p style="font-size: 14px; color: #666; margin: 0 0 4px;">Milestone бонус</p>
          <p style="font-size: 28px; font-weight: 700; color: #16a34a; margin: 0;">
            +${milestoneBonus.toFixed(2)} € / ${milestoneBonusBGN.toFixed(2)} лв.
          </p>
        </div>
        ` : ""}

        <div style="margin-bottom: 24px;">
          <p style="font-size: 16px; font-weight: 600; color: #1a1a1a; margin: 0 0 12px;">
            Вашите нови предимства:
          </p>
          <ul style="padding-left: 20px; color: #333; font-size: 15px;">
            ${benefitsList}
          </ul>
        </div>

        <div style="text-align: center;">
          <a href="https://trusti.bg/profil/tier-progress"
             style="display: inline-block; background: #6366f1; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 16px;">
            Виж нивата си
          </a>
        </div>
      </div>
    `,
    pushTitle: `🎉 Вече сте ${newTier.name}!`,
    pushBody: `Поздравления! Отключихте нови бонуси. Milestone бонус: +${milestoneBonus.toFixed(2)} €`,
  };
}

/**
 * 3. Re-engagement nudge
 * Trigger: 0 successful referrals in past 30 days.
 */
export function buildReengagementNudge(params: {
  referrerEmail: string;
  referrerProfile: UserReferralProfile;
}): NotificationPayload {
  const { referrerEmail, referrerProfile } = params;
  const progress = getTierProgress(referrerProfile);
  const bonus = getReferralBonus(referrerProfile.currentTier);

  const progressText = progress.next
    ? `Имате ${referrerProfile.successfulReferralCount} от ${progress.next.threshold} реферала до ${progress.next.name}. Нужни са ви още ${progress.remaining}!`
    : "Вие сте Шампион — продължавайте да каните приятели!";

  return {
    to: referrerEmail,
    subject: `Не забравяйте — печелите ${bonus.eur} € за всеки приятел!`,
    htmlBody: `
      <div style="font-family: 'Source Sans 3', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h2 style="font-size: 24px; font-weight: 700; color: #1a1a1a; margin: 0 0 8px;">
          Вашите приятели ви очакват!
        </h2>
        <p style="font-size: 16px; color: #666; margin: 0 0 24px;">
          Не сте поканили никого през последните 30 дни. Споделете вашия линк и печелете бонуси!
        </p>

        <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <p style="font-size: 14px; color: #666; margin: 0 0 4px;">
            Текущо ниво: <strong>${referrerProfile.currentTier.name}</strong>
          </p>
          <p style="font-size: 14px; color: #666; margin: 0 0 8px;">
            ${progressText}
          </p>
          <p style="font-size: 16px; color: #1a1a1a; margin: 0;">
            Печелите <strong>${bonus.eur} € / ${bonus.bgn} лв.</strong> за всеки успешен реферал
          </p>
        </div>

        <a href="https://trusti.bg/profil/pokani-priyatel"
           style="display: inline-block; background: #6366f1; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 16px;">
          Покани приятел сега
        </a>
      </div>
    `,
  };
}
