"use client";

import DeferredHydration from "./DeferredHydration.client";
import DeferredSpeedInsights from "./DeferredSpeedInsights.client";
import AnalyticsConsentWrapper from "./AnalyticsConsentWrapper.client";
import NewTabAccessibility from "./NewTabAccessibility.client";
import NonCriticalStylesheet from "./NonCriticalStylesheet";

/**
 * Layout genelinde zorunlu olmayan scriptleri geciktirerek
 * ilk render yükünü azaltır.
 */
export default function LayoutClientShell() {
  return (
    <>
      <NewTabAccessibility />
      <NonCriticalStylesheet />

      <DeferredHydration idleTimeout={3000} rootMargin="250px" fallback={null}>
        <AnalyticsConsentWrapper />
      </DeferredHydration>

      <DeferredHydration idleTimeout={4000} rootMargin="250px" fallback={null}>
        <DeferredSpeedInsights />
      </DeferredHydration>
    </>
  );
}
