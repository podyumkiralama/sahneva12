import { SITE_URL } from "./seoConfig";

export const BASE_SITE_URL = SITE_URL.replace(/\/$/, "");
export const ORGANIZATION_ID = `${BASE_SITE_URL}/#org`;
export const WEBSITE_ID = `${BASE_SITE_URL}/#website`;
export const LOCAL_BUSINESS_ID = `${BASE_SITE_URL}/#local`;
