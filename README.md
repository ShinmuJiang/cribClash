# RateMyDorm - Apartment Ranking Game

A full-stack web application built with Next.js 14, Prisma, PostgreSQL, and TypeScript where users vote between two apartments side by side, and the results are ranked using an ELO rating system.

## Features

- 🏠 **1v1 Apartment Voting**: Compare two apartments side by side and vote for the better one
- 🏆 **ELO Rating System**: Apartments are ranked using a sophisticated ELO algorithm
- 📊 **Leaderboard**: View the top-rated apartments based on community votes
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- ⚡ **Real-time Updates**: Instant feedback and smooth transitions
- 📱 **Mobile Responsive**: Works perfectly on all devices

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom utilities

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd ratemydorm
npm install
```

### 2. Database Setup

1. **Set up PostgreSQL database**
   - Create a new PostgreSQL database
   - Update the `.env` file with your database connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/ratemydorm?schema=public"
   ```

2. **Generate Prisma Client**
   ```bash
   npm run db:generate
   ```

3. **Push Database Schema**
   ```bash
   npm run db:push
   ```

4. **Seed the Database**
   ```bash
   npm run db:seed
   ```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## How to Use

### Voting Game
1. Visit the home page to start voting
2. Two apartments will be displayed side by side
3. Click the heart button on your preferred apartment
4. The ELO scores will be updated based on your vote
5. A new pair of apartments will appear automatically

### Leaderboard
1. Click "Leaderboard" in the navigation
2. View the top-rated apartments sorted by ELO score
3. See win/loss records and total votes for each apartment

## ELO Rating System

The application uses a modified ELO rating system similar to chess rankings:

- **K-factor**: 32 (standard for rapid chess)
- **Starting ELO**: 1200
- **Minimum ELO**: 100
- **Expected Score**: Calculated using the standard ELO formula
- **Rating Change**: Based on actual vs expected performance

## API Endpoints

- `GET /api/apartments/random` - Get two random apartments for voting
- `POST /api/vote` - Submit a vote between two apartments
- `GET /api/leaderboard` - Get top-rated apartments

## Database Schema

### Apartment Model
- `id`: Unique identifier
- `name`: Apartment name
- `description`: Optional description
- `imageUrl`: Image URL
- `address`: Optional address
- `price`: Optional monthly rent
- `eloScore`: Current ELO rating
- `totalVotes`: Total number of votes
- `wins`: Number of wins
- `losses`: Number of losses

### Vote Model
- `id`: Unique identifier
- `winnerId`: ID of winning apartment
- `loserId`: ID of losing apartment
- `winnerEloBefore/After`: ELO scores before/after vote
- `loserEloBefore/After`: ELO scores before/after vote

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes!

## Sample Data

The seed script includes 10 sample apartments with realistic data:
- Luxury Downtown Loft
- Cozy Studio Apartment
- Spacious 2-Bedroom
- Modern High-Rise Unit
- Garden Apartment
- Historic Brownstone
- Minimalist Studio
- Penthouse Suite
- Student-Friendly Unit
- Waterfront Condo

Each apartment comes with:
- High-quality images from Unsplash
- Realistic descriptions
- Varied price points
- Different locations

## Future Enhancements

- User authentication and profiles
- Apartment submission by users
- Advanced filtering and search
- Social features (comments, sharing)
- Mobile app version
- Real-time multiplayer voting
- Analytics dashboard
