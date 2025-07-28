# ValuationGenie - Business Valuation Application

## Overview

ValuationGenie is a web application that provides instant business valuations for buyers and sellers of small service-based businesses in the US. The application uses industry-standard methodologies and multiples to generate automated business valuation reports in PDF format.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design
- **Session Management**: Express sessions with PostgreSQL store
- **File Handling**: Multer for file uploads (PDF/CSV documents)
- **PDF Generation**: jsPDF for creating valuation reports

### Authentication System
- **Provider**: Replit Auth (OpenID Connect)
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Custom user storage with Replit user data integration

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon serverless PostgreSQL
- **Schema**: Shared TypeScript schema definitions
- **Tables**:
  - Users (authentication and profile data)
  - Email subscriptions (marketing list)
  - Valuations (business data and calculations)
  - File uploads (supporting documents)
  - Sessions (authentication state)
  - Admin users (role management)

### Payment Processing
- **Provider**: Stripe for payment processing
- **Integration**: Stripe Elements for secure payment forms
- **Model**: Pay-per-report ($99 per valuation)
- **Security**: Server-side payment intent creation and verification

### Valuation Engine
- **Method**: SDE (Seller's Discretionary Earnings) multiplier approach
- **Industry Multiples**: Hardcoded industry-specific multipliers
- **Supported Industries**: Consulting, marketing, accounting, landscaping, cleaning, IT services, healthcare, legal, fitness, food service
- **Output**: Valuation range with comprehensive PDF report

### File Management
- **Storage**: Local filesystem for uploaded documents
- **Types**: PDF and CSV files (P&L statements, balance sheets)
- **Processing**: Files stored but not parsed in current implementation
- **Limits**: 10MB file size limit

## Data Flow

1. **User Registration**: Replit Auth handles OAuth flow and user creation
2. **Valuation Creation**: Multi-step form collects business data
3. **Calculation**: Server applies industry multiple to SDE
4. **Report Generation**: PDF created with business details and valuation range
5. **Payment Processing**: Stripe checkout for report access
6. **Report Delivery**: PDF download after successful payment

## External Dependencies

### Authentication
- **Replit Auth**: OAuth provider for user authentication
- **OpenID Connect**: Standard protocol for identity verification

### Payments
- **Stripe**: Payment processing and subscription management
- **Stripe Elements**: Secure payment form components

### Database
- **Neon**: Serverless PostgreSQL hosting
- **Connection**: WebSocket-based connection pooling

### Development Tools
- **Replit**: Development environment and deployment platform
- **Vite Plugins**: Runtime error overlay and cartographer for debugging

## Deployment Strategy

### Development Environment
- **Platform**: Replit development environment
- **Hot Reload**: Vite development server with HMR
- **Database**: Neon development database
- **Environment Variables**: Managed through Replit secrets

### Production Build
- **Frontend**: Vite production build with static asset optimization
- **Backend**: esbuild compilation to ESM modules
- **Assets**: Static files served from dist/public directory
- **Process**: Single Node.js process serving both API and static files

### Environment Configuration
- **Required Variables**:
  - `DATABASE_URL`: PostgreSQL connection string
  - `STRIPE_SECRET_KEY`: Stripe API key
  - `SESSION_SECRET`: Session encryption key
  - `REPL_ID`: Replit environment identifier
  - `ISSUER_URL`: OAuth issuer URL (defaults to Replit)

### Security Considerations
- **Data Protection**: User data deletion capabilities
- **Session Security**: HTTP-only cookies with secure flags
- **Payment Security**: Stripe handles all payment data
- **File Security**: Upload restrictions and size limits
- **Legal Compliance**: Terms of Service and Privacy Policy included

The application follows a typical full-stack TypeScript pattern with strong type safety across the entire codebase, shared schemas between client and server, and a focus on user experience with comprehensive error handling and loading states.