import { Zap, Box, Code } from 'lucide-react';

export const SECTIONS = [
  {
    title: "Getting Started",
    icon: Zap,
    items: [
      { name: "Introduction", href: "/docs" },
      { name: "Installation", href: "/docs/installation" },
      { name: "Home Screen", href: "/docs/home" },
    ]
  },
  {
    title: "Core Concepts",
    icon: Box,
    items: [
      { name: "Projects", href: "/docs/projects" },
      { name: "Workflow Builder", href: "/docs/workflows" },
      { name: "Nodes & Templates", href: "/docs/nodes" },
      { name: "Deployments", href: "/docs/deployments" },
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