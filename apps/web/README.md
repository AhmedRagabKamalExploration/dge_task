# News Application

A modern news application built with [Next.js](https://nextjs.org) that displays top headlines and allows users to search and filter news articles. This is part of a Turborepo monorepo.

## 🚀 Live Deployment

**Production URL:** [https://dge-task-web.vercel.app/news](https://dge-task-web.vercel.app/news)

## 📋 Features

- **News Feed**: Display top headlines from around the world
- **Search & Filter**: Search news articles by title
- **Article Details**: View detailed information about each article
- **Server-Side Rendering**: Optimized performance with Next.js App Router
- **Data Fetching**: React Query for efficient data management and caching
- **Responsive Design**: Modern UI built with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack React Query
- **UI Components**: Custom components with shadcn/ui patterns
- **Monorepo**: Turborepo

## 📦 Installation

This project is part of a Turborepo monorepo. Follow these steps to get started:

### Prerequisites

- Node.js >= 18
- pnpm 9.0.0 (recommended) or npm/yarn

### Steps

1. **Clone the repository** (if not already done):

   ```bash
   git clone <repository-url>
   cd dge
   ```

2. **Install dependencies** from the root directory:

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the `apps/web` directory with the following variables:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   NEXT_PUBLIC_API_VERSION=v1
   NEXT_PUBLIC_API_KEY=your-api-key-here

   # Server-side API Keys
   API_KEY=your-api-key-here
   NEWS_API_KEY=your-news-api-key-here
   ```

   **Note**:
   - `API_KEY` is used for authenticating requests to your Next.js API routes
   - `NEWS_API_KEY` is your NewsAPI.org API key (get one at [newsapi.org](https://newsapi.org/))

## 🏃 Running the Application

### Development Mode

From the **root directory**, run:

```bash
# Run all apps in the monorepo
pnpm dev

# Or run only the web app
pnpm dev --filter=web

# Or using turbo directly
turbo dev --filter=web
```

The application will be available at [http://localhost:3000](http://localhost:3000)

**Note**: The home page automatically redirects to `/news`.

### Build for Production

```bash
# Build all apps
pnpm build

# Build only the web app
pnpm build --filter=web
```

### Start Production Server

```bash
cd apps/web
pnpm start
```

## 📁 Project Structure

```
apps/web/
├── app/
│   ├── api/v1/news/        # API route for fetching news
│   ├── features/news/      # News feature module
│   │   ├── components/     # News-related components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── queries/        # React Query configurations
│   │   ├── services/       # API service functions
│   │   └── types/          # TypeScript types
│   ├── components/         # Shared components
│   ├── news/               # News pages
│   └── page.tsx            # Home page (redirects to /news)
├── config/                 # App configuration
└── services/               # HTTP and domain utilities
```

## 🔧 Configuration

### Environment Variables

The following environment variables are required:

| Variable                  | Description                                  | Required |
| ------------------------- | -------------------------------------------- | -------- |
| `NEXT_PUBLIC_API_URL`     | Base URL for the API                         | Yes      |
| `NEXT_PUBLIC_API_VERSION` | API version (default: v1)                    | No       |
| `NEXT_PUBLIC_API_KEY`     | Public API key for client requests           | Yes      |
| `API_KEY`                 | Server-side API key for route authentication | Yes      |
| `NEWS_API_KEY`            | NewsAPI.org API key                          | Yes      |

### API Routes

The application includes a Next.js API route at `/api/v1/news` that:

- Authenticates requests using the `x-api-key` header
- Fetches news from NewsAPI.org
- Filters and transforms the response
- Implements caching for better performance

## 🚀 Deployment

The application is deployed on Vercel and automatically builds on every push to the main branch.

**Deployment URL**: [https://dge-task-web.vercel.app/news](https://dge-task-web.vercel.app/news)

### Deploying to Vercel

1. Push your code to a Git repository
2. Import the project in [Vercel](https://vercel.com)
3. Configure the environment variables in Vercel dashboard
4. Deploy!

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [TanStack Query Documentation](https://tanstack.com/query/latest) - learn about React Query
- [Turborepo Documentation](https://turborepo.com/docs) - learn about the monorepo setup

## 📝 Scripts

Available scripts in the `web` app:

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm check-types` - Type check with TypeScript
