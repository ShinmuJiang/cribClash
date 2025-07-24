# Crib Clash 🏠

A modern web application where users can vote on and rank college dorms and apartments. Built with Next.js, TypeScript, and Supabase.

![Crib Clash Screenshot](/public/screenshot.png) <!-- Add a screenshot later -->

## Features ✨

- 🎮 **1v1 Dorm Battles**: Compare two dorms side by side and vote for your favorite
- 🏆 **ELO Ranking System**: Dorms are ranked using a sophisticated ELO algorithm
- 📊 **Leaderboard**: See which dorms are trending and climbing the ranks
- 👤 **User Profiles**: Create an account to save favorites and track your votes
- 🏠 **Dorm Listings**: Submit and manage your own dorm listings
- 📱 **Responsive Design**: Works perfectly on all devices

## Tech Stack 🛠️

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **State Management**: React Context API
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started 🚀

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crib-clash.git
   cd crib-clash
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema 🗃️

### Tables

1. **profiles**
   - `id`: UUID (references auth.users)
   - `email`: Text
   - `username`: Text (unique)
   - `full_name`: Text
   - `avatar_url`: Text
   - `created_at`: Timestamp
   - `updated_at`: Timestamp

2. **apartments**
   - `id`: UUID
   - `user_id`: UUID (references auth.users)
   - `title`: Text
   - `description`: Text
   - `address`: Text
   - `price`: Integer
   - `images`: Text[]
   - `elo_rating`: Float (default: 1500)
   - `total_votes`: Integer (default: 0)
   - `created_at`: Timestamp
   - `updated_at`: Timestamp

3. **votes**
   - `id`: UUID
   - `voter_id`: UUID (references auth.users)
   - `winner_id`: UUID (references apartments)
   - `loser_id`: UUID (references apartments)
   - `created_at`: Timestamp

## API Endpoints 🌐

- `GET /api/apartments/random` - Get two random apartments for voting
- `POST /api/vote` - Submit a vote between two apartments
- `GET /api/leaderboard` - Get top-rated apartments
- `POST /api/apartments` - Create a new apartment listing
- `GET /api/apartments/[id]` - Get apartment details

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Built with ❤️ using Next.js and Supabase
- Inspired by popular ranking and voting applications
- Special thanks to all contributors

---

<div align="center">
  Made with 💙 by Your Name
</div>