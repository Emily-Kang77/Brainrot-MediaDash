# MediaDash: Your Unified Entertainment Hub

Link: https://brainrot-media-dash.vercel.app

Demo: https://vimeo.com/1035080951

MediaDash is an innovative entertainment manager and recommender that brings all your media subscriptions and recommendations into one place, saving you time and enhancing your content discovery experience.

This was made for the BrainRot Hackathon.

## Problem Statement

Most users of social media and streaming platforms utilize more than just one app. However, it's difficult for users to find the content they want to see because there's so much content dispersed across platforms, resulting in users wasting their time through doom scrolling across multiple platforms.

## Features

- **Unified Dashboard**: View content from multiple platforms in a single, user-friendly interface.
- **Personalized Recommendations**: Get tailored content suggestions based on your preferences and mood.
- **Multi-Platform Support**: Integrates with YouTube, Spotify, IMDB, and more.
- **Smart Search**: Find content across all your subscriptions with a powerful search feature.
- **User Profiles**: Customize your experience with genre preferences and platform selections.
- **Content Rating**: Rate content out of 5 stars to improve future recommendations.

## Tech Stack

- **Frontend**: React, JavaScript
- **Backend**: Python, FastAPI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Clerk
- **AI/ML**: Langchain, Google's Gemini API
- **Deployment**: Vercel (Frontend), TBD (Backend)

## Getting Started

### Prerequisites

- Node.js
- Python 3.x
- pip

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Emily-Kang77/Brainrot-MediaDash.git
    cd Brainrot-MediaDash
2. Set up the backend:
    ```bash
    cd backend
    python -m venv env
    source env/bin/activate  # On Windows use `env\Scripts\activate`
    pip install -r requirements.txt
3. Set up environment variables:
Create a new '.env' file in the backend directory with the following:
    ```bash
    GOOGLE_API_KEY=your_google_api_key
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key
    TMDB_API_KEY=your_tmdb_api_key
4. Run the backend:
    ```bash
    uvicorn main:app --reload
5. Set up the frontend:
    ```bash
    cd ../frontend
    npm install
6. Run the frontend:
    ```bash
    npm start
## Usage
1. Sign up or log in to your MediaDash account.
2. Complete the onboarding process by selecting your preferred genres (up to 5).
3. Explore your personalized dashboard filled with recommendations.
4. Use the search bar to find specific content or get mood-based suggestions.
5. Rate content to improve future recommendations.

## Project Structure
The project consists of:
- A React frontend for user interaction 
- A Python backend using FastAPI
- Supabase for database management
- Clerk for user authentication
- AI/ML components using Langchain and Google's Gemini API
## Future Improvements
- Enhancing personalization of recommendations and search results
- Incorporating more platforms, review sources, and social media
- Utilizing a custom LLM model for making recommendations

## License
This project is licensed under the MIT License.

## Acknowledgements
- Built for the Brainrot jia.seed Hackathon
- https://brainrot-jia-seed-hackathon.devpost.com/
