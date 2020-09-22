# Penn Labs Frontend Challenge Submission for Fall 2020

---

### Running This Project

-   `git clone` from this repo
-   `npm install`
-   then `npm run start`

---

### General structure

```
public/
  index.html           Root HTML file for each page

src/                   Where the JS logic is
  components/          Contains all React components
    Cart.js            Component for the course cart
    CartFAB.js         Component for the FAB in mobile view
    Container.js       Utility for setting max-width and centering page content, for large screens
    Course.js          Course cards
    MiniCourse.js      Smaller course cards
    FilterBox.js       The search field
    Modal.js           Modal component
    CourseModalContent.js The content rendered in a Modal component for displaying courses
    Nav.js             Component for the navbar

  data/                Contains data rendered by the components
    courses.json       Contains information on CIS courses at Penn
  store/
    atoms.js           recoil atoms
    selectors.js       recoil selectors
  utils/
    hooks.js           react hooks used in multiple components
    pennlabs-api.js    fetch API wrapper for PennLabs API
    utils.js           some utils(for url parsing)
  routes/
    Home.js            home page
    Receipt.js         receipt page

  App.css              CSS for the app
  App.js               Root component for the app
  index.js             Renders the React app
```

---

### Features

-   It's a PWA! You can install it on your iOS/Android/Chrome devices
-   Search & Sort
-   Share cart with others using links
-   Edit saved cart from link
-   Dark Mode

---

### Technologies Used

-   link-module-alias: for easier imports
-   react-router-dom: router
-   react-transition-group: animations for modal,cart and route transitions
-   react-responsive: to provide better mobile experience
-   react-loading-skeleton: loading animation
-   Fuse.js: for fuzzy searching
-   SASS: styling
-   Recoil: for global state management (carts!)

---
