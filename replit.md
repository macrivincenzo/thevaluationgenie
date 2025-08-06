# ValuationGenie - Business Valuation Application

## Overview

ValuationGenie is a web application providing instant business valuations for small service-based businesses in the US. It generates automated, professional PDF valuation reports using industry-standard methodologies, focusing on the Seller's Discretionary Earnings (SDE) multiplier approach. The project aims to offer a cost-effective alternative to traditional appraisers, targeting business buyers, sellers, brokers, and consultants.

## User Preferences

Preferred communication style: Simple, everyday language.
SEO Priority: Landing page heavily optimized for Google ranking with SME business valuation keywords and halal compliance focus.
Domain: thevaluationgenie.com
Logo: Premium geometric diamond design with "Instant Business Valuation" tagline - sophisticated gradient effects with animated sparkles representing the "genie" magic.

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
- **Valuation Engine**: Uses SDE multiplier method with industry-specific multiples. Supports various industries including consulting, marketing, IT services, etc. Output is a comprehensive PDF report. 100% halal compliant with no interest-based calculations and absolutely no EBITDA usage.
- **Payment Processing**: Stripe integration with simplified single-tier pricing: Professional Report ($39). Secure payment forms using Stripe Elements.
- **Authentication**: Replit Auth (OpenID Connect) for user authentication, with custom user storage.
- **File Management**: Local filesystem storage for PDF and CSV uploads (not parsed).
- **Email System**: Nodemailer for welcome emails and notifications.
- **Valuation Questionnaire**: A streamlined, universal questionnaire for all users (buyers and sellers) focused on SDE-relevant financial data and business specifics. Includes auto-calculations for key metrics.
- **PDF Report Generation**: Ultra-modern, premium PDF design with sophisticated color palette (deep slate, indigo, gold, teal), geometric patterns, gradient headers, and professional card layouts creating a "WOW" factor that justifies the $39 price point.
- **SEO Landing Page**: Extensively optimized for Google ranking targeting "SME Business Valuation" keywords with structured sections including competitive positioning, benefits showcase, and strategic CTA placement.
- **Complete Navigation**: All pages functional including Services, Industry Analysis, Terms, Privacy, Contact with proper authentication flows.
- **Premium Logo**: Geometric diamond design with gradient effects, trending arrow, animated sparkles, and "Instant Business Valuation" tagline.
- **Mobile-Optimized Dashboard**: Fully responsive design with mobile-friendly valuation cards, compact buttons, stacked layouts, and touch-optimized navigation for seamless phone usage.
- **Professional Form Validation**: Soft gray guidance messages instead of intimidating red errors, optional debt field, and streamlined validation to prevent user abandonment.

## External Dependencies

- **Replit Auth**: OAuth provider for user authentication.
- **Stripe**: Payment processing and subscription management, including Stripe Elements for secure forms.
- **Neon**: Serverless PostgreSQL hosting.
- **Nodemailer**: For sending transactional emails.