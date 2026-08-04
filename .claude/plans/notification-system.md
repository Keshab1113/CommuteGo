# Notification System Implementation Plan

## Goal
Build a complete notification system for CommuteGo where:
1. Clicking the bell icon in the admin topbar opens a notifications dropdown.
2. Clicking a notification opens its detail view.
3. A dedicated notifications list page shows all notifications.
4. Website events (new destination, buddy, trip, feedback, user signup, approvals, etc.) automatically generate admin notifications.

## Backend Changes

### 1. New Model: `server/models/notification-model.js`
Schema fields:
- `title` (String, required)
- `message` (String, required)
- `type`: 'info' | 'success' | 'warning' | 'error'
- `entityType`: 'destination' | 'localBuddy' | 'trip' | 'feedback' | 'user' | 'review' | 'experience' | 'system'
- `entityId` (ObjectId, optional) — links to the related document
- `recipient` (ObjectId, optional) — for user-specific notifications; null means all admins
- `isRead` (Boolean, default false)
- `createdAt` (Date, default Date.now)

### 2. New Utility: `server/utils/notification-helper.js`
`createNotification(data)` helper to centralize notification creation.

### 3. New Controller & Router
- `server/controllers/notification-controller.js`
  - `getNotifications` — returns notifications for the authenticated admin/user with unread count.
  - `getNotificationById` — returns single notification and marks it read.
  - `markAsRead` — marks one notification read.
  - `markAllAsRead` — marks all notifications read.
  - `deleteNotification` — removes a notification.
- `server/router/notification-router.js` — CRUD routes protected by `authMiddleware`.

### 4. Hook Notifications into Existing Controllers
Call `createNotification` from:
- `createDestination` → "New destination submitted: {name}"
- `upsertBuddyProfile` (when creating new) → "New local buddy application: {displayName}"
- `createTrip` → "New trip created: {title}"
- `feedbackForm` → "New feedback received"
- `signup` → "New user registered: {username}"
- `reviewDestination` → approval/rejection notification
- `reviewBuddy` → approval/rejection notification
- `reviewTrip` → approval/rejection notification
- `deleteUserById`, `deleteDestination`, etc. → deletion notifications

### 5. Register Router
Add `app.use("/api/notifications", notificationRoute)` in `server/server.js`.

## Frontend Changes

### 1. New API Module
Add `notificationsApi` to `client/src/services/api/adminApi.js` with endpoints for list, get by id, mark read, mark all read, delete.

### 2. New Notification Context
`client/src/context/NotificationContext.jsx`:
- Polls `/api/notifications` every 30 seconds.
- Provides `notifications`, `unreadCount`, `markAsRead`, `markAllAsRead`, `refetch`.
- Wraps the app in `main.jsx`.

### 3. Update `AdminTopbar.jsx`
- Replace static bell badge with a dropdown trigger.
- Render a `NotificationDropdown` on click showing recent notifications with unread indicators.
- Clicking a notification navigates to `/admin/notifications/:id` and marks it read.
- Add a "View all" link to `/admin/notifications`.

### 4. New Components/Pages
- `client/src/pages/AdminPages/AdminNotifications/AdminNotifications.jsx` — full notifications list with filters (All / Unread), mark-all-read, delete, and click-to-detail.
- `client/src/pages/AdminPages/AdminNotifications/NotificationDetail.jsx` — detail view with entity link, timestamp, and mark-as-read action.

### 5. Routes
Add in `client/src/main.jsx`:
- `/admin/notifications` → `AdminNotifications`
- `/admin/notifications/:id` → `NotificationDetail`

## Trade-offs
- **Polling vs WebSockets**: Using polling (30s) to avoid adding Socket.io dependency and complexity. Can be upgraded later.
- **Admin-only for now**: Notifications are created for admin actions. User-specific notifications can be added later by filling the `recipient` field.
- **No email coupling**: These are in-app notifications only.

## Files to Edit
- New: `server/models/notification-model.js`, `server/utils/notification-helper.js`, `server/controllers/notification-controller.js`, `server/router/notification-router.js`, `client/src/context/NotificationContext.jsx`, `client/src/pages/AdminPages/AdminNotifications/AdminNotifications.jsx`, `client/src/pages/AdminPages/AdminNotifications/NotificationDetail.jsx`
- Modify: `server/server.js`, `server/controllers/destination-controller.js`, `server/controllers/local-buddy-controller.js`, `server/controllers/trip-controller.js`, `server/controllers/feedback-controller.js`, `server/controllers/auth-controller.js`, `server/controllers/admin-controller.js`, `server/controllers/experience-controller.js`, `server/controllers/review-controller.js`, `client/src/services/api/adminApi.js`, `client/src/component/AdminComponents/AdminTopbar.jsx`, `client/src/main.jsx`

## Verification
- `npm run build` succeeds.
- `node --check` passes on new server files.
- Backend starts without errors.
