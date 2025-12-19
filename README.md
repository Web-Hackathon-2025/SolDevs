# 🏗️ Karigar - Hyperlocal Services Marketplace

A modern, enterprise-level platform connecting customers with verified local service providers (plumbers, electricians, cleaners, tutors, etc.). Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

### For Customers
- **Service Discovery**: Search and filter service providers by category, location, and ratings
- **Provider Profiles**: View detailed profiles with services, pricing, reviews, and ratings
- **Easy Booking**: Request services with date/time selection and address details
- **Booking Management**: Track booking status (requested → confirmed → completed)
- **Reviews & Ratings**: Rate and review completed services

### For Service Providers
- **Professional Profiles**: Create detailed business profiles with services and pricing
- **Service Management**: Add, edit, and manage multiple service offerings
- **Booking Workflow**: Accept, reject, or confirm service requests
- **Availability Management**: Set service radius and manage availability
- **Performance Tracking**: View earnings, ratings, and booking statistics

### For Administrators
- **User Management**: Monitor and manage all platform users
- **Provider Approvals**: Review and approve new service provider applications
- **Platform Oversight**: Monitor bookings, reviews, and disputes
- **Moderation Tools**: Handle reported content and user disputes

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 3.x, shadcn/ui components
- **Backend**: Next.js Server Actions, Supabase PostgreSQL
- **Authentication**: Supabase Auth with Row Level Security
- **Form Validation**: React Hook Form + Zod
- **State Management**: Zustand
- **Icons**: Lucide React

## 📦 Project Structure

```
karigar-app/
├── app/
│   ├── (auth)/                # Authentication pages
│   │   ├── login/             # Login page
│   │   └── signup/            # Signup page with role selection
│   ├── dashboard/             # Protected dashboard
│   │   ├── provider/          # Provider-specific pages
│   │   │   ├── profile/       # Profile management
│   │   │   └── services/      # Service management
│   │   ├── admin/             # Admin pages
│   │   │   ├── users/         # User management
│   │   │   └── providers/     # Provider approvals
│   │   └── bookings/          # Booking management
│   ├── search/                # Service provider search
│   ├── providers/[id]/        # Provider profile view
│   ├── book/[providerId]/     # Booking flow
│   ├── actions/               # Server actions
│   │   ├── auth.ts            # Authentication
│   │   ├── providers.ts       # Provider management
│   │   └── bookings.ts        # Booking management
│   └── api/                   # API routes (future)
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   └── dashboard/             # Dashboard components
│       ├── sidebar.tsx        # Navigation sidebar
│       └── header.tsx         # Dashboard header
├── lib/
│   ├── supabase/              # Supabase clients
│   │   ├── client.ts          # Browser client
│   │   ├── server.ts          # Server client
│   │   └── middleware.ts      # Auth middleware
│   ├── validations/           # Zod schemas
│   │   ├── auth.ts
│   │   ├── profile.ts
│   │   └── booking.ts
│   └── utils.ts               # Utility functions
├── types/
│   ├── index.ts               # Type definitions
│   └── database.ts            # Database types
└── middleware.ts              # Auth middleware
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account (free tier works)
- npm or yarn

### 1. Setup Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the `supabase-schema.sql` file (in project root)
3. Get your API credentials from Project Settings > API

### 2. Environment Variables

Create `.env.local` in the `karigar-app` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Install & Run

```bash
cd karigar-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📖 Usage Guide

### Creating an Account

1. Go to `/signup`
2. Choose your role:
   - **Customer**: Find and book services
   - **Service Provider**: Offer your services
3. Fill in your details and create an account

### For Customers

1. **Search Services**: Go to `/search` and filter by category/location
2. **View Providers**: Click on a provider to see their profile
3. **Book Service**: Click "Book Service" and fill in details
4. **Manage Bookings**: View and track bookings in the dashboard
5. **Leave Reviews**: Rate services after completion

### For Service Providers

1. **Complete Profile**: Go to Dashboard → My Profile
2. **Add Services**: Go to Dashboard → My Services
3. **Manage Bookings**: Accept/reject requests in Bookings
4. **Track Performance**: View stats in your dashboard

### For Admins

1. **Approve Providers**: Review new provider applications
2. **Manage Users**: Monitor all platform users
3. **Handle Disputes**: Resolve issues between users

## 🔐 Security

- **Row Level Security (RLS)**: All database operations are secured with RLS policies
- **Server-Side Validation**: All inputs validated with Zod schemas
- **Authentication Middleware**: Protected routes automatically redirect unauthorized users
- **Role-Based Access**: Different permissions for customers, providers, and admins

## 📊 Database Schema

The database includes:
- `users` - User profiles
- `service_providers` - Provider details
- `services` - Service offerings
- `bookings` - Service bookings
- `reviews` - Ratings and reviews
- `notifications` - User notifications
- `availability_schedules` - Provider availability
- `disputes` - Issue resolution
- `audit_logs` - Activity tracking

See `supabase-schema.sql` for complete schema.

## 🎨 Design Principles

- **Enterprise-Level UI**: Professional, clean, and modern design
- **Accessibility**: WCAG AA compliant components
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Optimized with Next.js App Router and Server Components
- **Type-Safe**: Fully typed with TypeScript

## 🔧 Configuration

### Tailwind CSS
Custom design tokens for consistent branding:
- Primary color: Blue (trust, professionalism)
- Success: Green (confirmations)
- Warning: Yellow (pending states)
- Destructive: Red (errors, cancellations)

### Form Validation
All forms use Zod schemas for:
- Type safety
- Runtime validation
- Consistent error messages
- Easy schema composition

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

This is a hackathon project. Feel free to fork and customize for your needs!

## 📄 License

MIT License - feel free to use this project for learning or your own services marketplace.

## 🙏 Acknowledgments

- Built with insights from TaskRabbit, Thumbtack, Upwork, and Fiverr
- UI components inspired by shadcn/ui
- Authentication powered by Supabase

---

**Built with ❤️ using Claude Code**

For setup help, see `SETUP_INSTRUCTIONS.md` and `QUICKSTART.md`
