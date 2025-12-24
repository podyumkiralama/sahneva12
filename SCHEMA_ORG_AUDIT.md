# SCHEMA_ORG_AUDIT.md — TR Global Graph Updates

## Changes
- **LocalBusiness.addressRegion** updated from `TR34` to `İstanbul` for clearer region labeling.
- **NAP normalization**: Organization + LocalBusiness telephone fields standardized to `+905453048671`.
- **areaServed consistency**: Organization contactPoint and LocalBusiness now both use `"TR"`.
- **LocalBusiness media fields**: added `logo` and set `image` to the OG asset (`/img/og/sahneva-og.webp`) with absolute URL.

## Why
These updates keep the entity graph validator-friendly and consistent across Organization/LocalBusiness, reduce ambiguity in regional coverage, and ensure brand assets resolve to absolute URLs.
