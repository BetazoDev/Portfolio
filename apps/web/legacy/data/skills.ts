import type { SkillGroup } from '../types';

export const skillsData: SkillGroup[] = [
  {
    id: 'frontend',
    category: {
      en: 'Frontend Engineering',
      es: 'Ingeniería Frontend',
    },
    items: ['WordPress & WooCommerce', 'HTML5 & CSS3', 'Performance Optimization', 'Responsive & Cross-Browser'],
  },
  {
    id: 'design',
    category: {
      en: 'Visual Design',
      es: 'Diseño Visual',
    },
    items: ['Figma', 'UX/UI Implementation', 'Pixel-Perfect Layouts', 'Elementor/Divi'],
  },
  {
    id: 'backend',
    category: {
      en: 'Backend Systems',
      es: 'Sistemas Backend',
    },
    items: ['Workflow Automation', 'n8n & Webhooks', 'API Integrations', 'AI-assisted Optimization'],
  },
  {
    id: 'devops',
    category: {
      en: 'Infrastructure & DevOps',
      es: 'Infraestructura y DevOps',
    },
    items: ['Dokploy', 'Nixpacks', 'Docker Deployments', 'Maintenance & Security'],
  },
];
