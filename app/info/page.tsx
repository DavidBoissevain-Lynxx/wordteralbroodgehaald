import Link from "next/link";

// All the text on this page. Add a line here and it appears on the page.
const rules = [
  "Deze site is gebakken op 180 graden.",
  "Wij bewaren niets, alleen de kruimels die op tafel blijven liggen.",
  "Cookies hebben we niet, alleen schuddenbuikjes.",
  "Je privacy is heilig, net als het laatste eitje.",
  "Wie klikt en geen brood haalt, is geband van potjes foos.",
  "Alle rechten voorbehouden aan de kaasschaaf.",
];

// A second page: the folder app/info makes this the URL /info.
export default function Info() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-muted p-4 text-center">
      <h1 className="text-2xl font-semibold">Info en privacy</h1>

      <ul className="flex flex-col gap-2 text-muted-foreground">
        {rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>

      <Link href="/" className="underline">
        Terug naar de knop
      </Link>
    </main>
  );
}
