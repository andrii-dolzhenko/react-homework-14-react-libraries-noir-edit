# React Homework 14 — React Libraries

A React application created to demonstrate practical integration of specialized React libraries in an existing project.

The **NOIR / EDIT** project is a responsive editorial product catalogue with search, filtering, sorting, favorites, product details, routing, and session activity tracking.

Homework 14 extends the project with the three required libraries:

- `react-icons`
- `react-toastify`
- `react-idle-timer`

Each library is integrated into real application flows rather than shown as an isolated demo.

## Homework Goal

The goal of this homework is to extend a React application with specialized libraries and demonstrate how they solve concrete UI and UX tasks.

In NOIR / EDIT:

- **React Icons** provides reusable interface icons
- **React Toastify** provides feedback for user actions and session state changes
- **React Idle Timer** tracks inactivity and demonstrates an active / idle session lifecycle

The existing catalogue functionality remains available while the new libraries are integrated into the same visual system.

## React Icons

`react-icons` is used for interface controls and status indicators throughout the application.

Examples include:

- search icon
- reset icon
- empty and filled favorite hearts
- product modal close icon
- editorial close icon
- CTA arrows
- session activity icon
- session countdown clock
- session reset icon

Only the icons used by the interface are imported.

## React Toastify

`react-toastify` is used to provide immediate feedback without interrupting the shopping flow.

Toast notifications are displayed when:

- a product is saved to the edit
- a product is removed from the edit
- collection filters are reset
- the session becomes idle
- the user becomes active again
- the session timer is manually reset

The `ToastContainer` is configured globally with:

- top-right positioning
- automatic close after 2.6 seconds
- newest notification on top
- click-to-close behavior
- pause on hover
- dark theme

Toast styles are customized to match the monochrome NOIR / EDIT interface, including icons, close controls, borders, and progress indicators.

## React Idle Timer

`react-idle-timer` powers the **Session Activity** section.

The session demo uses a deliberately short **20-second timeout** so the behavior can be verified quickly during homework review.

The implementation uses:

- `useIdleTimer`
- `timeout: 20000`
- `throttle: 500`
- `onIdle`
- `onActive`
- `getRemainingTime`
- `reset`

### Session Activity

The Session Activity interface displays:

- current session state — **Active** or **Idle**
- remaining time in seconds
- visual countdown progress
- manual **Reset timer** action
- explanatory text describing the interaction

When the user stays inactive for 20 seconds:

1. the countdown reaches `0s`
2. the session changes to **Idle**
3. the progress indicator becomes empty
4. a warning toast reports that the session was paused

When the user interacts with the page again:

1. the session changes back to **Active**
2. the idle timer restarts
3. a success toast reports that the session was resumed

Pointer, keyboard, and scroll activity are tracked automatically by the idle timer.

## Features

- Displays a curated collection of 12 products across five categories
- Provides live search by product name, category, and material
- Filters products by category
- Supports an **In stock only** availability filter
- Provides sorting by:
  - Newest
  - Name
  - Price — low to high
  - Price — high to low
- Uses a custom accessible dropdown instead of a native `<select>`
- Allows all active filters to be reset
- Shows a Toastify notification when filters are reset
- Displays a dedicated empty state when no products match the current selection
- Calculates dynamic collection statistics:
  - visible pieces
  - products in stock
  - saved products
  - average price
- Supports adding and removing products from favorites
- Synchronizes favorite state between product cards and the product modal
- Shows toast feedback for favorite actions
- Displays availability status for unavailable products
- Opens detailed product information in a modal rendered through a React portal
- Supports modal closing by close button, backdrop click, and `Escape`
- Locks page scrolling while the product modal is open
- Moves focus to the modal close button when the modal opens
- Includes responsive desktop and mobile navigation
- Supports category filtering from the header and footer
- Uses smooth scrolling to navigate to the collection and editorial sections
- Includes a responsive hero section with the **Explore the collection** CTA
- Includes an editorial section with the **Discover the edit** action and expandable journal content
- Includes the dedicated **Session Activity** section
- Includes hover, focus, active, and reduced-motion states for interactive elements
- Includes a custom responsive 404 page
- Provides navigation from the 404 page back home, to the collection, or to the previous page
- Uses responsive layouts for desktop, tablet, and mobile screens
- Uses WebP image assets
- Prioritizes important above-the-fold imagery
- Uses lazy loading for non-critical images
- Includes semantic HTML, ARIA attributes, keyboard interaction, and visible focus states
- Supports `prefers-reduced-motion`

## Product Collection

The catalogue contains products in the following categories:

- Bags
- Eyewear
- Watches
- Accessories
- Footwear

Product data includes:

- name
- category
- material
- price
- collection year
- availability
- image
- description
- hardware
- dimensions
- weight

Each product card displays the primary catalogue information and provides access to the detailed product view.

## Search, Filters and Sorting

Search matches product:

- name
- category
- material

Available collection controls include:

- category selection
- **In stock only** filter
- sorting by newest, name, and price
- reset action

All controls can be combined, and the collection statistics update together with the visible results.

Resetting the filters also triggers an informational Toastify notification.

## Favorites

Products can be added to or removed from favorites from both the product card and the product modal.

Favorite state is reflected through:

- React Icons heart state
- `aria-pressed`
- modal action state
- dynamic **Saved** collection statistic
- Toastify feedback

Saving a product uses a success toast, while removing it uses an informational toast.

## Product Modal

The product modal displays detailed information for the selected product, including:

- image
- category
- product name
- price
- description
- material
- hardware
- dimensions
- collection year
- availability
- favorite state

The modal uses:

- `createPortal`
- `role="dialog"`
- `aria-modal`
- accessible labels
- React Icons controls
- `Escape` key handling
- backdrop closing
- body scroll locking
- automatic focus management

## Navigation and Routing

Routing is implemented with `react-router-dom`.

Routes:

- `/` — main application
- `*` — custom 404 page

Header and footer navigation can change the active product category and smoothly scroll to the collection.

Editorial navigation smoothly scrolls to the editorial section.

The 404 page includes:

- Return home
- Continue shopping
- Back to previous page
- category navigation

`Continue shopping` returns to the home route and scrolls directly to the collection.

## Responsive Design

The interface adapts to wide desktop, desktop, tablet, and mobile layouts.

Responsive behavior includes:

- desktop and mobile navigation
- adaptive hero layout
- responsive product grid
- adaptive collection controls
- responsive statistics
- responsive product modal
- responsive editorial section
- responsive Session Activity layout
- responsive footer
- responsive 404 page

The Session Activity intro uses the available width on wide desktop screens while retaining a more compact reading width on smaller layouts.

## Accessibility

Accessibility-related implementation includes:

- semantic HTML
- accessible navigation labels
- `aria-expanded`
- `aria-pressed`
- `aria-live`
- `aria-modal`
- progress bar semantics with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`
- meaningful image alternative text
- decorative icon handling with `aria-hidden`
- keyboard `Escape` support
- visible focus states
- modal focus management
- form control identifiers and names
- reduced-motion support

## Performance and Image Loading

The project keeps the performance improvements introduced in the previous React homework while focusing the visible HW-14 interface on practical libraries.

Performance-related implementation includes:

- `useMemo` for filtered and sorted product data
- `useMemo` for collection statistics
- `useCallback` for stable callbacks
- `React.memo` for product cards
- WebP image assets
- prioritized hero and above-the-fold imagery
- eager loading for initial product imagery
- lazy loading for non-critical imagery
- no unnecessary preload for route-specific 404 artwork

## Installation

```bash
git clone https://github.com/andrii-dolzhenko/react-homework-14-react-libraries-noir-edit.git
cd react-homework-14-react-libraries-noir-edit
npm install
```

## Run the Application

```bash
npm run dev
```

## Code Quality

Run Oxlint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Current local checks:

- Oxlint — `0 warnings, 0 errors`
- Vite production build — successful
- HTML validation — passed without errors
- CSS validation — passed without errors

## Tech Stack

- React 19
- React DOM
- React Router
- React Icons
- React Toastify
- React Idle Timer
- Vite
- JavaScript
- CSS
- Oxlint
- HTML5

## Project Structure

```text
src/
├── assets/
│   ├── editorial/
│   ├── hero/
│   └── products/
├── components/
│   ├── CollectionStats.jsx
│   ├── CollectionToolbar.jsx
│   ├── CustomSelect.jsx
│   ├── EditorialSection.jsx
│   ├── EmptyState.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── ProductModal.jsx
│   └── SessionActivity.jsx
├── data/
│   └── products.js
├── pages/
│   ├── HomePage.jsx
│   └── NotFoundPage.jsx
├── utils/
│   ├── calculateCollectionStats.js
│   └── filterAndSortProducts.js
├── App.jsx
├── index.css
└── main.jsx
```

## Links

Repository:

https://github.com/andrii-dolzhenko/react-homework-14-react-libraries-noir-edit

Live Demo:

https://react-homework-14-react-libraries-n.vercel.app/

GitHub Pages:

https://andrii-dolzhenko.github.io/react-homework-14-react-libraries-noir-edit/

## Author

© 2026 Andrii Dolzhenko. All Rights Reserved.
