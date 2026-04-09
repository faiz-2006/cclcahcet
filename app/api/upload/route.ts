import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file received." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Generate unique filename to prevent overwrites
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${originalName}`;
    
    // Ensure the uploads directory exists
    const publicDir = path.join(process.cwd(), "public");
    const uploadDir = path.join(publicDir, "uploads");
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Directory might already exist, which is fine
      console.log("Upload directory check:", err);
    }

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);
    
    // The public URL path relative to the domain
    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file." },
      { status: 500 }
    );
  }
}
