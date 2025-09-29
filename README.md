# 🖼️ Image Classification API & Web Portal

This project provides a full-stack solution for image classification. It features a modern, responsive **React (JSX)** frontend built with **Tailwind CSS** for an aesthetic dark-mode look, and a high-performance **FastAPI** backend designed to serve a machine learning model (e.g., a TensorFlow/Keras image classifier).

## 🚀 Key Features

* **FastAPI Backend:** High-speed asynchronous server for handling file uploads and model inference.
* **Image Preprocessing:** Handles image file reception (`multipart/form-data`) and prepares it for the model.
* **React Frontend:** Clean, modern, single-page application (SPA) for file upload, preview, and results display.
* **Tailwind CSS:** Fully responsive, dark-theme UI for a polished, professional user experience.

##  Technology Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | `React.js` (with JSX) | User Interface and state management. |
| **Styling** | `Tailwind CSS` | Utility-first framework for rapid, responsive design. |
| **API Client** | `axios` | Asynchronous HTTP requests from frontend to backend. |
| **Backend** | `FastAPI` / `Uvicorn` | High-performance Python web framework for API endpoints. |
| **Machine Learning**| `TensorFlow` / `Keras` | Image classification model serving (implicitly used). |

## 📦 Getting Started

Follow these steps to set up and run the entire application.

### Prerequisites

You need the following installed on your system:

* Python (3.7+)
* Node.js (LTS version)
* npm (comes with Node.js)

### 1. Backend Setup (FastAPI)

1.  **Navigate to the backend directory:**
    ```bash
    cd C:\Users\USER\Desktop\Projects_git\Model_API
    ```
2.  **Install dependencies:**
    *(Assuming you have a `requirements.txt` or similar file listing `fastapi`, `uvicorn`, `tensorflow`, etc.)*
    ```bash
    pip install -r requirements.txt
    ```
3.  **Run the server:**
    ```bash
    uvicorn fastapi_app:app --host 0.0.0.0 --port 8000 --reload
    ```
    *The server should now be running at `http://localhost:8000`.*

### 2. Frontend Setup (React)

1.  **Navigate to the frontend directory:**
    *(Assuming the frontend files are near your `package.json`)*
    ```bash
    cd C:...\Projects_git\Model_API 
    # OR: cd ..\Projects_git\Model_API\back_front (if you prefer your custom folder)
    ```
2.  **Install Node dependencies:**
    ```bash
    npm install
    ```
3.  **Run the React development server:**
    ```bash
    npm run start
    ```
    *This command will open the web portal, typically at `http://localhost:3000`, which will automatically connect to your backend.*
## ⚙️ API Endpoint

The front-end is configured to communicate with the following endpoint:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/predict` | Receives a `multipart/form-data` image file and returns classification results. |
| **GET** | `/` | Base health check (handled by Uvicorn/FastAPI). |

## 💡 Troubleshooting

| Error Message | Cause | Solution |
| :--- | :--- | :--- |
| `Could not find a required file. Name: index.html... public` | Incorrect project structure for `react-scripts`. | Ensure **`index.html`** is placed inside the **`public`** folder, and **`App.jsx`** is in the **`src`** folder. |
| `ReferenceError: process is not defined` | React code trying to read environment variables (`process.env`) in a browser context. | This was fixed by hardcoding the API URL (`http://localhost:8000`) directly in `App.jsx`. |
| `Connection Error` or `Failed to fetch` | The Python backend is not running or is on a different port. | Run the backend first (`uvicorn ... --port 8000`). Check for firewall issues. |
| TensorFlow Warning: `To enable the following instructions: SSE3...` | Generic TensorFlow installation. | This is a **safe warning**; ignore it unless you require extreme performance optimization. |


