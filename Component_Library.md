# FocusFrame Component Library

## Overview
This document defines the reusable UI components for the FocusFrame application, following the design system specifications.

## Color Tokens

### Primitive Colors
```css
--color-indigo-500: #6366F1;
--color-violet-500: #8B5CF6;
--color-slate-900: #0F172A;
--color-slate-800: #1E293B;
--color-slate-50: #F1F5F9;
--color-slate-400: #94A3B8;
--color-emerald-500: #10B981;
--color-amber-500: #F59E0B;
--color-red-500: #EF4444;
--color-blue-500: #3B82F6;
```

### Semantic Colors
```css
--color-primary: var(--color-indigo-500);
--color-secondary: var(--color-violet-500);
--color-background: var(--color-slate-900);
--color-surface: var(--color-slate-800);
--color-text-primary: var(--color-slate-50);
--color-text-secondary: var(--color-slate-400);
--color-success: var(--color-emerald-500);
--color-warning: var(--color-amber-500);
--color-error: var(--color-red-500);
--color-info: var(--color-blue-500);
```

## Typography Tokens

```css
--font-family-heading: 'Space Grotesk', sans-serif;
--font-family-body: 'Inter', sans-serif;

--font-size-h1: 3rem;
--font-size-h2: 2.25rem;
--font-size-h3: 1.5rem;
--font-size-h4: 1.25rem;
--font-size-body: 1rem;
--font-size-small: 0.875rem;
--font-size-caption: 0.75rem;

--font-weight-bold: 700;
--font-weight-semibold: 600;
--font-weight-medium: 500;
--font-weight-regular: 400;

--line-height-heading: 1.2;
--line-height-body: 1.5;
```

## Spacing Tokens

```css
--spacing-4xs: 0.25rem; /* 4px */
--spacing-3xs: 0.5rem;  /* 8px */
--spacing-2xs: 0.75rem; /* 12px */
--spacing-xs: 1rem;     /* 16px */
--spacing-sm: 1.5rem;   /* 24px */
--spacing-md: 2rem;     /* 32px */
--spacing-lg: 2.5rem;   /* 40px */
--spacing-xl: 3rem;     /* 48px */
--spacing-2xl: 4rem;    /* 64px */
```

## Border Radius Tokens

```css
--border-radius-sm: 4px;
--border-radius-md: 8px;
--border-radius-lg: 16px;
--border-radius-full: 9999px;
```

## Shadow Tokens

```css
--shadow-subtle: 0 1px 2px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

## Components

### 1. Button

#### Variants
- Primary
- Secondary
- Ghost
- Link

#### Sizes
- Small
- Medium (default)
- Large

#### States
- Default
- Hover
- Active
- Focus
- Disabled

#### CSS Implementation
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--border-radius-md);
  font-family: var(--font-family-body);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.btn--primary {
  background-color: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-subtle);
}

.btn--primary:hover {
  background-color: color-mix(in srgb, var(--color-primary) 90%, white 10%);
  box-shadow: var(--shadow-md);
}

.btn--primary:active {
  background-color: color-mix(in srgb, var(--color-primary) 80%, black 20%);
  box-shadow: none;
  transform: scale(0.98);
}

.btn--secondary {
  background-color: var(--color-secondary);
  color: white;
}

.btn--ghost {
  background-color: transparent;
  color: var(--color-text-primary);
  box-shadow: none;
}

.btn--link {
  background-color: transparent;
  color: var(--color-primary);
  text-decoration: none;
}

.btn:disabled {
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  cursor: not-allowed;
  opacity: 0.5;
}

.btn--sm {
  padding: var(--spacing-4xs) var(--spacing-2xs);
  font-size: var(--font-size-small);
}

.btn--md {
  padding: var(--spacing-3xs) var(--spacing-xs);
  font-size: var(--font-size-body);
}

.btn--lg {
  padding: var(--spacing-2xs) var(--spacing-sm);
  font-size: var(--font-size-body);
}
```

### 2. Card

#### CSS Implementation
```css
.card {
  background-color: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-subtle);
  padding: var(--spacing-xs);
}

.card--elevated {
  box-shadow: var(--shadow-md);
}
```

### 3. Input

#### Variants
- Text Input
- Textarea
- Select

#### States
- Default
- Hover
- Focus
- Error
- Disabled

#### CSS Implementation
```css
.input {
  width: 100%;
  padding: var(--spacing-3xs);
  background-color: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-sm);
  color: var(--color-text-primary);
  font-family: var(--font-family-body);
  font-size: var(--font-size-body);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.input:hover {
  border-color: rgba(255, 255, 255, 0.2);
}

.input--error {
  border-color: var(--color-error);
}

.input--error:focus {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.input:disabled {
  background-color: color-mix(in srgb, var(--color-surface) 70%, black 30%);
  cursor: not-allowed;
  opacity: 0.6;
}
```

### 4. Typography

#### Headings
```css
.heading-1 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-heading);
  color: var(--color-text-primary);
}

.heading-2 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-heading);
  color: var(--color-text-primary);
}

.heading-3 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-heading);
  color: var(--color-text-primary);
}

.heading-4 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-heading);
  color: var(--color-text-primary);
}
```

#### Body Text
```css
.body-text {
  font-family: var(--font-family-body);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-body);
  color: var(--color-text-primary);
}

.body-text--secondary {
  color: var(--color-text-secondary);
}

.body-text--small {
  font-size: var(--font-size-small);
}

.body-text--caption {
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
}
```

### 5. Navigation

#### Header Navigation
```css
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-surface);
  padding: var(--spacing-3xs) var(--spacing-xs);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.nav__logo {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-decoration: none;
}

.nav__menu {
  display: flex;
  list-style: none;
  gap: var(--spacing-xs);
}

.nav__link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-family: var(--font-family-body);
  font-size: var(--font-size-body);
  padding: var(--spacing-4xs) var(--spacing-3xs);
  border-radius: var(--border-radius-sm);
  transition: all 0.2s ease;
}

.nav__link:hover,
.nav__link--active {
  color: var(--color-text-primary);
  background-color: rgba(255, 255, 255, 0.05);
}
```

### 6. Layout Components

#### Grid System
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-xs);
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-xs);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }
}

.col-span-1 { grid-column: span 1; }
.col-span-2 { grid-column: span 2; }
.col-span-3 { grid-column: span 3; }
.col-span-4 { grid-column: span 4; }
.col-span-5 { grid-column: span 5; }
.col-span-6 { grid-column: span 6; }
.col-span-7 { grid-column: span 7; }
.col-span-8 { grid-column: span 8; }
.col-span-9 { grid-column: span 9; }
.col-span-10 { grid-column: span 10; }
.col-span-11 { grid-column: span 11; }
.col-span-12 { grid-column: span 12; }

@media (max-width: 768px) {
  .col-span-1,
  .col-span-2,
  .col-span-3,
  .col-span-4,
  .col-span-5,
  .col-span-6,
  .col-span-7,
  .col-span-8,
  .col-span-9,
  .col-span-10,
  .col-span-11,
  .col-span-12 {
    grid-column: span 1;
  }
}
```

### 7. Utility Classes

```css
/* Spacing */
.m-0 { margin: 0; }
.m-1 { margin: var(--spacing-4xs); }
.m-2 { margin: var(--spacing-3xs); }
.m-3 { margin: var(--spacing-2xs); }
.m-4 { margin: var(--spacing-xs); }
.m-5 { margin: var(--spacing-sm); }
.m-6 { margin: var(--spacing-md); }

.p-0 { padding: 0; }
.p-1 { padding: var(--spacing-4xs); }
.p-2 { padding: var(--spacing-3xs); }
.p-3 { padding: var(--spacing-2xs); }
.p-4 { padding: var(--spacing-xs); }
.p-5 { padding: var(--spacing-sm); }
.p-6 { padding: var(--spacing-md); }

/* Text alignment */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

/* Display */
.d-block { display: block; }
.d-inline { display: inline; }
.d-flex { display: flex; }
.d-grid { display: grid; }
.d-none { display: none; }

/* Flexbox */
.flex-row { flex-direction: row; }
.flex-column { flex-direction: column; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.align-center { align-items: center; }
.align-start { align-items: flex-start; }
.align-end { align-items: flex-end; }

/* Visibility */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## Responsive Breakpoints

```css
/* Mobile first approach */
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

@media (min-width: 640px) {
  /* Small devices (landscape phones, 640px and up) */
}

@media (min-width: 768px) {
  /* Medium devices (tablets, 768px and up) */
}

@media (min-width: 1024px) {
  /* Large devices (desktops, 1024px and up) */
}

@media (min-width: 1280px) {
  /* Extra large devices (large desktops, 1280px and up) */
}
```

## Dark Mode Support

All components are designed with dark mode in mind. The color tokens ensure proper contrast and readability in low-light environments.

## Accessibility

All components follow WCAG 2.1 AA guidelines:
- Minimum 4.5:1 contrast ratio for normal text
- Focus indicators visible with keyboard navigation
- Semantic HTML structure
- ARIA attributes where appropriate
- Proper heading hierarchy

## Animation Guidelines

- Duration: 150-300ms for micro-interactions
- Easing: ease-out for entering, ease-in for exiting
- Reduced motion: Respect user preferences with media query

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```