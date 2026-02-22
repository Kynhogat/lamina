import { Zap, Box, Code } from 'lucide-react';

export const SECTIONS = [
  {
    title: "Getting Started",
    icon: Zap,
    items: [
      { name: "Introduction", href: "/docs" },
      { name: "Installation", href: "/docs/installation" },
      { name: "First Workflow", href: "/docs/tutorial" },
    ]
  },
  {
    title: "Core Concepts",
    icon: Box,
    items: [
      { name: "Nodes & Edges", href: "/docs/nodes" },
      { name: "Variables", href: "/docs/variables" },
      { name: "Logic Gates", href: "/docs/logic" },
    ]
  },
  {
    title: "API Reference",
    icon: Code,
    items: [
      { name: "REST API", href: "/docs/api" },
      { name: "Python SDK", href: "/docs/sdk" },
    ]
  }
];

export const ALL_PAGES = SECTIONS.flatMap(section => section.items);