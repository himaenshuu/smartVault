# SmartVault Vercel Deployment Guide

## Quick Deploy to Vercel

### 🚀 One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhimaenshuu%2FsmartVault&env=NEXT_PUBLIC_APPWRITE_ENDPOINT,NEXT_PUBLIC_APPWRITE_PROJECT,NEXT_PUBLIC_APPWRITE_DATABASE,NEXT_PUBLIC_APPWRITE_USERS_COLLECTION,NEXT_PUBLIC_APPWRITE_FILES_COLLECTION,NEXT_PUBLIC_APPWRITE_BUCKET,NEXT_APPWRITE_KEY&envDescription=Appwrite%20configuration%20required&envLink=https%3A%2F%2Fappwrite.io%2Fdocs)

### 📋 Manual Steps

1. **Prerequisites**
   - GitHub account
   - Vercel account
   - Appwrite account

2. **Fork Repository**
   ```bash
   # Fork this repository to your GitHub account
   # Or clone it to your own repository
   git clone https://github.com/himaenshuu/smartVault
   ```

3. **Setup Appwrite**
   - Create project at [cloud.appwrite.io](https://cloud.appwrite.io)
   - Create database: `smartvault_db`
   - Create collections: `users`, `files`
   - Create storage bucket: `smartvault_files`
   - Generate server API key

4. **Deploy to Vercel**
   - Connect repository to Vercel
   - Add environment variables (see `.env.example`)
   - Deploy automatically

### 🔧 Required Environment Variables

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE=your_database_id
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=your_users_collection_id
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=your_files_collection_id
NEXT_PUBLIC_APPWRITE_BUCKET=your_bucket_id
NEXT_APPWRITE_KEY=your_server_api_key
```

### ✅ Verification

1. Check deployment status in Vercel dashboard
2. Test application functionality
3. Verify Appwrite connectivity
4. Monitor performance metrics

### 🆘 Need Help?

- Check [full documentation](./README.md#-deployment)
- Review Vercel deployment logs
- Check Appwrite console for errors
- Open an issue on GitHub

---

**Note**: This project is optimized for Vercel with zero configuration required. All necessary files (`vercel.json`, `next.config.js`) are included and pre-configured.