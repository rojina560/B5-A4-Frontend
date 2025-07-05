# Library Management System - Frontend 

This is the frontend of a minimal Library Management System built with React, TypeScript, Redux Toolkit Query, and Tailwind CSS, featuring elegant UI components from Shadcn UI. All core actions—add, edit, delete, and borrow—are implemented using responsive modals, creating a smooth and intuitive single-page experience.

Forms are handled with React Hook Form, and data fetching is managed through RTK Query for efficient, scalable state management. Sonner is used for lightweight and customizable toast notifications, providing real-time feedback on user actions. The interface is fully responsive and designed to be clean, maintainable. 

# Library Management System - Features Overview

## Home Page
- Displays a **banner** and a **button** redirecting to the **All Books** page.
- Showcases **recently added books**.
- Clicking **“View Details”** on a book redirects to the **Book Details** page.

---

## All Books Page
- Displays **all books** in card format.
- Books are shown in **descending order (most recent first)**.
- Implements **pagination** (12 books per page).
- Each book card includes action buttons:
  - **Borrow Book** → Opens confirmation modal.
  - **Update Book** → Opens editable modal with pre-filled values.
  - **Delete Book** → Opens delete confirmation modal.
  - **View Details** → Navigates to the book's detailed view.
- Automatically reflects **available/unavailable status** based on `copies` count.

---

## Add Book Page
- Displays a modal form upon clicking **Add**.
- Form validations:
  - All fields are **required** except `description` and `available` checkbox.
  - Must have **minimum 1 copy** to add.
- On success:
  - Shows **success toast**.
  - Redirects to **All Books** page.
- On failure:
  - Shows **error toast**.

---

## Delete Book Modal
- Triggered by clicking the **Delete** button.
- Displays a confirmation modal.
- Upon confirmation:
  - Deletes book from the database.
  - Removes the book from the UI.
  - Shows **success toast**.

---

## Update Book Modal
- Opens a **modal with pre-filled values**.
- **Update button** only enabled if any field changes.
- On success:
  - Updates the book in the database.
  - Shows **success toast**.
- On failure:
  - Shows **error toast**.
- If `copies` is updated to **0**:
  - Automatically sets `available` status to **false**.

---

## Borrow Book Modal
- Triggered by **Borrow** button.
- Contains:
  - A field to enter number of copies to borrow.
  - A **date picker** for return date.
- Validations:
  - Cannot borrow more copies than available.
- On success:
  - Shows **success toast**.

---

## Borrow Summary Page
- Displays all **borrowed books summary**.
- Uses **aggregation** to show detailed insights.

#### All the actions brings changes to ui instantly with the help of redux. 


## Installation & Setup

### Prerequisites

- Node.js 
- npm 

### 1. Clone the Frontend Repository

```bash
git clone https://github.com/Sazid60/B5-A4-Frontend.git
```

### 2. Go Inside The File 

```bash
cd B5-A4-Frontend
```

### 3. Install The Dependencies 

```bash
npm install 
```
### 3. Run The Project

```bash
npm run dev  
```


### Folder Structure 
```
├─ .gitignore
├─ README.md
├─ components.json
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ Banner.jpg
│  ├─ Banner2.jpg
│  ├─ DummyBook.jpg
│  ├─ logo.jpg
│  ├─ logo.png
│  └─ vite.svg
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ book-circles-logo-by-Vexels.svg
│  │  ├─ logo.png
│  │  └─ react.svg
│  ├─ components
│  │  └─ ui
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ dialog.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ form.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ select.tsx
│  │     ├─ sonner.tsx
│  │     └─ textarea.tsx
│  ├─ elements
│  │  ├─ individuals
│  │  │  ├─ allBooks
│  │  │  │  └─ AllBookCard.tsx
│  │  │  └─ home
│  │  │     ├─ BannerElement.tsx
│  │  │     └─ HomeBookCard.tsx
│  │  ├─ modals
│  │  │  ├─ AddBookModal.tsx
│  │  │  ├─ BorrowModal.tsx
│  │  │  ├─ DeleteBookModal.tsx
│  │  │  └─ UpdateBookModal.tsx
│  │  └─ shared
│  │     ├─ Footer.tsx
│  │     └─ Navbar.tsx
│  ├─ index.css
│  ├─ layouts
│  │  ├─ MainContainer.tsx
│  │  └─ MainLayout.tsx
│  ├─ lib
│  │  └─ utils.ts
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ AddBookPage.tsx
│  │  ├─ AllBooksPage.tsx
│  │  ├─ BorrowSummaryPage.tsx
│  │  ├─ ErrorPage.tsx
│  │  ├─ HomePage.tsx
│  │  └─ SingleBook.tsx
│  ├─ redux
│  │  ├─ api
│  │  │  └─ baseApi.ts
│  │  ├─ features
│  │  │  └─ modalState
│  │  │     └─ modalState.ts
│  │  ├─ hooks.ts
│  │  └─ store.ts
│  ├─ routes
│  │  └─ index.tsx
│  ├─ types
│  │  └─ types.ts
│  ├─ utils
│  │  └─ HelperFunctions.ts
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vercel.json
└─ vite.config.ts
```
