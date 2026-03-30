"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

export default function TranslateWidget() {
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    // Inject the Google Translate script dynamically
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Define the global callback
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "ar,en", autoDisplay: false },
        "google_translate_element"
      );
    };

    return () => {
      document.body.removeChild(script);
      delete (window as any).googleTranslateElementInit;
    };
  }, []);

  // Hacky way to automate the google translate dropdown since standard styling is restrictive
  const handleToggle = () => {
    // If not Arabic, switch to Arabic
    // We do this by triggering the select event on the hidden GTranslate select box
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      if (!isArabic) {
        select.value = "ar";
        setIsArabic(true);
        document.body.dir = "rtl";
      } else {
        select.value = "en";
        setIsArabic(false);
        document.body.dir = "ltr";
      }
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <>
      {/* Hidden google translate anchor */}
      <div id="google_translate_element" className="hidden" />

      {/* Styled custom toggle button fixed at top right */}
      <button
        onClick={handleToggle}
        className="fixed top-4 right-6 z-[200] flex items-center space-x-2 bg-[#010a05]/95 backdrop-blur-xl border border-emerald-900/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] px-4 py-2 rounded-full text-xs font-bold text-emerald-400 font-mono tracking-widest uppercase hover:scale-105 hover:bg-emerald-950/40 transition-all cursor-pointer"
      >
        <Globe className="size-4 animate-pulse" />
        <span>{isArabic ? "ENG (English)" : "عربي (Arabic)"}</span>
      </button>

      {/* Hide the google translate top bar that appears automatically */}
      <style dangerouslySetInnerHTML={{ __html: `
        .goog-te-banner-frame { display: none !important; }
        body { top: 0px !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
      `}} />
    </>
  );
}
