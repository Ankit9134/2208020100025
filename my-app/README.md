# URL Shortener Web App

A React-based URL shortener application with analytics and custom short codes.

## Features

- **URL Shortening**: Shorten up to 5 URLs concurrently
- **Custom Short Codes**: Optional custom shortcode generation
- **Validity Period**: Set expiry time (1-60 minutes)
- **Client-Side Validation**: URL format and input validation
- **Analytics**: View click statistics and detailed analytics
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

## Pages

1. **URL Shortener Page**: Main functionality for creating shortened URLs
2. **Statistics Page**: View analytics for all shortened URLs

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter a URL to shorten
2. Optionally provide a custom short code
3. Set validity period (default: 30 minutes)
4. Click "Shorten URL" to generate the shortened link
5. View statistics in the Statistics page

## Technologies Used

- React 19
- Tailwind CSS
- Vite
- React Icons