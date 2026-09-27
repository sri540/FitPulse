# FitPulse — AI-Powered Fitness Activity & Insights Platform

FitPulse is a full-stack AI-powered fitness platform that enables users to record workout activities, track their fitness history, and receive personalized insights based on their activity data.

The application combines a React frontend with Spring Boot microservices, API Gateway, service discovery, authentication, databases, asynchronous messaging, and AI-powered recommendations to provide an end-to-end fitness tracking experience.

## Overview

FitPulse provides a complete workflow for managing fitness activities:

1. User authenticates through the application.
2. User records a fitness activity.
3. Activity data is processed by the backend services.
4. The AI service analyzes the activity.
5. Personalized insights are generated.
6. The user can review the activity and AI-generated recommendations through the FitPulse interface.

## Key Features

- User authentication and authorization
- Fitness activity tracking
- Activity history
- Detailed activity information
- AI-generated fitness analysis
- Personalized improvement recommendations
- Activity-based suggestions
- Safety guidelines
- Microservice-based backend architecture
- API Gateway
- Eureka service discovery
- RabbitMQ-based messaging
- MongoDB and PostgreSQL integration
- Responsive React interface

## AI-Powered Insights

FitPulse integrates an AI-powered recommendation service to analyze recorded fitness activities.

For each supported activity, the platform can present:

- Activity analysis
- Areas for improvement
- Personalized suggestions
- Safety guidelines

The frontend organizes the AI-generated response into structured sections so users can easily understand the recommendations.

## Technology Stack

### Frontend

- React
- Vite
- Material UI
- Redux Toolkit
- Axios
- React Router
- OAuth2 / OpenID Connect

### Backend

- Java
- Spring Boot
- Spring Cloud
- Spring Security
- Spring Data JPA
- Spring Data MongoDB

### Microservices

The backend is organized into the following services:

- User Service
- Activity Service
- AI Service
- API Gateway
- Eureka Service Discovery
- Config Server

### Infrastructure

- PostgreSQL
- MongoDB
- RabbitMQ
- Keycloak
- Maven

### AI

- Google Gemini API

## Architecture

```text
                    ┌─────────────────────┐
                    │     React Client    │
                    │      FitPulse UI    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     API Gateway     │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌────────────┐   ┌────────────┐   ┌────────────┐
       │ User       │   │ Activity   │   │ AI         │
       │ Service    │   │ Service    │   │ Service    │
       └─────┬──────┘   └─────┬──────┘   └─────┬──────┘
             │                │                │
             ▼                ▼                ▼
       ┌────────────┐   ┌────────────┐   ┌────────────┐
       │ PostgreSQL │   │  MongoDB   │   │ Gemini API │
       └────────────┘   └────────────┘   └────────────┘

                    ┌─────────────────────┐
                    │  Eureka Discovery   │
                    └─────────────────────┘

                    ┌─────────────────────┐
                    │   RabbitMQ Broker    │
                    └─────────────────────┘
```

## Project Structure

```text
FitPulse/
│
├── activityservice/
├── aiservice/
├── configserver/
├── eureka/
├── gateway/
├── userservice/
│
├── fitness-app-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── store/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

## Frontend

The FitPulse frontend provides a responsive interface for interacting with the fitness platform.

### Authentication

- OAuth2 / OpenID Connect authentication
- Protected application experience
- Login and logout functionality

### Activity Management

Users can:

- Select an activity type
- Record workout duration
- Record calories burned
- View recent activities
- Open individual activity details

### Activity Details

Each activity provides a dedicated view containing:

- Activity type
- Duration
- Calories burned
- Activity date
- AI-generated analysis
- Improvement areas
- Suggestions
- Safety guidelines

### User Interface

The interface uses Material UI components to provide:

- Responsive layouts
- Activity cards
- Structured information sections
- Consistent navigation
- Clear presentation of AI-generated insights

## AI Recommendation Flow

```text
User Records Activity
          │
          ▼
   Activity Service
          │
          ▼
      AI Service
          │
          ▼
    Gemini API
          │
          ▼
 AI-Generated Analysis
          │
          ▼
  FitPulse Activity View
```

## Code Quality

The frontend is verified using ESLint and the Vite production build.

Run linting with:

```bash
npm run lint
```

Create a production build with:

```bash
npm run build
```

Both commands complete successfully for the current frontend implementation.

## Running the Frontend

Navigate to the frontend directory:

```bash
cd fitness-app-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

## Backend Requirements

Running the complete application locally requires the supporting infrastructure used by the microservices:

- PostgreSQL
- MongoDB
- RabbitMQ
- Keycloak
- Google Gemini API configuration

The backend services should be started according to their individual service configurations before using the complete end-to-end application.

## Environment Configuration

Sensitive configuration values should be supplied through environment variables rather than committed directly to Git.

Examples include:

```text
POSTGRES_PASSWORD
GEMINI_API_KEY
```

Do not commit API keys, passwords, or other private credentials to the repository.

## Engineering Concepts Demonstrated

FitPulse demonstrates practical implementation across:

- React frontend development
- REST API integration
- Spring Boot microservices
- Authentication and authorization
- OAuth2 / OpenID Connect
- API Gateway architecture
- Service discovery
- Database integration
- Message-based communication
- AI service integration
- Responsive UI development
- State management with Redux Toolkit
- Git and GitHub workflow