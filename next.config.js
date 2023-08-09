module.exports = {
  reactStrictMode: true, // recommended by Next.js core
  images: {
    domains: ['i.creativecommons.org'],
  },
  env: {
    REACT_APP_SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL,
    REACT_APP_SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY,
    NFT_STORAGE_KEY: process.env.NFT_STORAGE_KEY
  }
}
