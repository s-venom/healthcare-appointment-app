# Healthcare Appointment Booking System

## Objective
The objective of this assignment is to develop a web application that allows users to browse doctor profiles, search for specialists, view availability, and book appointments seamlessly. The system aims to provide an intuitive user interface, integrate a backend API for dynamic data management, and ensure a responsive design across various devices, enhancing user experience in healthcare appointment scheduling.

<div style="text-align: center;">
     <img src="images\preview.png" alt="ui">
</div>
<br/>

### Tools and Libraries Used

- **React:** Frontend framework for building the user interface.
- **Node.js & Express.js:** Backend runtime and framework for API development.
- **Tailwind CSS:** Utility-first CSS framework for responsive and modern styling.
- **Lucide React:** Icon library for UI elements (e.g., ArrowLeft, Star, Calendar).
- **React Router DOM:** Library for client-side routing.
- **Nodemon:** Development tool for automatic server restarts.
- **Cors:** Middleware to enable cross-origin resource sharing for API calls.

### Improvements with More Time

- **Form Validation** Ensured user input are non-empty before submission, preventing incorrect or incomplete data.
- **Database Integration:** Replace the in-memory doctor data with a persistent database (e.g., MongoDB) for scalable storage and retrieval.
- **Real-Time Updates:** Implement WebSocket or polling to provide live availability updates for doctor slots.
- **Mobile Optimization:** Enhance responsiveness with a dedicated mobile view or PWA features.
- **Advanced Search:** Add filters for specialization, location, and availability with dynamic sorting.
- **UI Library:** Integrate a component library (e.g., ShadCN) for consistent, reusable UI elements.


### Challenges Faced and Solutions

- **Managing state:** Used React Context.
- **Port Conflict (Port 3000 Only Worked):** Initially, only port 3000 worked for both frontend and backend, with other ports (e.g., 5000) failing.<br/>
**Solution:** Consolidated the setup by serving the React build from the Express server on port 3000, eliminating the need for separate ports.
- **TypeError with path-to-regexp:** A `TypeError: Missing parameter` name crashed the server due to a wildcard route conflict.<br/>
**Solution:** Removed the wildcard (`*`) route, served specific frontend paths (`/`, `/doctor/:id`), and reinstalled dependencies to resolve version issues.
- **UI Consistency:** Adapting the TypeScript-based Next.js UI to React required manual styling adjustments.<br/>
**Solution:** Used Tailwind CSS to mimic the reference design, ensuring a modern and responsive layout.

## Design Files

<details>
<summary>Landing Page</summary>
<br/>

- [Extra Small (Size < 576px) and Small (Size >= 576px)](images\landing_page_sm.jpeg)

- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px)](images\landing_page_lg.jpeg)
</details>

<details>
<summary>Doctor Profile</summary>
<br/>

- [Extra Small (Size < 576px) and Small (Size >= 576px)](images\doctor_profile_sm.jpeg)

- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px)](images\doctor_profile_lg.jpeg)

- [Appointment Approval](images\appointment_approval.jpeg)
</details>

### Set Up Instructions

<details>
<summary>Click to view</summary>

- Download dependencies by running `npm install` in both `client` and `server` directories.
- Start up the app using `node index.js` or `nodemon index.js` in the `server` directory.

</details>

### Assignment Completion Instructions

<details>
<summary>Functionality to be added</summary>
<br/>

The app must have the following functionalities:

- Display a landing page with a list of doctors, searchable by name or specialization.
- Allow navigation to individual doctor profiles showing details (name, specialization, rating, location, bio, availability, and slots).
- Enable users to book appointments with available doctors, including form validation for patient name, email, date, and time.
- Show a confirmation page after successful booking with appointment details.
- Display a list of booked appointments on the landing page.
- Ensure responsive design across all device sizes (XS to XL).
- Integrate a backend API to fetch and manage doctor data dynamically.

</details>

### Assignment Completion Checklist

<details>
<summary>Click to view</summary>

- The completion Checklist includes the below-mentioned points:
  - [x] I have completed all the functionalities asked in the assignment.
  - [x] I have used only the resources (Frameworks, Design files, APIs, third-party packages) mentioned in the assignment.
  - [x] I have modified the README.md file based on my assignment instructions.
  - [x] I have completed the assignment **ON TIME** (by 06:10 PM IST on Sunday, August 03, 2025).
- **Specific Checklist**:
  - [x] Implemented dynamic doctor data fetching from the backend.
  - [x] Ensured UI updates reflect the provided TypeScript reference design.
  - [x] Verified booking functionality with form validation and confirmation.
  - [x] Tested responsiveness across device sizes.

</details>

### Important Note

<details>
<summary>Click to view</summary>
<br/>

- No user authentication is implemented; the app runs in a demo mode with static doctor data.

</details>

### Resources

<details>
<summary>Data Fetch URLs</summary>
<br/>

- `http://localhost:3000/api/doctors` - Fetch all doctors.
- `http://localhost:3000/api/doctors/:id` - Fetch a specific doctor by ID.

</details>

<details>
<summary>Colors</summary>
<br/>

- <div style="background-color: #214ec7; width: 150px; padding: 10px; color: white">Hex: #214ec7 (Blue Primary)</div>
- <div style="background-color: #22c55e; width: 150px; padding: 10px; color: white">Hex: #22c55e (Green Success)</div>
- <div style="background-color: #ef4444; width: 150px; padding: 10px; color: white">Hex: #ef4444 (Red Error)</div>
- Background: `#ffffff` (White)

</details>

<details>
<summary>Font-families</summary>

- Primary: `Inter` (via Tailwind CSS or local import).
- Fallback: `sans-serif`.

</details>