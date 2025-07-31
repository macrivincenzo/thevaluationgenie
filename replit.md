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

## Recent Changes: Latest modifications with dates

### January 29, 2025
- **MAJOR ENHANCEMENT**: Integrated comprehensive valuation questionnaire structure
- **Industry Expansion**: Added 37 industry types with specific SDE multipliers (2.0x - 6.0x range)
- **Schema Update**: Enhanced database schema to support detailed buyer/seller questionnaires
- **Questionnaire Features**: 
  - Separate question flows for buyers vs sellers
  - 3-year financial data collection (revenue, SDE, growth rates)
  - Business dependency assessment (owner involvement, key employees)
  - Customer concentration and retention metrics
  - Due diligence priorities and deal structure preferences
- **Technical Implementation**: 
  - Fixed buyer-seller selection dropdown with reliable HTML select element
  - Updated industry multipliers library with comprehensive business types
  - Enhanced database schema with JSONB fields for multi-year data
- **User Preference**: User confirmed dropdown selection works correctly with proper state management

**STRIPE INTEGRATION COMPLETE**:
- **PDF Download System**: Replaced problematic jsPDF with reliable browser print-to-PDF approach
- **Payment Processing**: Connected user's actual Stripe account with live API keys
- **Checkout Flow**: Created new checkout page (checkout-new.tsx) with proper Stripe Elements configuration
- **Payment Security**: $99 per report with secure Stripe processing and webhook support
- **Error Resolution**: Fixed Stripe Elements clientSecret requirement and TypeScript errors

### January 30, 2025
- **SIMPLIFIED QUESTIONNAIRE**: Removed buyer/seller distinction per user request
- **Universal Questions**: Same questionnaire for all users (buyers and sellers)
- **Streamlined UI**: Replaced buyer/seller selection with single professional valuation introduction
- **Future Flexibility**: Framework in place for easy question modification later

### January 31, 2025
- **SDE-FOCUSED QUESTIONNAIRE**: Replaced EBITDA with SDE (Seller's Discretionary Earnings) questions
- **Question 2.3**: Added SDE input field with clear explanation (Net profit + Owner's salary + One-time expenses + Personal expenses)
- **Question 2.4**: Added SDE margin percentage with auto-calculation (SDE/Revenue×100)
- **AUTO-CALCULATIONS IMPLEMENTED**:
  - SDE Margin = (SDE / Revenue) × 100
  - LTV/CAC Ratio = Customer Lifetime Value / Customer Acquisition Cost
  - Recurring Revenue % with auto-calculated One-time Revenue %
  - Customer Concentration Risk Score (Low/Medium/High based on top 5 customers %)
- **BACKEND UPDATES**: Updated valuation calculation to require accurate SDE input instead of EBITDA fallback
- **ACCURACY FOCUS**: All calculations now use precise SDE methodology for more accurate business valuations
- **PROFESSIONAL PDF FORMAT**: Created new professional PDF generator matching user's template specification
  - Clean, minimal design with proper corporate formatting
  - Structured sections: Company Overview, Executive Summary, Enterprise Valuation, Financial Analysis
  - Professional valuation methodologies with detailed assumptions
  - Risk assessment and strategic recommendations sections
  - Proper disclaimers and legal notices
  - Optimized for print-to-PDF functionality
- **NEW PRICING STRUCTURE**: Completely restructured pricing model per user specification
  - 🎁 First Report FREE: $0 - No credit card required, complete professional report with no limitations
  - 📊 Additional Reports: $29 (was $39) - Limited time pricing for subsequent valuations
  - ⚡ Pro Monthly: $79/month - 3 reports + priority support + advanced features for professionals
  - Updated landing page with comprehensive competitive positioning vs traditional firms ($2K-$15K), online competitors ($99-$499), and software tools ($50-$200/month)
  - Removed all payment requirements from first valuation - now completely free PDF download
  - Added detailed value propositions and "Why We Offer These Options" explanations

### January 31, 2025 (continued)
- **100% HALAL COMPLIANCE ACHIEVED**: Completely removed all EBITDA references for full Islamic finance compliance
- **SDE-ONLY METHODOLOGY**: System now exclusively uses SDE (Seller's Discretionary Earnings) calculations
- **Required Field Validation**: Added comprehensive validation ensuring all essential fields completed for accurate valuations
- **PDF Reports Updated**: Professional PDF generator now uses only SDE metrics, no EBITDA references
- **Critical Fields Required**: Business basics, annual revenue, SDE, and owner involvement now mandatory
- **Backend Validation Fixed**: SDE calculation error resolved, system accepts proper SDE values with fallback calculations