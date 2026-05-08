import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdminClient } from "@/lib/supabase-server"
import { defaultAdminData } from "@/lib/default-admin-data"

const TABLE_NAME = "admin_data"

async function seedMissingKey(key: string, data: any) {
  const supabase = getSupabaseAdminClient()
  const { error } = await supabase.from(TABLE_NAME).upsert({ key, data })
  if (error) {
    throw error
  }
}

// GET /api/admin-data?key=aboutData  (or without key to get all)
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdminClient()
    const { searchParams } = new URL(request.url)
    const key = searchParams.get("key")

    if (key) {
      const { data, error } = await supabase.from(TABLE_NAME).select("data").eq("key", key).maybeSingle()

      if (error) {
        console.error("Supabase GET key error:", error)
        return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
      }

      if (data?.data != null) {
        return NextResponse.json({ data: data.data })
      }

      const defaultData = defaultAdminData[key]
      if (defaultData === undefined) {
        return NextResponse.json({ data: null })
      }

      await seedMissingKey(key, defaultData)
      return NextResponse.json({ data: defaultData })
    }

    const { data: rows, error } = await supabase.from(TABLE_NAME).select("key,data")

    if (error) {
      console.error("Supabase GET all error:", error)
      return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
    }

    const mergedData: Record<string, any> = { ...defaultAdminData }
    for (const row of rows ?? []) {
      mergedData[row.key] = row.data
    }

    return NextResponse.json({ data: mergedData })
  } catch (e) {
    console.error("Error in GET /api/admin-data:", e)
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 })
  }
}

// POST /api/admin-data  body: { key: "aboutData", data: { ... } }
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdminClient()
    const body = await request.json()
    const { key, data } = body

    if (!key) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 })
    }

    const { error } = await supabase.from(TABLE_NAME).upsert({ key, data })

    if (error) {
      console.error("Supabase POST error:", error)
      return NextResponse.json({ error: "Failed to save" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("Error saving admin data:", e)
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }
}
