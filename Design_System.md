# FocusFrame Design System

## Product Type
FocusFrame is a productivity tool designed to help users manage their focus time and eliminate distractions.

## Style Selection
Modern Minimalism with Dark Mode Support

### Reasoning
- **Product Type**: Productivity tool for focus management
- **Target Audience**: Professionals, students, and anyone seeking to improve their focus
- **Style Match**: Minimalism aligns with the core concept of eliminating distractions
- **Dark Mode**: Reduces eye strain during extended focus sessions

## Color Palette

### Primary Colors
- Primary: #6366F1 (Indigo) - For primary actions and key elements
- Secondary: #8B5CF6 (Violet) - For secondary actions and accents
- Background: #0F172A (Dark Blue Gray) - Primary dark background
- Surface: #1E293B (Slate) - Card and component backgrounds
- Text: #F1F5F9 (Light Gray) - Primary text
- Text Secondary: #94A3B8 (Muted Blue Gray) - Secondary text

### Semantic Colors
- Success: #10B981 (Emerald) - For positive feedback and completed tasks
- Warning: #F59E0B (Amber) - For warnings and time-sensitive items
- Error: #EF4444 (Red) - For errors and critical alerts
- Info: #3B82F6 (Blue) - For informational messages

## Typography

### Font Pairing
- Headings: Space Grotesk (Modern sans-serif with geometric qualities)
- Body: Inter (Highly readable, optimized for UI)

### Type Scale
- H1: 3rem (48px) - Bold
- H2: 2.25rem (36px) - Bold
- H3: 1.5rem (24px) - Semi-bold
- H4: 1.25rem (20px) - Semi-bold
- Body: 1rem (16px) - Regular
- Small: 0.875rem (14px) - Regular
- Caption: 0.75rem (12px) - Regular

## Spacing System
Based on 8dp incremental spacing system:
- 4px (0.25rem)
- 8px (0.5rem)
- 12px (0.75rem)
- 16px (1rem)
- 24px (1.5rem)
- 32px (2rem)
- 40px (2.5rem)
- 48px (3rem)
- 64px (4rem)

## Effects & Shadows
- Elevation scale: 0, 1, 2, 4, 8, 16 dp
- Shadow values: 
  - Subtle: 0 1px 2px rgba(0, 0, 0, 0.1)
  - Medium: 0 4px 6px rgba(0, 0, 0, 0.1)
  - Strong: 0 10px 15px rgba(0, 0, 0, 0.1)

## Border Radius
- Small: 4px
- Medium: 8px
- Large: 16px
- Full: 9999px (for pills and circular elements)

## Animation Principles
- Duration: 150-300ms for micro-interactions
- Easing: ease-out for entering, ease-in for exiting
- Motion: Should convey meaning and provide feedback
- Reduced Motion: Respect user preferences for motion reduction

## Component Specifications

### Button
| State | Background | Text | Border | Shadow |
|-------|------------|------|--------|--------|
| Default | Primary color | White | None | Subtle |
| Hover | Primary color + 10% lightness | White | None | Medium |
| Active | Primary color + 20% lightness | White | None | None |
| Disabled | Surface color | Text Secondary | None | None |

### Card
| Property | Value |
|----------|-------|
| Background | Surface |
| Border | 1px solid rgba(255, 255, 255, 0.05) |
| Border Radius | Medium |
| Shadow | Subtle |
| Padding | 24px |

### Input Fields
| State | Background | Text | Border | Focus Ring |
|-------|------------|------|--------|------------|
| Default | Surface | Text | 1px solid rgba(255, 255, 255, 0.1) | Primary color |
| Hover | Surface | Text | 1px solid rgba(255, 255, 255, 0.2) | None |
| Focus | Surface | Text | 1px solid Primary color | Primary color |
| Error | Surface | Text | 1px solid Error color | Error color |

## Layout Guidelines
- Mobile-first approach with breakpoints at 640px, 768px, 1024px, and 1280px
- Max content width: 1200px for large screens
- Consistent padding: 16px on mobile, 24px on tablet, 32px on desktop
- Grid system: 12-column flexible grid

## Accessibility
- Minimum contrast ratio: 4.5:1 for normal text
- Focus indicators: 2px outline with primary color
- Semantic HTML structure with proper heading hierarchy
- ARIA labels for icon-only buttons
- Keyboard navigation support

## Dark Mode Considerations
- All colors defined with appropriate contrast for dark backgrounds
- Reduced blue light in UI elements to minimize eye strain
- Consistent elevation system using opacity and subtle shadows
- Text readability maintained with appropriate contrast ratios

## Anti-Patterns to Avoid
- Overly complex visual elements that distract from core functionality
- Excessive animations that interrupt focus
- Low contrast text that strains the eyes
- Inconsistent spacing and alignment
- Too many competing visual elements on a single screen