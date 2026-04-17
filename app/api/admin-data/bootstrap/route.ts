import { NextResponse } from "next/server"
import { defaultAdminData } from "@/lib/default-admin-data"
import { getSupabaseAdminClient } from "@/lib/supabase-server"

const TABLE_NAME = "admin_data"

export async function POST() {
  try {
    const supabase = getSupabaseAdminClient()

    const rows = Object.entries(defaultAdminData).map(([key, data]) => ({ key, data }))
    const { error } = await supabase.from(TABLE_NAME).upsert(rows)

    if (error) {
      console.error("Bootstrap seed error:", error)
      return NextResponse.json({ error: "Failed to seed default data" }, { status: 500 })
    }

    return NextResponse.json({ success: true, seededKeys: rows.length })
  } catch (e) {
    console.error("Bootstrap route error:", e)
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 })
  }
}
