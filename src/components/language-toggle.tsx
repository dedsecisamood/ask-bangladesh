"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 px-2.5 text-xs font-semibold rounded-lg border-border/80"
      onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
      title="Switch Language / ভাষা পরিবর্তন করুন"
    >
      {language === "bn" ? (
        <span className="flex items-center gap-1 font-mono">
          <span className="text-primary font-bold">EN</span>
          <span className="text-muted-foreground text-[10px]">/ বাংলা</span>
        </span>
      ) : (
        <span className="flex items-center gap-1 font-mono">
          <span className="text-primary font-bold">বাং</span>
          <span className="text-muted-foreground text-[10px]">/ Eng</span>
        </span>
      )}
    </Button>
  );
}
