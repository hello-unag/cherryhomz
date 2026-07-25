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

interface ChineseTranslateButtonProps {
  inline?: boolean;
}

export default function ChineseTranslateButton({ inline = false }: ChineseTranslateButtonProps) {
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

    const checkInterval = setInterval(() => {
      if (document.querySelector('.goog-te-combo') || document.querySelector('#google_translate_element select')) {
        setIsReady(true);
        clearInterval(checkInterval);
      }
    }, 500);

    // Defer the heavy Google Translate script to avoid blocking the main thread
    const loadTimeout = setTimeout(() => {
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src =
          '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    }, 3500);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(loadTimeout);
    };
  }, []);

  /* ---- Switch TO Chinese ---- */
  const translateToChinese = () => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = 'zh-CN';
      select.dispatchEvent(new Event('change', { bubbles: true }));
      setIsTranslated(true);
    } else {
      console.warn('Google Translate is not ready yet or is blocked by an ad-blocker.');
    }
  };

  /* ---- Switch BACK to English ---- */
  const restoreEnglish = () => {
    // 1. Try reverting via the select element (instant, no reload)
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select && select.options.length > 0) {
      select.value = ''; // Google Translate uses an empty string for the original language
      if (select.selectedIndex !== 0) {
        select.selectedIndex = 0;
      }
      select.dispatchEvent(new Event('change', { bubbles: true }));
      setIsTranslated(false);
      
      // Also try to click the iframe restore button just in case
      try {
        const iframe = document.querySelector('.goog-te-banner-frame') as HTMLIFrameElement;
        if (iframe) {
          const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
          const buttons = innerDoc?.getElementsByTagName('button');
          if (buttons) {
            for (let i = 0; i < buttons.length; i++) {
              if (buttons[i].id.includes('restore')) {
                buttons[i].click();
              }
            }
          }
        }
      } catch (e) {
        // Ignore CORS errors if iframe is blocked
      }
    } else {
      // 2. Fallback: Brute-force clear the googtrans cookie and reload
      const host = window.location.hostname;
      const domains = [host, `.${host}`];
      if (host.startsWith('www.')) {
        const root = host.substring(4);
        domains.push(root, `.${root}`);
      }

      domains.forEach((d) => {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${d}`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/zh-CN; domain=${d}`;
      });
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
      
      setIsTranslated(false);
      window.location.reload();
    }
  };

  const handleClick = () => {
    if (isTranslated) {
      restoreEnglish();
    } else {
      translateToChinese();
    }
  };

  if (inline) {
    return (
      <>
        {/* Hidden Google Translate mount point */}
        <div id="google_translate_element" className="hidden" aria-hidden="true" />

        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label={isTranslated ? 'Switch to English' : '切换到中文 Switch to Chinese'}
          className={`
            flex items-center gap-2 rounded-full shadow-lg px-5 py-3 md:px-8 md:py-4
            font-bold text-xs md:text-base transition-colors duration-200
            shrink-0 border border-white/20
            ${isTranslated
              ? 'bg-white border-2 border-[#9B1B30] text-[#9B1B30] hover:bg-[#9B1B30] hover:text-white'
              : 'bg-[#9B1B30] text-white hover:bg-[#7a1526]'
            }
          `}
        >
          {/* Chinese flag-inspired circle */}
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black flex-shrink-0 ${
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
      </>
    );
  }

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
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
          aria-label={isTranslated ? 'Switch to English' : '切换到中文 Switch to Chinese'}
          className={`
            flex items-center gap-2 rounded-full shadow-xl px-4 py-3
            font-bold text-sm transition-colors duration-200
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
