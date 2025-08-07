
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const jsonFilePath = path.join(process.cwd(), 'src', 'data', 'template_list.json');
    const fileContent = await fs.readFile(jsonFilePath, 'utf-8');
    const templates = JSON.parse(fileContent);
    return NextResponse.json(templates);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load templates' }, { status: 500 });
  }
}
