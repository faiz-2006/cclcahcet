# Supabase Migration (CCL CAHCET)

## What was migrated

- Admin content API (`/api/admin-data`) now uses Supabase table `public.admin_data`.
- Upload API (`/api/upload`) now stores files in Supabase Storage bucket `cclcahcet-uploads` and returns public URLs.
- JSON file persistence (`data/admin-overrides.json`) is no longer used by backend routes.

## 1) Configure environment

Create `.env.local` using values from `.env.example`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET` (optional, default: `cclcahcet-uploads`)

## 2) Create DB table and storage bucket

Run SQL from `supabase/schema.sql` in the Supabase SQL editor.

## 3) Migrate existing JSON override content (one-time)

Call:

- `POST /api/admin-data/migrate-json`

This imports `data/admin-overrides.json` into Supabase so your current admin edits are preserved.

## 4) Seed existing default content

After app starts with env configured, call:

- `POST /api/admin-data/bootstrap`

This inserts all default website content keys into Supabase.

## 5) Verify

- Open admin pages and save changes; updates should persist through Supabase.
- Upload logo/gallery image from admin pages; URL should be from Supabase storage domain.
