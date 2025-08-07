
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  try {
    if (id) {
        const jsonFilePath = path.join(process.cwd(), 'src', 'templates', id, 'components.json');
        const fileContent = await fs.readFile(jsonFilePath, 'utf-8');
        const template = JSON.parse(fileContent);
        return NextResponse.json(template);
    } else {
        const jsonFilePath = path.join(process.cwd(), 'src', 'data', 'template_list.json');
        const fileContent = await fs.readFile(jsonFilePath, 'utf-8');
        const templates = JSON.parse(fileContent);
        return NextResponse.json(templates);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
