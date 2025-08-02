# ValuationGenie - Business Valuation Application

## Overview

ValuationGenie is a web application providing instant business valuations for small service-based businesses in the US. It generates automated, professional PDF valuation reports using industry-standard methodologies, focusing on the Seller's Discretionary Earnings (SDE) multiplier approach. The project aims to offer a cost-effective alternative to traditional appraisers, targeting business buyers, sellers, brokers, and consultants.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React with TypeScript
- **UI**: Radix UI, shadcn/ui, Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **API**: RESTful
- **Session Management**: Express sessions with PostgreSQL store
- **PDF Generation**: Browser print-to-PDF approach

### Database
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (Neon)
- **Schema**: Shared TypeScript definitions for users, valuations, sessions, etc.

### Core Features
- **Valuation Engine**: Uses SDE multiplier method with industry-specific multiples. Supports various industries including consulting, marketing, IT services, etc. Output is a comprehensive PDF report.
- **Payment Processing**: Stripe integration with a three-tier pricing model: Professional Report ($39), Business Package ($99), Professional Plan ($199/quarter). Secure payment forms using Stripe Elements.
- **Authentication**: Replit Auth (OpenID Connect) for user authentication, with custom user storage.
- **File Management**: Local filesystem storage for PDF and CSV uploads (not parsed).
- **Email System**: Nodemailer for welcome emails and notifications.
- **Valuation Questionnaire**: A streamlined, universal questionnaire for all users (buyers and sellers) focused on SDE-relevant financial data and business specifics. Includes auto-calculations for key metrics.
- **PDF Report Generation**: Clean, minimal, professional PDF format for valuation reports, optimized for print-to-PDF.

## External Dependencies

- **Replit Auth**: OAuth provider for user authentication.
- **Stripe**: Payment processing and subscription management, including Stripe Elements for secure forms.
- **Neon**: Serverless PostgreSQL hosting.
- **Nodemailer**: For sending transactional emails.