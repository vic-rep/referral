"use client";

import { Typography } from "@vic-rep/design-system/atoms";
import { ProgressBar } from "@vic-rep/design-system/molecules";
import { TierProgress } from "@/lib/referral/types";

interface TierProgressBarProps {
  tierProgress: TierProgress;
  onClick?: () => void;
  className?: string;
}

export function TierProgressBar({
  tierProgress,
  onClick,
  className,
}: TierProgressBarProps) {
  const { current, next, progress, remaining } = tierProgress;

  if (!next) {
    return (
      <div className={className}>
        <Typography variant="textSm" color="accent" bold>
          {"Достигнахте върха 🏆"}
        </Typography>
      </div>
    );
  }

  const count = current.threshold + Math.round(progress * (next.threshold - current.threshold));

  return (
    <div
      className={`${className ?? ""} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <ProgressBar value={progress * 100} />
      <Typography variant="textSm" color="muted">
        {count} от {next.threshold} реферала до {next.name}
      </Typography>
    </div>
  );
}
