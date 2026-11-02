# Wordt er al brood gehaald?

A full-stack example for beginners. Everyone sees one big button: red **NEE**, or green **JA!** when a colleague is getting the bread.

Built with Next.js, Supabase, Tailwind CSS and shadcn/ui.

## Run it yourself

1. Create a project on [supabase.com](https://supabase.com).
2. Open the **SQL Editor**, paste in [supabase/schema.sql](supabase/schema.sql) and press **Run**.
3. Copy `.env.example` to `.env.local` and fill in your project URL and publishable key. You find both under **Connect** in the Supabase dashboard.
4. Start the app:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in two browser windows and click the button in one of them.

## The code to read

| File | What it does | Runs on |
| --- | --- | --- |
| [app/page.tsx](app/page.tsx) | Reads the status from the database | The server |
| [components/home/bread-card.tsx](components/home/bread-card.tsx) | Shows the status and the button | The browser |
| [hooks/use-bread.ts](hooks/use-bread.ts) | Remembers the status, sends clicks to the API and hears changes | The browser |
| [app/api/bread/route.ts](app/api/bread/route.ts) | The API: saves a click in the database | The server |
| [lib/supabase.ts](lib/supabase.ts) | The connection to the database | Both |
| [supabase/schema.sql](supabase/schema.sql) | The table and who may do what | The database |

## What happens when you click

1. **You click:** `toggle` in [use-bread.ts](hooks/use-bread.ts) calls `setIsGettingBread`, and React redraws the button straight away.
2. **It is saved:** the same function sends a request to [the API](app/api/bread/route.ts), and the API updates the row in the database on the server.
3. **Everyone hears it:** Supabase announces the change, and the `useEffect` in each open browser calls `setIsGettingBread` with the new value.
4. **Someone opens the page later:** [page.tsx](app/page.tsx) reads the value on the server and passes it to the component as a prop.

Every night a scheduled job in the database sets the button back to Nee.
