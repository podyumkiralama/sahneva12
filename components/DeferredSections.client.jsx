// components/DeferredSections.client.jsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Dinamik componentler
const ServicesTabs = dynamic(() => import("./ServicesTabs"), { ssr: false });
const ProjectsGallery = dynamic(() => import("./ProjectsGallery"), { ssr: false });
const Faq = dynamic(() => import("./Faq"), { ssr: false });

const CorporateEvents = dynamic(() => import("./CorporateEvents"), { ssr: false });
const CorporateIntro = dynamic(() => import("./CorporateIntro"), { ssr: false });
const TechCapabilities = dynamic(() => import("./TechCapabilities"), { ssr: false });
const WhyChooseUs = dynamic(() => import("./WhyChooseUs"), { ssr: false });

// Lazy-load görünürlük hook'u
function useDeferredVisible(options) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

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
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, options]);

  return [ref, visible];
}

/* ───────────────── ServicesTabs (temiz wrapper) ───────────────── */

export function ServicesTabsDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "200px 0px",
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="w-full min-w-0">
      {visible ? (
        <ServicesTabs {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ "--nc-min-h": "400px" }}
          aria-hidden="true"
        />
      )}
    </section>
  );
}

/* ───────────────── ProjectsGallery (temiz wrapper) ───────────────── */

export function ProjectsGalleryDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "400px 0px",
    threshold: 0.05,
  });

  return (
    <section ref={ref} className="w-full min-w-0">
      {visible ? (
        <ProjectsGallery {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ "--nc-min-h": "320px" }}
          aria-hidden="true"
        />
      )}
    </section>
  );
}

/* ───────────────── FAQ (temiz wrapper) ───────────────── */

export function FaqDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "200px 0px",
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="w-full min-w-0">
      {visible ? (
        <Faq {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper nc-DeferredSections-clip w-full"
          style={{ "--nc-min-h": "780px" }}
          aria-hidden="true"
        />
      )}
    </section>
  );
}

/* ───────────────── Corporate Events (temiz wrapper) ───────────────── */

export function CorporateEventsDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "200px 0px",
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="w-full min-w-0">
      {visible ? (
        <CorporateEvents {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ "--nc-min-h": "320px" }}
          aria-hidden="true"
        />
      )}
    </section>
  );
}

/* ───────────────── Corporate Intro (temiz wrapper) ───────────────── */

export function CorporateIntroDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "200px 0px",
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="w-full min-w-0">
      {visible ? (
        <CorporateIntro {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ "--nc-min-h": "240px" }}
          aria-hidden="true"
        />
      )}
    </section>
  );
}

/* ───────────────── Tech Capabilities (temiz wrapper) ───────────────── */

export function TechCapabilitiesDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "200px 0px",
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="w-full min-w-0">
      {visible ? (
        <TechCapabilities {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ "--nc-min-h": "360px" }}
          aria-hidden="true"
        />
      )}
    </section>
  );
}

/* ───────────────── Why Choose Us (temiz wrapper) ───────────────── */

export function WhyChooseUsDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "200px 0px",
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="w-full min-w-0">
      {visible ? (
        <WhyChooseUs {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ "--nc-min-h": "320px" }}
          aria-hidden="true"
        />
      )}
    </section>
  );
}
