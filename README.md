This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL database server
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd e-voting
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# Copy environment file
cp env.example .env

# Edit .env file with your database credentials
# Update DATABASE_URL and other required variables
```

4. **Database Setup**
```bash
# Push schema to database
npx prisma db push

# Run seeder to populate with sample data
npm run seed:all
```

5. **Start development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Database Setup

### Running Seeders

To populate the database with sample data, run:

```bash
# Setup database and seed data in one command
npm run db:setup

# Or run separately
npm run db:push    # Push schema to database
npm run seed:all   # Seed sample data
npm run seed       # Alternative seed command

# Reset database (WARNING: This will delete all data)
npm run db:reset
```

### Default Credentials

After running the seeder, you can login with these default accounts:

**Admin Account:**
- Email: `admin@evoting.com`
- Password: `admin123`

**Voter Accounts:**
- Email: `voter1@evoting.com`
- Password: `voter123`
- Email: `voter2@evoting.com`
- Password: `voter456`

### Database Schema

The application uses Prisma ORM with MySQL database. Key models include:

- **User**: Admin and voter accounts
- **Campaign**: Voting campaigns/elections
- **Candidate**: Candidates for each campaign
- **UserVoteCampaign**: Vote records
- **Rule**: Campaign rules
- **Notif**: Campaign notifications
- **AllowedEmail**: Email restrictions for campaigns

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
