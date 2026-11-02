-- Paste this file into the Supabase SQL Editor and press Run.

-- One table with one row: is someone getting the bread?
create table public.bread (
  id int primary key,
  is_getting_bread boolean not null default false
);

insert into public.bread (id) values (1);

-- The browser key is public, so the database itself decides what is allowed.
alter table public.bread enable row level security;

grant select, update (is_getting_bread) on public.bread to anon;

create policy "Everyone can read"
  on public.bread for select
  to anon
  using (true);

create policy "Everyone can update"
  on public.bread for update
  to anon
  using (true)
  with check (true);

-- Tell open browsers when this table changes.
alter publication supabase_realtime add table public.bread;

-- Every night at 03:00 GMT the button goes back to Nee.
create extension pg_cron with schema pg_catalog;

select cron.schedule(
  'reset-bread',
  '0 3 * * *',
  $$ update public.bread set is_getting_bread = false $$
);
