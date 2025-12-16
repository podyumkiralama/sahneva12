import Link from "next/link";

const focusRingClass = "focus-ring";

export default function SiteFooter({ strings }) {
  const year = new Date().getFullYear();
  return (
    <footer
      id="_main_footer"
      tabIndex={-1}
      aria-label={strings?.ariaLabel ?? "Site footer"}
      className="bg-slate-950 text-slate-200"
      dir={strings.direction}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-lg font-bold text-white">Sahneva</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{strings.about}</p>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <strong>{strings.phoneLabel}:</strong>{" "}
                <a
                  href="tel:+905453048671"
                  className={`hover:text-emerald-300 ${focusRingClass}`}
                >
                  +90 545 304 86 71
                </a>
              </p>
              <p>
                <strong>{strings.mailLabel}:</strong>{" "}
                <a
                  href="mailto:info@sahneva.com"
                  className={`hover:text-emerald-300 ${focusRingClass}`}
                >
                  info@sahneva.com
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              {strings.servicesTitle}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {strings.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`hover:text-emerald-300 ${focusRingClass}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              {strings.officeTitle}
            </h3>
            <p className="mt-4 text-sm text-slate-300 whitespace-pre-line">{strings.address}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {strings.social.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full border border-white/15 px-3 py-1 hover:border-emerald-300 hover:text-emerald-300 transition ${focusRingClass}`}
                  aria-label={`${item.label} – yeni sekmede açılır`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-400">
        © {year} Sahneva — {strings.rights}
      </div>
    </footer>
  );
}
