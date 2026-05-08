import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdminClient } from "@/lib/supabase-server"

const DEFAULT_BUCKET = "cclcahcet-uploads"

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdminClient()
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || DEFAULT_BUCKET
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Generate unique filename to prevent overwrites
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const filename = `${uniqueSuffix}-${originalName}`
    const storagePath = `uploads/${filename}`

    const { error: uploadError } = await supabase.storage.from(bucket).upload(storagePath, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    })

    if (uploadError) {
      console.error("Supabase upload error:", uploadError)
      return NextResponse.json({ error: "Failed to upload file." }, { status: 500 })
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath)
    const publicUrl = data.publicUrl

    return NextResponse.json({
      success: true,
      url: publicUrl,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file." }, { status: 500 })
  }
}
