/**
 * Renders both language variants and lets CSS reveal the active one, so the copy is correct
 * before hydration and switching languages needs no re-render. Each variant carries its own
 * `lang` so crawlers and translation tools read the duplicated text as two languages rather
 * than one garbled string.
 */
export function LangText({
  en,
  es,
  block = false,
}: {
  en: React.ReactNode;
  es: React.ReactNode;
  block?: boolean;
}) {
  const tag = block ? 'block' : '';
  return (
    <>
      <span lang="en" className={`lang-en ${tag}`}>
        {en}
      </span>
      <span lang="es" className={`lang-es ${tag}`}>
        {es}
      </span>
    </>
  );
}
