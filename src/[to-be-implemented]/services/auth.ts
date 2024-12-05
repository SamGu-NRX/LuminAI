// src/services/auth.js
const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_REDIRECT_URI = 'https://samgu-nrx.github.io/LuminAI/auth/discord/callback';
const DISCORD_SCOPE = 'identify email';
const DISCORD_AUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${DISCORD_REDIRECT_URI}&response_type=code&scope=${DISCORD_SCOPE}`;

export const signInWithDiscord = () => {
  window.location.href = DISCORD_AUTH_URL;
};
