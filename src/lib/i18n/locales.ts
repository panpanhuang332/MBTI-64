/** 支援的語系。zh-TW 為預設（根路徑），zh-CN 與 en 使用路徑前綴。 */
export const LOCALES = ["zh-TW", "zh-CN", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "zh-TW";

/** 路徑前綴語系（App Router 的 [locale] 段） */
export const PREFIX_LOCALES = ["zh-CN", "en"] as const;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** 該語系的路徑前綴："" | "/zh-CN" | "/en" */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/** 組出語系化的站內連結 */
export function localeHref(locale: Locale, path: string): string {
  const prefix = localePrefix(locale);
  if (path === "/") return prefix === "" ? "/" : prefix;
  return `${prefix}${path}`;
}

/** html lang 屬性值 */
export const HTML_LANG: Record<Locale, string> = {
  "zh-TW": "zh-Hant-TW",
  "zh-CN": "zh-Hans-CN",
  en: "en",
};

/** Open Graph locale */
export const OG_LOCALE: Record<Locale, string> = {
  "zh-TW": "zh_TW",
  "zh-CN": "zh_CN",
  en: "en_US",
};

/** 把目前 pathname 換成另一語系的對應路徑 */
export function switchLocalePath(pathname: string, target: Locale): string {
  let base = pathname;
  for (const l of PREFIX_LOCALES) {
    if (base === `/${l}`) base = "/";
    else if (base.startsWith(`/${l}/`)) base = base.slice(l.length + 1);
  }
  return localeHref(target, base);
}

/** hreflang alternates（含 x-default）供 metadata 使用 */
export function languageAlternates(path: string): Record<string, string> {
  return {
    "zh-TW": path === "/" ? "/" : path,
    "zh-CN": localeHref("zh-CN", path),
    en: localeHref("en", path),
    "x-default": path === "/" ? "/" : path,
  };
}

/** 簡單的字串插值：fmt("第 {n} 題", { n: 3 }) */
export function fmt(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}
