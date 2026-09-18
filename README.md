# Rest Countries API

A React-based country explorer built around the [REST Countries API](https://restcountries.com/).

The application allows users to explore countries, search by name, filter by region, inspect detailed country information, navigate between neighboring countries, and switch between light and dark themes.

The project has been rebuilt around a feature-oriented architecture with reusable hooks, explicit UI behavior, accessibility-focused interactions, and automated tests.

## Live Demo

[Open the live application](https://restrountriesapi.vercel.app/)

## Features

* Browse countries in a responsive grid
* Search countries by name
* Filter countries by region
* Combine search and region filters
* Open a dedicated country details view
* Navigate between border countries
* Restore focus to the previously selected country
* Keyboard-friendly country selection
* Keyboard navigation for the custom region selector
* Accessible names and state attributes for interactive controls
* Light and dark theme switching
* Responsive layout
* Empty-state handling when no countries match the current filters

## Architecture

The project uses a feature-oriented structure rather than organizing the application as a collection of unrelated UI files.

```text
src/
├── app/
│   ├── App.jsx
│   ├── App.test.jsx
│   └── styles/
│
├── data/
│   └── data.json
│
├── features/
│   └── countries/
│       ├── api/
│       │   └── CountriesApi.js
│       │
│       ├── hooks/
│       │   ├── useCountryFocusRestore.js
│       │   ├── useCountryFocusRestore.test.jsx
│       │   └── useFocusOnMount.js
│       │
│       ├── model/
│       │   ├── useCountries.js
│       │   └── useCountries.test.js
│       │
│       └── ui/
│           ├── Controls.jsx
│           ├── Controls.test.jsx
│           ├── CountryDetail.jsx
│           ├── CountryDetail.test.jsx
│           ├── CountryGrid.jsx
│           └── CountryGrid.test.jsx
│
├── hooks/
│   ├── useClickOutside.js
│   ├── useClickOutside.test.jsx
│   ├── useFocusOnKey.js
│   ├── useFocusOnKey.test.jsx
│   ├── useFocusOutside.js
│   └── useFocusOutside.test.jsx
│
└── shared/
    └── lib/
        ├── format.js
        ├── format.test.js
        └── strings.jsx
```

### Architectural principles

The current structure separates the main responsibilities of the application:

* **App** — application composition and high-level state flow
* **API** — country data access
* **Model** — country filtering and selection logic
* **UI** — user-facing country controls, grid, and detail views
* **Hooks** — reusable interaction and focus behavior
* **Shared** — small reusable formatting and string utilities
* **Tests** — colocated with the behavior they protect

The architecture was intentionally rebuilt to make responsibilities easier to understand, test, and evolve.

## Accessibility

Accessibility is treated as part of the application's behavior rather than as a collection of ARIA attributes.

The application includes:

* Semantic buttons and lists
* Accessible names for country selection controls
* Keyboard activation using native button behavior
* Keyboard navigation for the custom region selector
* `aria-expanded` state for the region selector
* `aria-selected` state for region options
* Focus management when entering country details
* Focus restoration when returning to the country grid
* A heading-based focus target that communicates the newly displayed page context

The country grid intentionally keeps native browser navigation rather than implementing a custom roving grid-navigation model. Users can scan the visual collection naturally and move between country buttons with standard keyboard navigation.

## Testing

The project uses:

* [Vitest](https://vitest.dev/)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
* [Testing Library User Event](https://testing-library.com/docs/user-event/intro/)
* [jest-dom](https://github.com/testing-library/jest-dom)
* JSDOM

The test suite contains **65 automated tests across 10 test files**.

The tests focus on observable application behavior rather than implementation details.

### Tested behavior includes

* Country filtering
* Region filtering
* Combined filters
* Country selection
* Country detail rendering
* Border-country navigation
* Empty states
* Search interaction
* Custom region-selector keyboard behavior
* Focus management
* Focus restoration
* Outside-click behavior
* Outside-focus behavior
* Keyboard shortcuts
* Formatting utilities
* Theme switching
* Application-level navigation

The testing process was based on identifying public behavior first, then protecting the behaviors that matter to users.

## Tech Stack

* React
* JavaScript (ES6+)
* CSS
* Vitest
* React Testing Library
* JSDOM
* Vite/Vitest configuration
* Create React App toolchain

## Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm
* Git

### Installation

Clone the repository:

```bash
git clone https://github.com/a-sayed123/Rest_Countries_API.git
```

Move into the project directory:

```bash
cd Rest_Countries_API
```

Install dependencies:

```bash
npm install
```

### Start the development server

```bash
npm start
```

The application will be available through the local development server.

## Running Tests

Run the test suite:

```bash
npm test
```

For a single non-watch run:

```bash
npm test -- --run
```

## Production Build

Create an optimized production build:

```bash
npm run build
```

The generated production files are placed in the `build/` directory.

## Available Scripts

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `npm start`         | Starts the development server             |
| `npm test`          | Runs Vitest in watch mode                 |
| `npm test -- --run` | Runs the complete test suite once         |
| `npm run build`     | Creates an optimized production build     |
| `npm run eject`     | Ejects the Create React App configuration |

## Project Status

The project has completed a major architecture refactor and currently has a stable tested baseline.

The current baseline includes:

* Feature-oriented project structure
* Extracted reusable hooks
* Component and hook tests
* Application-level tests
* Keyboard and focus behavior
* Accessibility-focused interaction testing
* Production build verification
* Clean Git history for the architecture release

Further development can build on this baseline without treating the current architecture as the final form of the application.

## Repository

[GitHub Repository](https://ahmed-rest-countries.vercel.app/)

## Acknowledgements

This project was originally built around the Frontend Mentor REST Countries challenge and was subsequently developed into a more structured React application with an emphasis on architecture, testing, accessibility, and maintainability.

## License

No license has been declared for this repository yet.
