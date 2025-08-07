
import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import type { Component } from '@/app/(app)/builder/page';

function generateJSX(components: Component[]): string {
    const componentToJSX = (component: Component): string => {
      const props = component.props || {};
      switch (component.type) {
        case 'heading':
          return `<h1 className="text-4xl font-bold">${props.text || 'Heading'}</h1>`;
        case 'text':
          return `<p>${props.text || 'Text block'}</p>`;
        case 'button':
          return `<button className="px-4 py-2 bg-blue-600 text-white rounded">${props.text || 'Click Me'}</button>`;
        case 'input':
          return `<input placeholder="${props.placeholder || 'Text input'}" className="w-48 border p-2" />`;
        case 'card':
            return `
            <div className="w-64 border rounded-lg shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">${props.title || 'Card Title'}</h3>
                    <p className="text-sm text-muted-foreground">${props.description || 'Card Description'}</p>
                </div>
                <div className="p-6 pt-0">
                    <p>${props.content || 'Card content goes here.'}</p>
                </div>
            </div>`;
        case 'image':
          return `<div className="w-48 h-32 relative"><img src="${props.src || 'https://placehold.co/300x200.png'}" alt="${props.alt || 'placeholder'}" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>`;
        default:
          return `<div>Unknown Component: ${component.type}</div>`;
      }
    };
  
    return components.map(componentToJSX).join('\n        ');
  }

function generatePageContent(title: string, components: Component[]): string {
    const jsx = generateJSX(components);
    return `
import React from 'react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
            ${title}
        </h1>
      </div>
      <div className="space-y-6">
        ${jsx}
      </div>
    </main>
  );
}
    `;
}

function generateComponentsJsonContent(components: Component[]): string {
    return JSON.stringify({ components }, null, 2);
}

const globalsCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using \`src\` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;

const packageJsonContent = `{
  "name": "design-export",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "14.2.3"
  },
  "devDependencies": {
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.3"
  }
}`;


export async function POST(request: NextRequest) {
  try {
    const { title, components } = await request.json();

    if (!title || !Array.isArray(components)) {
      return new NextResponse('Invalid request body', { status: 400 });
    }

    const zip = new JSZip();

    // Generate page content
    const pageContent = generatePageContent(title, components);
    const componentsJsonContent = generateComponentsJsonContent(components);

    // Add files to zip
    zip.file('package.json', packageJsonContent);
    zip.file('tailwind.config.js', tailwindConfigContent);
    zip.file('components.json', componentsJsonContent);

    const appFolder = zip.folder('app');
    if (appFolder) {
        appFolder.file('page.tsx', pageContent);
        appFolder.file('globals.css', globalsCssContent);
    }
    

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${title.toLowerCase().replace(/\s+/g, '-')}.zip"`,
      },
    });
  } catch (error) {
    console.error('Failed to create zip:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
