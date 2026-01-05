'use client';

import { useEffect, useRef } from "react";

const DEFAULT_SCRIPTS = [
  {
    id: "webflow-jquery",
    src: "https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=66e3df8d47eb3991ca9dbef7",
  },
  {
    id: "webflow-runtime",
    src: "https://wubflow-shield.nocodexport.dev/66e3df8d47eb3991ca9dbef7/js/webflow.9633dd252.js",
  },
];

export default function WebflowClientOnly({ children, scriptUrls = DEFAULT_SCRIPTS }) {
  const addedScriptsRef = useRef([]);

  useEffect(() => {
    let cancelled = false;

    const ensureScript = ({ id, src }) =>
      new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[data-webflow-id="${id}"]`);
        if (existing) {
          if (existing.dataset.webflowLoaded === "true") {
            resolve();
            return;
          }
          existing.addEventListener("load", resolve, { once: true });
          existing.addEventListener("error", reject, { once: true });
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = false; // preserve Webflow init order
        script.dataset.webflowId = id;
        script.onload = () => {
          script.dataset.webflowLoaded = "true";
          resolve();
        };
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
        addedScriptsRef.current.push(script);
      });

    const initWebflow = async () => {
      try {
        for (const entry of scriptUrls) {
          if (cancelled) return;
          await ensureScript(entry);
        }
        if (cancelled) return;

        if (typeof window !== "undefined" && window.Webflow) {
          window.Webflow.destroy();
          window.Webflow.ready();
          window.Webflow.require("ix2")?.init();
        }
      } catch (error) {
        console.error(error);
      }
    };

    initWebflow();

    return () => {
      cancelled = true;
      if (typeof window !== "undefined" && window.Webflow) {
        window.Webflow.destroy();
      }
      addedScriptsRef.current.forEach((node) => {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      });
      addedScriptsRef.current = [];
    };
  }, [scriptUrls]);

  return <>{children}</>;
}
