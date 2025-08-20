## Welcome to "LearnLift" a Student Progress and Risk Monitoring System


This project is a web-based application designed to help teachers monitor and support their students’ academic success. It provides a centralized dashboard that tracks student performance, attendance, and engagement in real time, enabling early identification of students who may be at risk of falling behind or failing.

By combining data-driven risk assessment with an intuitive user interface, teachers can quickly spot warning signs and take timely action, such as reaching out to parents, scheduling tutoring, or organizing check-in meetings. The system also offers powerful search, filter, and alert management tools to streamline classroom management and improve student outcomes.

Built with React, this prototype showcases key features including:

Student profile management with detailed academic and contact information

Visual risk level indicators (low, medium, high) based on performance and engagement metrics

Interactive dashboards and charts for monitoring class-wide trends and individual progress

Real-time alerts emphasizing critical student issues requiring immediate attention

Flexible search and filtering capabilities by risk level, grade, and subjects

This project aims to empower educators with actionable insights and efficient workflows to ensure that no student’s struggles go unnoticed, ultimately helping reduce dropout rates and improve academic achievement.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
  
## The Problem Statement addressed in this project.

Many teachers and schools lack a systematic, data-driven way to quickly identify students who are academically at risk (low grades, poor engagement, or low attendance) and intervene before they fall too far behind or fail. Traditional manual tracking is time-consuming, error-prone, and does not scale well with large classes, leading to missed opportunities for timely support and personalized intervention.


## Current progress status (how much work is pending).

 1. Backend & data persistence: No indication student data persists beyond current session/context.
 
 2. User authentication / security: No teacher login/role management shown, which is critical for privacy and multi-user classroom scenarios.
 
 3. Scalability and API integration: Current context is fine for a hackathon MVP, but real deployment requires scalable API/backend to   manage large numbers of students.
 
 4. Validation and error handling: AddStudentModal warns for missing fields, but more robust validation for email/phone/edge cases is still needed.

##  How this prototype is solving the problem.

1. Centralized, real-time dashboard for teachers to monitor all students’ performance, attendance, and engagement metrics at a glance.

2. Automated risk analysis that flags students as “low, medium, or high risk,” ensuring that no struggling student goes unnoticed.

3. Actionable alerts and summaries that help teachers prioritize attention and optimize intervention, drastically reducing the chance of students flunking out or falling irreversibly behind.

4. Efficient search, filtering, and management tools so teachers save time and can focus energy where it matters most, not on paperwork or spreadsheets.

5.This directly solves the problem of invisible student struggles, supporting teachers in proactively safeguarding all students’ academic progression and success.


## The technologies/tools used in my prototype.

1. Frontend Library/Framework

React: All UI components and logic are built with React, leveraging hooks and context API for state and data management.

2. UI/UX Toolkit

Custom UI Components: Card, Badge, Button, Progress (likely built or wrapped over a design system such as Radix or Shadcn UI). These provide consistent layout and styling across the dashboard and modals.

Lucide Icons: Used for visual cues (risk levels, actions, alerts) across the system, improving clarity and brandability.

Dialog/Modal Components: For pop-ups (adding/searching students, viewing alerts), improving interaction flow.

3. State and Data Flow

React Context API: Centralized data/state management (StudentsContext), which tracks student records and alerts, and provides utility functions such as add, remove, resolve, and search.

Custom Hooks: Example: useToast for in-app notification feedback on actions (e.g., student added/removed).

4. Charting Library

Recharts: Used for visualizing performance trends and risk distribution. Enables responsive and interactive charts for class-wide analytics.

5. Styling and Utility

Utility Functions: Example: cn for conditional class names, enabling dynamic UI changes based on risk, severity, etc..

Responsive Design Hints: JSX and CSS-in-JS implied, allowing flexible layouts for cards, panels, and charts.

6. Data Validation/UX

Frontend Form Validation: Checks for required fields (name, grade, email) in AddStudent modal, with error toasts for failed submits.

7. Potential Design System

Based on code (Dialog, Badge, Progress, etc.), UI elements are likely derived from a component library (Radix UI, Shadcn UI, or similar), though not explicitly named.


##1. Frontend Library/Framework
React: All UI components and logic are built with React, leveraging hooks and context API for state and data management.

2. UI/UX Toolkit
Custom UI Components: Card, Badge, Button, Progress (likely built or wrapped over a design system such as Radix or Shadcn UI). These provide consistent layout and styling across the dashboard and modals.

Lucide Icons: Used for visual cues (risk levels, actions, alerts) across the system, improving clarity and brandability.

Dialog/Modal Components: For pop-ups (adding/searching students, viewing alerts), improving interaction flow.

3. State and Data Flow
React Context API: Centralized data/state management (StudentsContext), which tracks student records and alerts, and provides utility functions such as add, remove, resolve, and search.

Custom Hooks: Example: useToast for in-app notification feedback on actions (e.g., student added/removed).

4. Charting Library
Recharts: Used for visualizing performance trends and risk distribution. Enables responsive and interactive charts for class-wide analytics.

5. Styling and Utility
Utility Functions: Example: cn for conditional class names, enabling dynamic UI changes based on risk, severity, etc..

Responsive Design Hints: JSX and CSS-in-JS implied, allowing flexible layouts for cards, panels, and charts.

6. Data Validation/UX
Frontend Form Validation: Checks for required fields (name, grade, email) in AddStudent modal, with error toasts for failed submits.

7. Potential Design System
Based on code (Dialog, Badge, Progress, etc.), UI elements are likely derived from a component library (Radix UI, Shadcn UI, or similar), though not explicitly named.


## Screenshots for better understanding.

<form>
    <input type="file" name="image"/>
</form><img width="1440" height="900" alt="Dashboard" src="https://github.com/user-attachments/assets/c74bcf21-f1a7-4f59-bd60-762d0b701ae9" />
<img width="1440" height="900" alt="Search students " src="https://github.com/user-attachments/assets/090c4f74-bc96-4d2c-bec4-8d8a2a04edaa" />
<img width="1440" height="900" alt="Add students" src="https://github.com/user-attachments/assets/ce8fd80b-5756-4b09-8e5e-16267d5ad6e3" />
<img width="1440" height="900" alt="Alert management" src="https://github.com/user-attachments/assets/a92eb96e-f4e3-4a2e-a3f6-cde7b02ce35f" />
