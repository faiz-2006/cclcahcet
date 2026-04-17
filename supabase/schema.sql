-- Run this in Supabase SQL editor

create table if not exists public.admin_data (
  key text primary key,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at_admin_data()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_admin_data_updated_at on public.admin_data;
create trigger trg_admin_data_updated_at
before update on public.admin_data
for each row execute function public.set_updated_at_admin_data();

alter table public.admin_data enable row level security;

-- Service role bypasses RLS. Optional read policy for anon if needed later.
-- create policy "Allow anon read admin_data"
-- on public.admin_data
-- for select
-- to anon
-- using (true);

insert into storage.buckets (id, name, public)
values ('cclcahcet-uploads', 'cclcahcet-uploads', true)
on conflict (id) do nothing;
