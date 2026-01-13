# SensAI Deployment Guide

Deploy SensAI to showcase the demand orchestration platform to prospects.

## Quick Deploy Options

### Option 1: Vercel (Recommended - Free)

1. **Via CLI:**
   ```bash
   cd apps/signal-intelligence
   npm install
   npx vercel
   ```
   Follow the prompts. Your site will be live at `your-project.vercel.app`

2. **Via GitHub:**
   - Push this folder to a GitHub repo
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" → Import your repo
   - Set Root Directory to `apps/signal-intelligence`
   - Deploy!

### Option 2: Netlify (Free)

1. **Via Drag & Drop:**
   ```bash
   cd apps/signal-intelligence
   npm install
   npm run build
   ```
   Then drag the `dist` folder to [netlify.com/drop](https://app.netlify.com/drop)

2. **Via CLI:**
   ```bash
   npm install -g netlify-cli
   cd apps/signal-intelligence
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **Via GitHub:**
   - Push to GitHub
   - Connect repo in Netlify dashboard
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Set base directory: `apps/signal-intelligence`

### Option 3: GitHub Pages (Free)

1. Create a new repo for the landing page
2. Build and copy dist contents:
   ```bash
   cd apps/signal-intelligence
   npm install
   npm run build
   ```
3. Copy contents of `dist` folder to the new repo
4. Enable GitHub Pages in repo settings

### Option 4: Any Static Host

The `dist` folder after build is completely static. Upload to:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Cloudflare Pages
- Render
- Railway

## Custom Domain

After deploying, you can add a custom domain like `sensai.io` or `getsensai.com`:

**Vercel:**
- Go to Project Settings → Domains → Add domain

**Netlify:**
- Go to Site Settings → Domain Management → Add custom domain

## Environment Variables (Optional)

The app works in demo mode by default. No environment variables needed.

If you want to connect to a live backend later:
```
VITE_API_URL=https://your-api.com
```

## What Gets Deployed

- **Landing Page** - Converts visitors to waitlist signups
- **Demo Dashboard** - Shows the full platform with simulated data
- **No backend required** - Everything runs client-side

## Collecting Waitlist Signups

Currently, signups are logged to console. To collect them:

### Option A: Netlify Forms (Easiest)
Add to your form in LandingPage.jsx:
```jsx
<form name="waitlist" method="POST" data-netlify="true">
```

### Option B: External Service
Integrate with:
- Mailchimp
- ConvertKit
- Airtable
- Google Sheets (via Zapier)
- Your own backend

## Performance

The built bundle is optimized:
- Code splitting (vendor + app chunks)
- Minified with Terser
- Tree-shaken dependencies
- ~200KB total (gzipped)

## Testing Locally Before Deploy

```bash
cd apps/signal-intelligence
npm install
npm run build
npm run preview
```

Visit http://localhost:4173 to see the production build.
