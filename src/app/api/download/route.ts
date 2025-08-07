
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
        case 'video':
            return `<iframe width="560" height="315" src="${props.src || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>`;
        case 'divider':
            return `<hr className="my-4" />`;
        case 'tabs':
            return `
            <div>
                {/* Basic Tabs structure - requires state management */}
                <div role="tablist" aria-orientation="horizontal">
                    <button role="tab" aria-selected="true">${props.tab1Title || 'Tab 1'}</button>
                    <button role="tab">${props.tab2Title || 'Tab 2'}</button>
                </div>
                <div role="tabpanel">
                    <p>${props.tab1Content || 'Tab 1 Content'}</p>
                </div>
            </div>`;
        case 'accordion':
            return `
            <div>
                {/* Basic Accordion structure - requires state management */}
                <h3>${props.triggerText || 'Accordion Trigger'}</h3>
                <div>
                    <p>${props.contentText || 'Accordion Content'}</p>
                </div>
            </div>`;
        case 'modal':
             return `<div>{/* Modal: requires state management to show/hide */} <button>${props.buttonText || 'Open Modal'}</button></div>`;
        case 'tooltip':
            return `<div title="${props.text || 'Tooltip text'}"><span>Hover me</span></div>`;
        case 'checkbox':
            return `<div><input type="checkbox" id="${component.id}" /><label htmlFor="${component.id}">${props.label || 'Checkbox'}</label></div>`;
        case 'radio':
            return `
            <div>
                <div><input type="radio" id="r1-${component.id}" name="radio-group-${component.id}" /><label htmlFor="r1-${component.id}">${props.option1Label || 'Option 1'}</label></div>
                <div><input type="radio" id="r2-${component.id}" name="radio-group-${component.id}" /><label htmlFor="r2-${component.id}">${props.option2Label || 'Option 2'}</label></div>
            </div>`;
        case 'select':
            return `
            <select>
                <option>${props.item1 || 'Item 1'}</option>
                <option>${props.item2 || 'Item 2'}</option>
                <option>${props.item3 || 'Item 3'}</option>
            </select>`;
        case 'slider':
            return `<div><input type="range" min="0" max="100" /></div>`;
        case 'form':
             return `
             <form className="border p-4 rounded-md space-y-2">
                <h3>${props.title || 'Form'}</h3>
                <input placeholder="${props.input1Placeholder || 'Input 1'}" className="border p-2 w-full" />
                <input placeholder="${props.input2Placeholder || 'Input 2'}" className="border p-2 w-full" />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">${props.buttonText || 'Submit'}</button>
             </form>`;
        case 'table':
            return `
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">${props.col1 || 'Header 1'}</th>
                        <th className="border p-2">${props.col2 || 'Header 2'}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border p-2">${props.row1col1 || 'Data 1A'}</td>
                        <td className="border p-2">${props.row1col2 || 'Data 1B'}</td>
                    </tr>
                    <tr>
                        <td className="border p-2">${props.row2col1 || 'Data 2A'}</td>
                        <td className="border p-2">${props.row2col2 || 'Data 2B'}</td>
                    </tr>
                </tbody>
            </table>`;
        case 'list':
            return `
            <ul className="list-disc pl-5">
                <li>${props.item1 || 'Item 1'}</li>
                <li>${props.item2 || 'Item 2'}</li>
                <li>${props.item3 || 'Item 3'}</li>
            </ul>`;
        case 'navbar':
            return `
            <nav className="w-full p-2 bg-gray-800 text-white flex justify-between">
                <span>${props.title || 'Logo'}</span>
                <div>
                    <a href="#" className="p-2">${props.link1 || 'Home'}</a>
                    <a href="#" className="p-2">${props.link2 || 'About'}</a>
                    <a href="#" className="p-2">${props.link3 || 'Contact'}</a>
                </div>
            </nav>`;
        case 'footer':
            return `<footer className="w-full p-2 bg-gray-200 text-center"><p>${props.text || 'Footer content'}</p></footer>`;
        case 'datepicker':
            return `<div>{/* Date Picker: requires a library like react-day-picker */} <input placeholder="Select a date" /></div>`;
        case 'chart':
            return `<div className="w-full h-64 bg-gray-200 flex items-center justify-center"><p>Chart placeholder</p></div>`;
        case 'rating':
            return `<div className="flex">${Array.from({ length: props.stars || 5 }).map((_, i) => '<span>⭐</span>').join('')}</div>`;
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
