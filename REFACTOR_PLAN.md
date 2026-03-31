# Hoja de Ruta de Refactorización y Mejora de Arquitectura

Este documento detalla los pasos técnicos necesarios para elevar la calidad del código del portafolio a estándares de **Staff Engineering**, mejorando la escalabilidad, el tipado y la mantenibilidad.

---

## Fase 1: Cimentación y Diseño Atómico (Prioridad Alta)
Objetivo: Eliminar la duplicación de estilos y crear piezas de construcción reutilizables.

1.  **Crear Directorio de UI**: 
    - Crear `src/components/ui/`.
2.  **Abstraer Componentes Atómicos**:
    - `SectionHeader.tsx`: Centralizar el estilo del subtítulo con la línea de acento.
    - `Button.tsx`: Crear variantes (primary, outline, ghost) para evitar reescribir clases de Tailwind.
    - `Input.tsx` y `Textarea.tsx`: Estandarizar el diseño de los campos de formulario.
3.  **Migrar Tokens a Tailwind V4 Config**:
    - Mover valores hardcoded (`tracking-[0.4em]`, `text-[10px]`) al bloque `@theme` en `index.css` usando nombres semánticos como `--tracking-widest` o `--text-xs-mono`.

---

## Fase 2: Desanclaje de Datos y Tipado (Prioridad Alta)
Objetivo: Separar lo que el sitio "dice" de cómo el sitio "se ve".

1.  **Extraer Datos de Secciones**:
    - Crear `src/data/projects.ts` y `src/data/skills.ts`.
    - Definir interfaces estrictas (`Project`, `Skill`, `Experience`) para garantizar que los datos cumplan con el contrato esperado.
2.  **Refactorizar Secciones como Contenedores**:
    - `Projects.tsx`: Eliminar el arreglo hardcoded y usar un `map` sobre el archivo de datos.
    - `About.tsx`: Separar la lista de habilidades en un componente `SkillGroup.tsx`.
3.  **Crear Dumb Components**:
    - Extraer la lógica de la "Card" de proyecto a `src/components/ProjectCard.tsx`.

---

## Fase 3: Internacionalización (i18n) Escalable (Prioridad Media)
Objetivo: Preparar el sitio para múltiples idiomas sin inflar el Main Context.

1.  **Separación de Diccionarios**:
    - Crear `public/locales/en.json` y `public/locales/es.json`.
2.  **Implementar i18next (Sugerido)**:
    - Reemplazar la lógica manual de `t()` por una librería robusta que soporte interpolación y carga diferida (lazy loading) de idiomas.
3.  **Tipado de i18n**:
    - Configurar el tipo de retorno de la función `t` para que las llaves de traducción sean autocompletables y seguras.

---

## Fase 4: Optimización de Formularios y UX (Prioridad Media)
Objetivo: Mejorar la robustez de la comunicación y el feedback al usuario.

1.  **Integrar Manejo de Formularios**:
    - Instalar `react-hook-form` y `zod`.
2.  **Feedback en Tiempo Real**:
    - Añadir estados de carga (`isSubmitting`) y mensajes de éxito/error visuales después de enviar el formulario de contacto.
3.  **Validación de Esquemas**:
    - Asegurar que el email sea válido y el mensaje tenga una longitud mínima antes de permitir el envío.

---

## Fase 5: Mantenibilidad Final (Prioridad Baja)
Objetivo: Limpieza técnica y aseguramiento de calidad.

1.  **Eliminar "Dead Code"**:
    - Revisar archivos CSS y eliminar clases no utilizadas o selectores anidados innecesarios.
2.  **Optimización de Animaciones**:
    - Mover configuraciones de Framer Motion (ej. `transition={{ duration: 0.8 }}`) a constantes compartidas para asegurar que el "feeling" de la animación sea el mismo en todo el sitio.
3.  **Audit de Accesibilidad**:
    - Asegurar que todos los `svg` tengan `aria-hidden` y que los botones/enlaces tengan nombres accesibles descriptivos.

---

> [!TIP]
> Comienza por la **Fase 1** y **Fase 2** en paralelo, ya que son las que tienen el mayor impacto en la calidad inmediata de la estructura del código.
