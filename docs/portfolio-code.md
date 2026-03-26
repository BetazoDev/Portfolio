# Documento de Gestión Técnica: Desarrollo y Animaciones (Fase 2)

**Agente Asignado:** Antigravity (vía Stitch MCP)
**Fase Actual:** Fase 2 - Generación de Código, Interactividad y Animaciones.

## 1. Directrices Técnicas Base
* **Stack Estricto:** React (TypeScript), Tailwind CSS.
* **Librería de Animación:** Framer Motion (o equivalente de alto rendimiento compatible con React).
* **Enfoque de Desarrollo:** Priorizar la fluidez, 60fps constantes y código modular. La interactividad debe demostrar un nivel "Senior Frontend", elevando el diseño minimalista en blanco y negro a través de la funcionalidad.
* **Performance:** Las animaciones no deben penalizar el LCP ni el CLS (Core Web Vitals). Utilizar `lazy loading` para componentes pesados si es necesario.

## 2. Lógica de Animaciones y Microinteracciones (Desktop - B&W)
El diseño es monocromático, por lo que la interactividad debe basarse en el movimiento, la escala y la inversión de colores (blanco a negro / negro a blanco). Implementa los siguientes requerimientos:

### 2.1 Animaciones Globales
* **Custom Cursor (Opcional pero recomendado):** Un cursor personalizado sutil (ej. un punto negro/blanco con mezcla de exclusión/diferencia) que se expanda al hacer hover sobre enlaces o botones.
* **Scroll Suave:** Implementar smooth scrolling para la navegación.
* **Reveal on Scroll:** Los elementos de cada sección deben aparecer suavemente al entrar en el viewport (Fade in + leve traslación en el eje Y) utilizando `IntersectionObserver` o `whileInView` de Framer Motion.

### 2.2 Hero Section
* **Carga Inicial (Staggered Text):** El título ("Humberto Alonso López") y el subtítulo deben animarse letra por letra o palabra por palabra desde abajo hacia arriba, revelándose detrás de una máscara (overflow-hidden).
* **Botones (Hover States):** Interacciones magnéticas. Al hacer hover, el botón debe invertir sus colores (fondo negro a blanco, texto blanco a negro) con una transición de barrido (sweep) de 0.3s.

### 2.3 Experiencia Profesional (Timeline)
* **Dibujo de la Línea (Draw effect):** La línea vertical del timeline debe "dibujarse" de arriba hacia abajo a medida que el usuario hace scroll.
* **Aparición de Nodos:** Cada bloque de experiencia (Reputation Defense Network, Agency4RealEstate, Bloom) debe deslizarse sutilmente desde el lado derecho o izquierdo cuando su punto correspondiente en la línea se active.

### 2.4 Proyectos (NailFlow)
* **Parallax Sutil:** La imagen o mockup del dashboard de NailFlow debe tener un ligero efecto parallax en relación con el contenedor al hacer scroll.
* **Hover en Tarjeta:** Al pasar el mouse sobre la tarjeta del proyecto, la imagen debe escalar ligeramente (scale: 1.05) dentro de su contenedor (overflow-hidden) y mostrar una superposición (overlay) semi-transparente que revele el botón de "Ver detalles" o "Código".

### 2.5 Core Skills (Grid/Tags)
* **Efecto Hover de Píldoras:** Las etiquetas de habilidades (React, TypeScript, WordPress, etc.) deben rebotar sutilmente (spring animation) y cambiar su estado de borde/relleno al pasar el cursor.

## 3. Entregable Esperado
* Código fuente estructurado en componentes funcionales de React.
* Tipado estricto en TypeScript para props y estados.
* Implementación de Tailwind CSS para la estructura y Framer Motion para la capa de interactividad.
* Archivo principal (`App.tsx` o `index.tsx`) que ensamble todas las secciones creadas en la Fase 1 con la lógica de animación aplicada.