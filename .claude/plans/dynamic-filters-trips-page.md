# Dynamic Filters + Public Trips Listing Page Plan

## Goal
1. Replace hardcoded filters on `/hidden-destinations` and `/local-buddies` with filters derived from actual database values.
2. Build a new public all-trips listing page similar to `/local-buddies` so users can browse all trips.

## Backend Changes

### 1. New utility endpoints for filter metadata
- `GET /api/destinations/filters` — returns unique `tags`, `categories`, and `difficulty` values from the database.
- `GET /api/local-buddies/filters` — returns unique `interests` and cities from the database.
- `GET /api/trips/filters` — returns unique `interests`, destinations, and budget ranges from the database.

### 2. Update controllers
- Add `getDestinationFilters` in `server/controllers/destination-controller.js`.
- Add `getBuddyFilters` in `server/controllers/local-buddy-controller.js`.
- Add `getTripFilters` in `server/controllers/trip-controller.js`.

### 3. Update routers
- Expose new routes in `destination-router.js`, `local-buddy-router.js`, and `trip-router.js`.

### 4. Trip listing endpoint
- The existing `GET /api/trips` already returns approved trips with pagination; it can be reused for the new public trips page.

## Frontend Changes

### 1. `/hidden-destinations`
- Fetch dynamic filter metadata from `/api/destinations/filters`.
- Render category filter chips from real `tags`.
- Difficulty dropdown from real `difficulty` values.
- Keep budget ranges (low/medium/high) as a UX convenience, but allow optional backend budget filtering if needed.
- Apply tag filter by checking actual `destination.tags`.

### 2. `/local-buddies`
- Fetch dynamic filter metadata from `/api/local-buddies/filters`.
- Render interest chips from real `interests`.
- Render location chips from real cities.
- Show all cities that have buddies, dynamically.

### 3. New `/trips` page
- Create `client/src/pages/Trips.jsx`.
- Fetch trips from `/api/trips?limit=50`.
- Fetch filter metadata from `/api/trips/filters`.
- Display trips in a grid with search and dynamic filters (interests, destination, budget ranges).
- Add route `/trips` in `main.jsx` and a nav link/button in `TravelMatchmaking.jsx` to browse all trips.

## Files to Edit / Create
- Modify: `server/controllers/destination-controller.js`, `server/controllers/local-buddy-controller.js`, `server/controllers/trip-controller.js`, `server/router/destination-router.js`, `server/router/local-buddy-router.js`, `server/router/trip-router.js`.
- Modify: `client/src/pages/HiddenDestinations.jsx`, `client/src/pages/LocalBuddies.jsx`, `client/src/pages/TravelMatchmaking.jsx`, `client/src/main.jsx`.
- Create: `client/src/pages/Trips.jsx`.

## Verification
- `npm run build` passes.
- `node --check` passes on modified server files.
- Filters reflect real database values and handle empty states.
