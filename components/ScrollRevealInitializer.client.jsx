"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const DEFAULT_SELECTOR = [
  "main section",
  "main article[data-auto-reveal]",
  "[data-scroll-reveal]",
  "[data-auto-reveal]",
];

const REVEAL_CLASSES = [
  "reveal",
  "reveal-left",
  "reveal-right",
  "reveal-scale",
];

export function ScrollRevealInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const ensureRevealClass = (element) => {
      if (element.dataset.srManual === "true") {
        return;
      }

      const hasRevealClass = REVEAL_CLASSES.some((cls) =>
        element.classList.contains(cls)
      );

      if (!hasRevealClass) {
        element.classList.add("reveal");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    const applyElement = (element) => {
      if (!(element instanceof HTMLElement)) {
        return;
      }

      ensureRevealClass(element);

      if (prefersReducedMotion.matches) {
        element.classList.add("active");
        return;
      }

      if (
        element.dataset.srManual === "true" &&
        REVEAL_CLASSES.some((cls) => element.classList.contains(cls))
      ) {
        return;
      }

      if (element.dataset.srObserved === "true") {
        return;
      }

      observer.observe(element);
      element.dataset.srObserved = "true";
    };

    const processElements = (list) => {
      list.forEach((element, index) => {
        const customDelay =
          element.dataset?.srDelay || element.getAttribute?.("data-sr-delay");

        applyElement(element);

        if (prefersReducedMotion.matches) {
          return;
        }

        if (element.dataset?.srManual === "true") {
          return;
        }

        if (customDelay) {
          const delayValue = Number(customDelay);
          if (!Number.isNaN(delayValue)) {
            element.style.transitionDelay = `${delayValue}ms`;
          }
          return;
        }

        const stagger = Math.min(index, 8) * 60;
        element.style.transitionDelay = `${stagger}ms`;
      });
    };

    const initialElements = Array.from(
      new Set(
        DEFAULT_SELECTOR.flatMap((selector) =>
          Array.from(document.querySelectorAll(selector))
        )
      )
    ).filter((element) => element instanceof HTMLElement);

    processElements(initialElements);

    const mainElement = document.querySelector("main");

    if (mainElement) {
      const mutationObserver = new MutationObserver((mutations) => {
        const discovered = [];

        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof HTMLElement)) {
              return;
            }

            if (node.matches?.(DEFAULT_SELECTOR.join(","))) {
              discovered.push(node);
            }

            DEFAULT_SELECTOR.forEach((selector) => {
              if (typeof node.querySelectorAll === "function") {
                discovered.push(...node.querySelectorAll(selector));
              }
            });
          });
        });

        if (discovered.length) {
          processElements(discovered);
        }
      });

      mutationObserver.observe(mainElement, {
        childList: true,
        subtree: true,
      });

      return () => {
        observer.disconnect();
        mutationObserver.disconnect();
      };
    }

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
