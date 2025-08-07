import { Heading1, Type, MousePointerClick, RectangleHorizontal, Pilcrow, ImageIcon, Youtube, Minus, GalleryVertical, ChevronDownSquare, AppWindow, MessageCircle, CheckSquare, CircleDot, ChevronDown, SlidersHorizontal, PanelTop, PanelBottom, List, Star, GanttChartSquare, Calendar, TableIcon, FormInputIcon, Map, LocateFixed } from "lucide-react"

export const componentCategories = [
    {
        name: "Layout",
        components: [
            { name: "Card", icon: RectangleHorizontal, type: 'card' },
            { name: "Divider", icon: Minus, type: 'divider' },
            { name: "Tabs", icon: GalleryVertical, type: 'tabs' },
            { name: "Accordion", icon: ChevronDownSquare, type: 'accordion' },
            { name: "Modal", icon: AppWindow, type: 'modal' },
            { name: "Table", icon: TableIcon, type: 'table' },
            { name: "Navbar", icon: PanelTop, type: 'navbar' },
            { name: "Footer", icon: PanelBottom, type: 'footer' },
        ]
    },
    {
        name: "Typography",
        components: [
            { name: "Heading", icon: Heading1, type: 'heading' },
            { name: "Text", icon: Pilcrow, type: 'text' },
            { name: "List", icon: List, type: 'list' },
        ],
    },
    {
        name: "Forms",
        components: [
            { name: "Button", icon: MousePointerClick, type: 'button' },
            { name: "Input", icon: Type, type: 'input' },
            { name: "Checkbox", icon: CheckSquare, type: 'checkbox' },
            { name: "Radio Group", icon: CircleDot, type: 'radio' },
            { name: "Select", icon: ChevronDown, type: 'select' },
            { name: "Slider", icon: SlidersHorizontal, type: 'slider' },
            { name: "Form", icon: FormInputIcon, type: 'form' },
            { name: "Date Picker", icon: Calendar, type: 'datepicker' },
        ]
    },
    {
        name: "Media & Data",
        components: [
            { name: "Image", icon: ImageIcon, type: 'image' },
            { name: "Video", icon: Youtube, type: 'video' },
            { name: "Chart", icon: GanttChartSquare, type: 'chart' },
            { name: "Map", icon: Map, type: 'map' },
            { name: "GPS Location", icon: LocateFixed, type: 'gps' },
        ]
    },
    {
        name: "Feedback",
        components: [
            { name: "Tooltip", icon: MessageCircle, type: 'tooltip' },
            { name: "Rating", icon: Star, type: 'rating' },
        ]
    }
]
