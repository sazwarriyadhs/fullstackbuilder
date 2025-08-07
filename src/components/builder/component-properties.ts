export const commonFields = [
    { id: "text", label: "Text", forTypes: ["heading", "text", "button", "tooltip", "footer", "gps"] },
    { id: "placeholder", label: "Placeholder", forTypes: ["input", "select"] },
]
  
export const componentFields: Record<string, { id: string; label: string, type?: string }[]> = {
    card: [
      { id: "title", label: "Title" },
      { id: "description", label: "Description" },
      { id: "content", label: "Content" },
    ],
    image: [
        { id: "src", label: "Image URL" },
        { id: "alt", label: "Alt Text" },
        { id: "aiHint", label: "AI Hint" },
    ],
    video: [
      { id: "src", label: "Video URL (Embed)" },
    ],
    tabs: [
      { id: "tab1Title", label: "Tab 1 Title" },
      { id: "tab1Content", label: "Tab 1 Content" },
      { id: "tab2Title", label: "Tab 2 Title" },
      { id: "tab2Content", label: "Tab 2 Content" },
    ],
    accordion: [
      { id: "triggerText", label: "Trigger Text" },
      { id: "contentText", label: "Content Text" },
    ],
    modal: [
      { id: "buttonText", label: "Button Text" },
      { id: "title", label: "Title" },
      { id: "description", label: "Description" },
    ],
    checkbox: [
      { id: "label", label: "Label" },
    ],
    radio: [
      { id: "option1Label", label: "Option 1 Label" },
      { id: "option2Label", label: "Option 2 Label" },
    ],
    select: [
      { id: "item1", label: "Item 1" },
      { id: "item2", label: "Item 2" },
      { id: "item3", label: "Item 3" },
    ],
    form: [
      { id: "title", label: "Form Title"},
      { id: "input1Placeholder", label: "Input 1 Placeholder" },
      { id: "input2Placeholder", label: "Input 2 Placeholder" },
      { id: "buttonText", label: "Button Text" },
    ],
    table: [
      { id: "col1", label: "Column 1 Title" },
      { id: "col2", label: "Column 2 Title" },
      { id: "row1col1", label: "Row 1 Col 1 Data" },
      { id: "row1col2", label: "Row 1 Col 2 Data" },
      { id: "row2col1", label: "Row 2 Col 1 Data" },
      { id: "row2col2", label: "Row 2 Col 2 Data" },
    ],
    list: [
      { id: "item1", label: "Item 1" },
      { id: "item2", label: "Item 2" },
      { id: "item3", label: "Item 3" },
    ],
    navbar: [
      { id: "title", label: "Title/Logo" },
      { id: "link1", label: "Link 1 Text" },
      { id: "link2", label: "Link 2 Text" },
      { id: "link3", label: "Link 3 Text" },
    ],
    chart: [
      { id: "bar1Name", label: "Bar 1 Name" },
      { id: "bar2Name", label: "Bar 2 Name" },
      { id: "bar3Name", label: "Bar 3 Name" },
    ],
    rating: [
      { id: "stars", label: "Number of Stars", type: "slider" },
    ],
    map: [
      { id: "src", label: "Embed URL" },
    ],
}
  