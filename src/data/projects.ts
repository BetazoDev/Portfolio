import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: '01',
    number: '01',
    title: 'DIABOLICAL MEDIA MANAGER',
    year: '2024',
    description: {
      es: 'Sistema interno de gestión de imágenes y CDN. Cuenta con optimización automática de imágenes (WebP/AVIF) y servicio dinámico de CDN.',
      en: 'Internal image management and CDN system. Features automatic image optimization (WebP/AVIF) and dynamic CDN serving.',
    },
    stack: ['Next.js', 'Node.js', 'Express', 'Sharp', 'PostgreSQL'],
    link: 'https://media.diabolicalservices.tech/',
    github: 'https://github.com/BetazoDev',
    image: 'https://cdn.diabolicalservices.tech/diabolical/general/original/icono-diabolical-blanco.png',
  },
  {
    id: '02',
    number: '02',
    title: 'Project Manager System',
    year: '2024',
    description: {
      es: 'Sistema de Gestión de Proyectos interno diseñado para optimizar el flujo de trabajo de equipos de producción web con pipeline Kanban.',
      en: 'Internal Project Management System designed to streamline the workflow of web production teams with Kanban pipeline.',
    },
    stack: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Node.js', 'MongoDB'],
    link: 'https://rdn.diabolicalservices.tech/',
    github: 'https://github.com/BetazoDev',
    image: 'https://cdn.diabolicalservices.tech/humberto-personal-projects/general/original/gemini-generated-image-a95usua95usua95u-1.png',
  },
  {
    id: '03',
    number: '03',
    title: 'NailFlow',
    year: '2025',
    description: {
      es: 'Una plataforma de automatización de reservas personalizada diseñada específicamente para técnicos de uñas en LATAM.',
      en: 'A custom booking automation platform designed specifically for nail technicians in LATAM.',
    },
    stack: ['React', 'TypeScript', 'Framer Motion', 'UI/UX Design'],
    link: 'https://demo.diabolicalservices.tech/',
    github: 'https://github.com/BetazoDev',
    image: 'https://cdn.diabolicalservices.tech/humberto-personal-projects/general/original/gemini-generated-image-v8v6blv8v6blv8v6.png',
  },
  {
    id: '04',
    number: '04',
    title: 'ERP Diabolical',
    year: '2024',
    description: {
      es: 'Sistema de Planificación de Recursos Empresariales para la gestión interna y operaciones en Diabolical Projects.',
      en: 'Enterprise Resource Planning system for internal management and operations at Diabolical Projects.',
    },
    stack: ['Internal Tool', 'System Design'],
    link: '#',
    github: 'https://github.com/diabolicalprojects/erp-diabolical',
    image: 'https://cdn.diabolicalservices.tech/diabolical/general/original/icono-diabolical-blanco.png',
  },
  {
    id: '05',
    number: '05',
    title: 'Diabolical Landing Page',
    year: '2024',
    description: {
      es: 'Página de aterrizaje corporativa enfocada en alto rendimiento, UI/UX moderna y Core Web Vitals optimizados.',
      en: 'Corporate landing page focusing on high performance, modern UI/UX, and optimized Core Web Vitals.',
    },
    stack: ['React', 'Performance', 'UI/UX'],
    link: 'https://diabolicalservices.tech/',
    github: 'https://github.com/diabolicalprojects/landing-page',
    image: 'https://cdn.diabolicalservices.tech/diabolical/general/original/icono-diabolical-blanco.png',
  },
];
