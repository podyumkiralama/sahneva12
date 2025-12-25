// components/DeferredSections.client.jsx
import ServicesTabs from "./ServicesTabs";
import ProjectsGallery from "./ProjectsGallery";
import Faq from "./Faq";
import CorporateEvents from "./CorporateEvents";
import CorporateIntro from "./CorporateIntro";
import TechCapabilities from "./TechCapabilities";
import WhyChooseUs from "./WhyChooseUs";

const visibilityStyle = (minHeightPx) => ({
  contentVisibility: "auto",
  containIntrinsicSize: `1px ${minHeightPx}px`,
});

const servicesContainSize = "1px 900px";

/* ───────────────── ServicesTabs (temiz wrapper) ───────────────── */

export function ServicesTabsDeferred({
  rootMargin = "200px 0px",
  threshold = 0.1,
  idleTimeout,
  ...props
}) {
  const style = {
    contentVisibility: "auto",
    containIntrinsicSize: servicesContainSize,
  };

  return (
    <div className="w-full min-w-0" style={style}>
      <ServicesTabs {...props} />
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
  const style = visibilityStyle(320);

  return (
    <div className="w-full min-w-0" style={style}>
      <ProjectsGallery {...props} />
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
  const style = visibilityStyle(780);

  return (
    <div className="w-full min-w-0" style={style}>
      <Faq {...props} />
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
  const style = visibilityStyle(320);

  return (
    <div className="w-full min-w-0" style={style}>
      <CorporateEvents {...props} />
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
  const style = visibilityStyle(240);

  return (
    <div className="w-full min-w-0" style={style}>
      <CorporateIntro {...props} />
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
  const style = visibilityStyle(360);

  return (
    <div className="w-full min-w-0" style={style}>
      <TechCapabilities {...props} />
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
  const style = visibilityStyle(320);

  return (
    <div className="w-full min-w-0" style={style}>
      <WhyChooseUs {...props} />
    </div>
  );
}
