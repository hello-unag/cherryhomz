'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

export default function ChineseTranslateButton() {
  const [isTranslated, setIsTranslated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    /* ---- Suppress the Google Translate top-bar & badge ---- */
    const style = document.createElement('style');
    style.id = 'goog-suppress';
    style.innerHTML = `
      .goog-te-banner-frame.skiptranslate { display:none !important; }
      .goog-te-gadget { display:none !important; }
      body { top:0px !important; }
      #goog-gt-tt, .goog-te-balloon-frame { display:none !important; }
    `;
    document.head.appendChild(style);

    /* ---- Bootstrap Google Translate widget ---- */
    window.googleTranslateElementInit = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'zh-CN',
          autoDisplay: false,
        },
        'google_translate_element'
      );
      setIsReady(true);
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src =
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      const s = document.getElementById('goog-suppress');
      if (s) s.remove();
    };
  }, []);

  /* ---- Switch TO Chinese ---- */
  const translateToChinese = () => {
    const select = document.querySelector(
      '#google_translate_element select'
    ) as HTMLSelectElement | null;
    if (select) {
      select.value = 'zh-CN';
      select.dispatchEvent(new Event('change'));
      setIsTranslated(true);
    }
  };

  /* ---- Switch BACK to English ---- */
  const restoreEnglish = () => {
    // Clear the googtrans cookie and reload
    const clearCookie = (domain: string) => {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
    };
    clearCookie(window.location.hostname);
    clearCookie('.' + window.location.hostname);
    document.cookie =
      'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    setIsTranslated(false);
    window.location.reload();
  };

  const handleClick = () => {
    if (isTranslated) {
      restoreEnglish();
    } else {
      translateToChinese();
    }
  };

  return (
    <>
      {/* Hidden Google Translate mount point */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      {/* Floating button — bottom-left, above mobile tab bar */}
      <div className="fixed bottom-24 left-4 z-50 lg:bottom-6 lg:left-6 flex flex-col items-start gap-2">
        <AnimatePresence>
          {showTooltip && !isTranslated && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
            >
              Switch to Chinese / 切换到中文
            </motion.div>
          )}
          {showTooltip && isTranslated && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
            >
              Switch back to English
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          disabled={!isReady}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
          aria-label={isTranslated ? 'Switch to English' : '切换到中文 Switch to Chinese'}
          className={`
            flex items-center gap-2 rounded-full shadow-xl px-4 py-3
            font-bold text-sm transition-colors duration-200
            disabled:opacity-40 disabled:cursor-wait
            ${isTranslated
              ? 'bg-white border-2 border-[#9B1B30] text-[#9B1B30] hover:bg-[#9B1B30] hover:text-white'
              : 'bg-[#9B1B30] text-white hover:bg-[#7a1526]'
            }
          `}
        >
          {/* Chinese flag-inspired circle */}
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-black flex-shrink-0 ${
              isTranslated ? 'bg-[#9B1B30] text-white' : 'bg-red-700 text-yellow-300'
            }`}
            aria-hidden="true"
          >
            中
          </span>

          {isTranslated ? (
            <span className="tracking-wide">English</span>
          ) : (
            <span className="tracking-wide">查看中文版</span>
          )}
        </motion.button>
      </div>
    </>
  );
}
