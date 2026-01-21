# Flight Search Engine

A modern, responsive flight search application built with **Next.js** (Frontend) and **FastAPI** (Backend), powered by the **Amadeus API**.

![Project Status](https://img.shields.io/badge/Status-Active-success)

## 🚀 Features

- **Real-time Flight Search**: Search one-way and round-trip flights.
- **Location Autocomplete**: Smart city and airport search using Amadeus reference data.
- **Live Price Graph**: Visualizer for flight price distribution.
- **Advanced Filtering**: Filter results by price, stops, and airlines instantly.
- **Responsive Design**: Mobile-first UI built with Tailwind CSS and Shadcn UI.

## 🛠️ Tech Stack

### Frontend (`flight-search-frontend`)
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI (Radix Primitives)
- **Charts**: Recharts
- **State/Fetching**: React Server Components + Client Hooks

### Backend (`flight-search-backend`)
- **Framework**: FastAPI (Python 3.9)
- **API Integration**: Amadeus Flight Offers & Location Search
- **Server**: Uvicorn

## 📋 Prerequisites

- **Docker** & **Docker Compose**
- **Amadeus API Keys** (Client ID & Client Secret) from [Amadeus for Developers](https://developers.amadeus.com/)

## 🏃‍♂️ Getting Started (Docker)

The easiest way to run the full stack is with Docker Compose.

1.  **Clone the repository**.

2.  **Configure Environment Variables**:
    Create a `.env` file in `flight-search-backend/`:
    ```bash
    # flight-search-backend/.env
    AMADEUS_CLIENT_ID=your_api_key_here
    AMADEUS_CLIENT_SECRET=your_api_secret_here
    ```

3.  **Run with Docker Compose**:
    ```bash
    docker-compose up --build
    ```

4.  **Access the Application**:
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend API: [http://localhost:8000/docs](http://localhost:8000/docs)

## 📁 Project Structure

```
.
├── docker-compose.yml       # Orchestration for local dev
├── flight-search-backend/   # Python FastAPI application
│   ├── app/                 # Source code
│   ├── Dockerfile           # Backend container config
│   └── requirements.txt     # Python dependencies
└── flight-search-frontend/  # Next.js application
    ├── app/                 # App Router pages
    ├── components/          # React components
    └── Dockerfile           # Frontend container config
```
