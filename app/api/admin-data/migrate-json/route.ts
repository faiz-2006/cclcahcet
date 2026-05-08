import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { getSupabaseAdminClient } from "@/lib/supabase-server"

const TABLE_NAME = "admin_data"
const LEGACY_FILE = path.join(process.cwd(), "data", "admin-overrides.json")

export async function POST() {
  try {
    const supabase = getSupabaseAdminClient()

    try {
      await fs.access(LEGACY_FILE)
    } catch {
      return NextResponse.json({ success: true, migratedKeys: 0, note: "No legacy JSON file found" })
    }

    const raw = await fs.readFile(LEGACY_FILE, "utf-8")
    const parsed = JSON.parse(raw) as Record<string, any>

    const rows = Object.entries(parsed).map(([key, data]) => ({ key, data }))
    if (rows.length === 0) {
      return NextResponse.json({ success: true, migratedKeys: 0, note: "Legacy file is empty" })
    }

    const { error } = await supabase.from(TABLE_NAME).upsert(rows)
    if (error) {
      console.error("Legacy migration error:", error)
      return NextResponse.json({ error: "Failed to migrate legacy JSON data" }, { status: 500 })
    }

    return NextResponse.json({ success: true, migratedKeys: rows.length })
  } catch (e) {
    console.error("Migrate JSON route error:", e)
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 })
  }
}
