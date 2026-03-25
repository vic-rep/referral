"use client";

import { Typography } from "@vic-rep/design-system/atoms";

interface WalletBalanceSummaryProps {
  balanceEur: number;
  balanceBgn: number;
  className?: string;
}

export function WalletBalanceSummary({
  balanceEur,
  balanceBgn,
  className,
}: WalletBalanceSummaryProps) {
  return (
    <div className={className}>
      <Typography variant="textSm" color="muted">
        Наличност
      </Typography>
      <Typography variant="h4" bold>
        {balanceEur.toFixed(2)} € / {balanceBgn.toFixed(2)} лв.
      </Typography>
    </div>
  );
}
