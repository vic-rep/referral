"use client";

import { useState } from "react";
import { Icon } from "@vic-rep/design-system/atoms";
import { Button, Toast } from "@vic-rep/design-system/molecules";

interface QuickCopyButtonProps {
  referralLink: string;
  className?: string;
}

export function QuickCopyButton({ referralLink, className }: QuickCopyButtonProps) {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = referralLink;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleCopy} className={className}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--xs)" }}>
          <Icon name="fa-copy" size="sm" />
          Копирай линк
        </span>
      </Button>
      {showToast && <Toast>Линкът е копиран!</Toast>}
    </>
  );
}
