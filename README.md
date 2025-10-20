# Task 3: WEB UI Forms (Task Management Frontend)

This repository contains the frontend application for the Kaiburr Task Management System, built using **React, TypeScript, and Ant Design**. This UI interacts with the backend REST API developed in Task 1 to manage, display, search, and execute shell commands.

## 1\. Prerequisites

Before running the frontend, ensure the following is set up:

1.  **Node.js (v16+) and npm (or yarn):** For running the React application.
2.  **Task 1 Backend:** The Java Spring Boot application (or the Kubernetes deployment from Task 2) must be running and accessible at `http://localhost:8080` (or the appropriate NodePort/URL).

## 2\. Project Setup and Run Instructions

Follow these steps to get the application running locally:

1.  **Clone the repository:**
    ```bash
    git clone [Your Repository URL]
    cd [task3-frontend-repo-name]
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```
3.  **Start the application:**
    ```bash
    npm start
    # OR
    yarn start
    ```
    The application will typically open automatically in your browser at `http://localhost:3000`.

## 3\. UI Features Implemented

The application provides a single page interface using Ant Design components for managing tasks:

  * **Task List:** Displays all tasks in a searchable, paginated table.
  * **Create/Edit Form:** A modal or sidebar form for inputting Task details (`name`, `owner`, `command`).
  * **Search Functionality:** Filter tasks by `name` (using the backend's `/findByName` endpoint).
  * **Action Buttons:**
      * **"Run Command"**: Triggers the `PUT /tasks/{id}/execute` endpoint and updates the execution history.
      * **"View History"**: Displays the `taskExecutions` output in a separate modal.
      * **"Delete"**: Removes a task (`DELETE /tasks/{id}`).

## 4\. Screenshot Validation

The following screenshots validate that all required functionalities are accessible and working, and meet the date/time and name requirements.


### 4.1. Task Listing and Search

**Validation:** Shows the main dashboard, displaying the task list and the result of a search operation.

<img width="1919" height="954" alt="image" src="https://github.com/user-attachments/assets/c74b7da9-00ce-4ef4-85f7-bc9a4cd684b6" />

---

<img width="1919" height="935" alt="image" src="https://github.com/user-attachments/assets/b67036e1-2f44-4005-addc-812b05b4c015" />


### 4.2. Task Creation via Form

**Validation:** Shows the modal/form used to input data for a new task (`name`, `owner`, `command`) and the successful addition of the task to the table.

<img width="1919" height="940" alt="image" src="https://github.com/user-attachments/assets/542d669c-1680-4fe8-af80-066815ba98d1" />

---

<img width="1919" height="938" alt="image" src="https://github.com/user-attachments/assets/0a4ad789-6ec8-498a-ac38-0dc1cb297b49" />


### 4.3. Command Execution and Output View

**Validation:** Shows the action of clicking "Run Command," a successful API call, and the resulting output displayed in the "View History" modal. This confirms the frontend correctly calls `PUT /tasks/{id}/execute` and parses the output.

<img width="1919" height="939" alt="image" src="https://github.com/user-attachments/assets/ea0aacd4-3435-4648-82f2-fa9402cf62f1" />

---

<img width="1919" height="923" alt="image" src="https://github.com/user-attachments/assets/7aee73c0-b95a-4cf5-8ebd-6ff6e65d6644" />


### 4.4. Task Deletion

**Validation:** Shows the confirmation modal for deletion and the resulting task list after a record has been successfully removed.

<img width="1917" height="941" alt="image" src="https://github.com/user-attachments/assets/b52e3b2d-cc09-42b6-89ac-ff9902207776" />

---

<img width="1914" height="944" alt="image" src="https://github.com/user-attachments/assets/2fda7856-c018-4ebc-90f5-eb8798682d51" />


## 5\. Technology Stack

  * **Frontend Framework:** React 19
  * **Language:** TypeScript
  * **UI Library:** Ant Design (antd)
  * **Data Fetching:** Axios or Fetch API
  * **Styling:** CSS-in-JS (Antd default)

## 6\. Development Notes (Usability and Accessibility)

  * **Usability:** Forms use clear labels, input validation, and Ant Design's standardized components for a clean user experience.
  * **Accessibility:** Components are implemented following Ant Design's accessibility guidelines (e.g., proper ARIA attributes, keyboard navigation support).
  * **Error Handling:** Notifications (Antd `message` or `notification`) are used to display backend errors (e.g., 404, 500) to the user.
