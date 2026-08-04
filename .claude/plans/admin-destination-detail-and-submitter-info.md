# Admin Destination Detail Page + Submitter Contact Info Plan

## Goal
1. Build a full admin destination detail/edit page where clicking any destination row opens a page to view, edit, approve/reject, delete, add images/blog/notes, and ask the submitting user questions.
2. Collect submitter name, email, and phone when a user submits a destination via `/add-destination`.

## Backend Changes

### 1. Extend destination model (`server/models/destination-model.js`)
Add fields:
- `submitter: { name, email, phone }` — required when `submittedBy === 'user'`.
- `blogContent: String` — rich/long-form content about the destination.
- `adminNotes: String` — internal/admin-only notes.
- `additionalDetails: String` — extra details added by admin.

### 2. Update destination controller (`server/controllers/destination-controller.js`)
- `createDestination`: capture `submitter` from `req.body` (the public submission route). Keep `createdBy` as null for user submissions.
- `updateDestination`: allow admin to update all new fields plus existing fields.
- `reviewDestination`: when approved/rejected, also notify the submitter by email if available (notification with `recipient` = submitter? we don't have a user account for them). Instead, keep status notification admin-wide as today.
- Add `askSubmitter`: create a direct conversation between the admin and the registered user if `createdBy` exists, then send the admin's question as a message. Return the conversation.

### 3. New admin-only endpoint for asking the submitter
Add route in `server/router/destination-router.js`:
- `POST /admin/:id/ask` (auth + admin): body `{ message }`. Controller creates/finds a direct conversation between admin and destination's `createdBy` user and posts the message using existing `Message`/`Conversation` models.

### 4. Update `getDestinationById` / admin detail fetch
The existing public `GET /destinations/:id` returns full document (including new submitter fields). The detail page can reuse `destinationsApi.getById(id)`; the admin page will use the same endpoint. No separate admin endpoint needed because admin token already works and model returns all fields.

## Frontend Changes

### 1. Update `/add-destination` submission form (`client/src/pages/AddDestination.jsx`)
- Add a "Your Contact Details" section (only shown for user submissions; this page always submits as `submittedBy: 'user'`):
  - Name (required)
  - Email (required, basic validation)
  - Phone (required)
- Include `submitter: { name, email, phone }` in the POST body.
- Validate that all three fields are filled before final submit.

### 2. Create new admin detail page (`client/src/pages/AdminPages/AdminDestinationDetail.jsx`)
Features:
- Fetch destination with `destinationsApi.getById(id)`.
- View mode: show all fields including images gallery, submitter info, status badge, created dates.
- Edit mode toggle: switch to form editing all fields.
- Form fields: name, location name, description, difficulty, estimated budget, safety score, crowd level, time required, category, best season, tags, images, videos, transport details, nearby hospitals, local cuisine, photography spots, internet availability, blog content, admin notes, additional details.
- Actions:
  - **Save**: call `destinationsApi.update(id, data)`.
  - **Approve/Reject**: call `destinationsApi.review(id, { status })`.
  - **Delete**: confirm dialog, then `destinationsApi.delete(id)` and navigate back.
- **Submitter Q&A section**: if `createdBy` exists (registered user), show a textarea + "Ask Question" button that posts to new `POST /api/destinations/admin/:id/ask`. On success, show toast and clear textarea.
- **Image gallery**: list current images with delete buttons + input to add more image URLs.
- Styling follows existing admin pages: dark `bg-[#0a0a0a]`, `rounded-3xl bg-[#1C1B1B]`, gradient buttons.

### 3. Link admin destinations list to detail page
Update `client/src/pages/AdminPages/AdminDestinations.jsx`:
- Make the destination name/image row clickable, navigating to `/admin/destinations/${dest._id}`.
- Keep approve/reject/delete quick actions in the table, but add an "Open"/"View" button.

### 4. Register route
Update `client/src/main.jsx`:
- Add import for `AdminDestinationDetail`.
- Add nested admin route `path='destinations/:id' element={<AdminDestinationDetail />}`.

### 5. API helpers
Update `client/src/services/api/adminApi.js`:
- Add `askSubmitter: (id, data) => apiClient.post(`/destinations/admin/${id}/ask`, data)` inside `destinationsApi`.

## Files to Edit / Create
- Modify: `server/models/destination-model.js`.
- Modify: `server/controllers/destination-controller.js`.
- Modify: `server/router/destination-router.js`.
- Modify: `client/src/pages/AddDestination.jsx`.
- Modify: `client/src/pages/AdminPages/AdminDestinations.jsx`.
- Modify: `client/src/services/api/adminApi.js`.
- Modify: `client/src/main.jsx`.
- Create: `client/src/pages/AdminPages/AdminDestinationDetail.jsx`.

## Verification
- `npm run build` passes.
- `node --check` passes on modified server files.
- Admin can click a destination and open the detail page.
- Admin can edit and save destination details, approve/reject, and delete.
- Admin can ask a registered submitter a question and a conversation + message is created.
- User submission form requires name, email, phone and stores them.
