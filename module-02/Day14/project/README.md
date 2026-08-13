# ethio telecom - Account Dashboard

## Interface Rebuilt
ethio telecom customer account dashboard

## Grid Usage
- Page skeleton with `grid-template-areas`: header, sidebar, main, footer
- Stats cards grid with `repeat(auto-fit, minmax(200px, 1fr))`
- Service cards grid with `repeat(auto-fit, minmax(230px, 1fr))`

## Flexbox Usage
- Header: logo left, nav center, user info right with `space-between`
- Toolbar: title left, controls right
- Footer: copyright left, links right

## CSS Techniques Used
- ✅ Grid page skeleton with named areas
- ✅ Responsive grid collapse to one column (media query)
- ✅ Flexbox header with `justify-content: space-between`
- ✅ `repeat(auto-fit, minmax())` for self-responsive card grids
- ✅ Sticky header with `position: sticky`
- ✅ Absolutely positioned badges on service cards
- ✅ Relative parent for absolute positioning
- ✅ CSS variables not required but kept clean