import { Copy, Edit2, Star } from "lucide-react";

export const MENU_ITEMS = [
  {
    icon: Edit2,
    label: "Edit",
    shortcut: "⌘E",
  },
  {
    icon: Copy,
    label: "Make a Copy",
    shortcut: "⌘C",
  },
  {
    icon: Star,
    label: "Favorite",
    shortcut: "⌘S",
  },
];

// Label options configuration
export const LABEL_OPTIONS = ["Bug", "Feature", "Documentation"];
