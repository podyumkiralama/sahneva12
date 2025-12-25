// components/DeferredSections.client.jsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

// Dinamik componentler
const ServicesTabs = dynamic(() => import("./ServicesTabs"), { ssr: false });
const ProjectsGallery = dynamic(() => import("./ProjectsGallery"), { ssr: false });
const Faq = dynamic(() => import("./Faq"), { ssr: false });

const CorporateEvents = dynamic(() => import("./CorporateEvents"), { ssr: false });
const CorporateIntro = dynamic(() => import("./CorporateIntro"), { ssr: false });
const TechCapabilities = dynamic(() => import("./TechCapabilities"), { ssr: false });
const WhyChooseUs = dynamic(() => import("./WhyChooseUs"), { ssr: false });

const visibilityStyle = (minHeightPx) => ({
  contentVisibility: "auto",
  containIntrinsicSize: `1px ${minHeightPx}px`,
});

const servicesContainSize = "1px 900px";

// Lazy-load görünürlük hook'u
function useDeferredVisible({
  rootMargin = "0px 0px",
  threshold = 0,
  idleTimeout,
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const observerOptions = useMemo(
    () => ({
      rootMargin,
      threshold,
    }),
    [rootMargin, threshold],
  );

  useEffect(() => {
    if (visible) return;

    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const prefersReduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (prefersReduce || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, observerOptions);

    observer.observe(el);
    let idleTimer;

    if (typeof idleTimeout === "number" && idleTimeout > 0) {
      idleTimer = window.setTimeout(() => {
        setVisible(true);
        observer.disconnect();
      }, idleTimeout);
    }

    return () => {
      observer.disconnect();
      if (idleTimer) window.clearTimeout(idleTimer);
    };
  }, [visible, observerOptions, idleTimeout]);

  return [ref, visible];
}

/* ───────────────── ServicesTabs (temiz wrapper) ───────────────── */

export function ServicesTabsDeferred({
  rootMargin = "200px 0px",
  threshold = 0.1,
  idleTimeout,
  ...props
}) {
  const [ref, visible] = useDeferredVisible({
    rootMargin,
    threshold,
    idleTimeout,
  });
  const style = {
    contentVisibility: "auto",
    containIntrinsicSize: servicesContainSize,
  };

  return (
    <div ref={ref} className="w-full min-w-0" style={style}>
      {visible ? (
        <ServicesTabs {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ ...style, minHeight: "900px" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ───────────────── ProjectsGallery (temiz wrapper) ───────────────── */

export function ProjectsGalleryDeferred({
  rootMargin = "400px 0px",
  threshold = 0.05,
  idleTimeout,
  ...props
}) {
  const [ref, visible] = useDeferredVisible({
    rootMargin,
    threshold,
    idleTimeout,
  });
  const style = visibilityStyle(320);

  return (
    <div ref={ref} className="w-full min-w-0" style={style}>
      {visible ? (
        <ProjectsGallery {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ ...style, minHeight: "320px" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ───────────────── FAQ (temiz wrapper) ───────────────── */

export function FaqDeferred({
  rootMargin = "200px 0px",
  threshold = 0.1,
  idleTimeout,
  ...props
}) {
  const [ref, visible] = useDeferredVisible({
    rootMargin,
    threshold,
    idleTimeout,
  });
  const style = visibilityStyle(780);

  return (
    <div ref={ref} className="w-full min-w-0" style={style}>
      {visible ? (
        <Faq {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper nc-DeferredSections-clip w-full"
          style={{ ...style, minHeight: "780px" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ───────────────── Corporate Events (temiz wrapper) ───────────────── */

export function CorporateEventsDeferred({
  rootMargin = "200px 0px",
  threshold = 0.1,
  idleTimeout,
  ...props
}) {
  const [ref, visible] = useDeferredVisible({
    rootMargin,
    threshold,
    idleTimeout,
  });
  const style = visibilityStyle(320);

  return (
    <div ref={ref} className="w-full min-w-0" style={style}>
      {visible ? (
        <CorporateEvents {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ ...style, minHeight: "320px" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ───────────────── Corporate Intro (temiz wrapper) ───────────────── */

export function CorporateIntroDeferred({
  rootMargin = "200px 0px",
  threshold = 0.1,
  idleTimeout,
  ...props
}) {
  const [ref, visible] = useDeferredVisible({
    rootMargin,
    threshold,
    idleTimeout,
  });
  const style = visibilityStyle(240);

  return (
    <div ref={ref} className="w-full min-w-0" style={style}>
      {visible ? (
        <CorporateIntro {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ ...style, minHeight: "240px" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ───────────────── Tech Capabilities (temiz wrapper) ───────────────── */

export function TechCapabilitiesDeferred({
  rootMargin = "200px 0px",
  threshold = 0.1,
  idleTimeout,
  ...props
}) {
  const [ref, visible] = useDeferredVisible({
    rootMargin,
    threshold,
    idleTimeout,
  });
  const style = visibilityStyle(360);

  return (
    <div ref={ref} className="w-full min-w-0" style={style}>
      {visible ? (
        <TechCapabilities {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ ...style, minHeight: "360px" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ───────────────── Why Choose Us (temiz wrapper) ───────────────── */

export function WhyChooseUsDeferred({
  rootMargin = "200px 0px",
  threshold = 0.1,
  idleTimeout,
  ...props
}) {
  const [ref, visible] = useDeferredVisible({
    rootMargin,
    threshold,
    idleTimeout,
  });
  const style = visibilityStyle(320);

  return (
    <div ref={ref} className="w-full min-w-0" style={style}>
      {visible ? (
        <WhyChooseUs {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ ...style, minHeight: "320px" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
