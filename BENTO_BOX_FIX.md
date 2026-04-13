# Bento Box Background Bug Fix

## Root Cause
The white boxes in bento sections were turning black when navigating away and coming back. This was caused by **CSS specificity conflicts** where CSS class-based background colors were overriding Tailwind utility classes (`bg-white`, `bg-black`).

## Problem Sources

### 1. Services.js (Home Page)
The `features-card-wide` class had a hardcoded CSS background definition:
```css
.features-card-wide {
  background-color: var(--black);  /* #050505 */
}
```

But components were trying to override it with Tailwind utilities:
```jsx
className="features-card-wide bg-white"  // CSS class wins due to specificity
className="features-card-wide bg-black"  // Different utility, inconsistent styling
```

### 2. AboutTeam.js
Similar issue with:
```jsx
className="features-card-wide bg-[#F4A300]"  // Tailwind utility trying to override CSS class
```

## Solution Implemented
Replaced Tailwind utility classes with inline `style` props for explicit background color control:

### Services.js Changes
**Before:**
```jsx
className="features-card-wide bg-white"
className="features-card-wide bg-black"
```

**After:**
```jsx
className="features-card-wide"
style={{ cursor: isHovering ? 'none' : 'pointer', backgroundColor: '#ffffff' }}

className="features-card-wide"
style={{ cursor: isHovering ? 'none' : 'pointer', backgroundColor: '#050505' }}
```

### AboutTeam.js Changes
**Before:**
```jsx
className="features-card-wide bg-[#F4A300]"
```

**After:**
```jsx
className="features-card-wide"
style={{ backgroundColor: '#F4A300' }}
```

## Why This Works
- **Inline styles** have higher CSS specificity than class-based styles
- They persist across page navigation because they're part of the React component state
- Each component explicitly controls its own background color without relying on CSS cascading

## Other Components (No Changes Needed)
The following components correctly use CSS class modifiers and don't have the mixing issue:
- **CorporateServicesBento.js**: Uses `className="features-card-small background-light-gray"` pattern
- **ExperientialScopeBento.js**: Uses `background-primary`, `background-dark-gray` modifiers
- **MICEScopeBento.js**: Uses proper CSS class modifiers

These work correctly because they:
1. Don't mix Tailwind utilities with CSS classes
2. Use CSS modifier classes defined in their service.css files
3. Maintain consistent styling across navigation

## Testing
Navigate to:
1. Home page (Services section) - MICE & Events and Corporate Travel boxes
2. Go to MICE page
3. Go back to home - boxes should remain white and black (not all black)
4. Visit About page - "Long-term partnership value" box should be orange
5. Navigate around - colors should persist correctly
