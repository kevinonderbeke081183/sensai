# 🚀 Deploying SensAI to Netlify

## Option 1: Drag & Drop (Easiest - 2 minutes)

1. Go to https://app.netlify.com/drop
2. Drag the entire `dist` folder from this project
3. Netlify will give you a live URL instantly!
4. URL will look like: `https://random-name-12345.netlify.app`

**To access the prototypes:**
- Landing page: `https://your-site.netlify.app/`
- Trends prototype: `https://your-site.netlify.app/?app=trends`
- Inventory prototype: `https://your-site.netlify.app/?app=inventory`

---

## Option 2: Connect to GitHub (Best for ongoing updates)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize
4. Select repository: `kevinonderbeke081183/sensai`
5. Choose branch: `claude/audit-sensai-features-qmx6s`
6. Build settings (should auto-detect):
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Click "Deploy site"

**Every time you push to the branch, it will auto-deploy!**

---

## Option 3: CLI Deploy (From this terminal)

Run these commands:

```bash
# Login to Netlify (opens browser)
netlify login

# Deploy the site
netlify deploy --prod --dir=dist
```

It will ask:
- "Create & configure a new site?" → Yes
- "Team?" → Choose your team
- "Site name?" → Enter: `sensai-demo` (or your preferred name)

You'll get a live URL!

---

## 🎯 What You'll See After Deploy

**Landing Page:** `https://your-site.netlify.app/`
- Two buttons: "Trends Demo" and "Inventory Demo"
- Waitlist form (will work via Netlify Forms)

**Direct Links:**
- Trends prototype: Add `?app=trends` to URL
- Inventory prototype: Add `?app=inventory` to URL

---

## 🔄 Updating the Deployment

### If using GitHub connection (Option 2):
Just push to the branch:
```bash
git add .
git commit -m "Your changes"
git push
```
Netlify auto-deploys in ~30 seconds!

### If using CLI (Option 3):
```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## 📱 Testing After Deploy

1. Visit your live URL
2. Click "Trends Demo" → Should see purple banner "PROTOTYPE 1: TRENDS-FIRST"
3. Click "Inventory Demo" → Should see green banner "PROTOTYPE 2: INVENTORY-FIRST"
4. Share the URL with stakeholders!

---

## 🐛 Troubleshooting

**Site not updating?**
- Clear browser cache (Ctrl+Shift+R)
- Check Netlify dashboard for deploy status

**404 errors?**
- The `netlify.toml` file handles this (already configured)

**Waitlist form not working?**
- Netlify Forms work automatically on Netlify hosting
- Enable in: Site settings → Forms → Enable form detection
