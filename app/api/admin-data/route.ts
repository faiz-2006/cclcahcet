import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "data", "admin-overrides.json")

// Helper to read the JSON file
function readData(): Record<string, any> {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8")
      return JSON.parse(raw)
    }
  } catch (e) {
    console.error("Error reading admin data file:", e)
  }
  return {}
}

// Helper to write the JSON file
function writeData(data: Record<string, any>) {
  try {
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8")
  } catch (e) {
    console.error("Error writing admin data file:", e)
    throw e
  }
}

// GET /api/admin-data?key=aboutData  (or without key to get all)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get("key")

  const allData = readData()

  if (key) {
    return NextResponse.json({ data: allData[key] ?? null })
  }

  return NextResponse.json({ data: allData })
}

// POST /api/admin-data  body: { key: "aboutData", data: { ... } }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, data } = body

    if (!key) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 })
    }

    const allData = readData()
    allData[key] = data
    writeData(allData)

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("Error saving admin data:", e)
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }
}
