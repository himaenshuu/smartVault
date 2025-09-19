# SmartVault: Next-Generation File Storage & Management System 🚀

> Revolutionizing Enterprise File Management with AI and Advanced Security

[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)](https://appwrite.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🌟 What Makes SmartVault Stand Out

SmartVault revolutionizes file storage and management with its innovative features and modern architecture:

### 🎯 Unique Features

1. **AI-Powered File Management**
   - Intelligent file categorization and tagging
   - Smart search with natural language processing
   - AI-driven file organization suggestions
   - Interactive AI chatbot for quick assistance

2. **Advanced Security**
   - End-to-end encryption
   - Multi-factor authentication with OTP
   - Granular access controls
   - Real-time activity monitoring

3. **Modern User Experience**
   - Intuitive drag-and-drop interface
   - Real-time file previews
   - Dark/Light mode support
   - Responsive design for all devices

4. **Enterprise-Grade Architecture**
   - Built with Next.js 15 for optimal performance
   - TypeScript for type-safe, maintainable code
   - Appwrite backend for scalable infrastructure
   - Real-time updates and collaboration

### 💡 Technical Innovation

- **Next.js App Router & Server Components**
  - Leveraging the latest Next.js 15 features
  - Server-side rendering for optimal performance
  - API routes for secure backend operations

- **Modern Stack**
  - TypeScript for type safety and better developer experience
  - Tailwind CSS with Shadcn UI for sleek, responsive design
  - Appwrite for secure, scalable backend services
  - Google Generative AI integration

## 🚀 Quick Start

1. **Clone and Install**

```bash
git clone https://github.com/himaenshuu/smartVault
cd SmartVault
npm install
```

2. **Configure Environment**
   Create a `.env.local` file:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT='https://cloud.appwrite.io/v1'
NEXT_PUBLIC_APPWRITE_PROJECT=''
NEXT_PUBLIC_APPWRITE_DATABASE=''
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=''
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=''
NEXT_PUBLIC_APPWRITE_BUCKET=''
NEXT_APPWRITE_KEY=''
```

3. **Start Development**

```bash
npm run dev
```

## 🏗️ Architecture Overview

```plaintext
app/                # Next.js app directory
   (auth)/         # Authentication routes
   (root)/         # Main application routes
   api/            # API endpoints
components/        # Reusable UI components
lib/              # Core utilities
   actions/       # Server actions
   appwrite/      # Backend config
public/           # Static assets
types/            # TypeScript definitions
```

## 📊 Performance & Security

- **Lighthouse Scores**
  - Performance: 95+
  - Accessibility: 100
  - Best Practices: 100
  - SEO: 100

- **Security Features**
  - End-to-end encryption
  - Multi-factor authentication
  - Role-based access control
  - Regular security audits

## 🛠️ Development Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Production server
npm start

# Code quality
npm run lint
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

SmartVault is optimized for Vercel deployment with zero configuration needed.

#### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhimaenshuu%2FsmartVault&env=NEXT_PUBLIC_APPWRITE_ENDPOINT,NEXT_PUBLIC_APPWRITE_PROJECT,NEXT_PUBLIC_APPWRITE_DATABASE,NEXT_PUBLIC_APPWRITE_USERS_COLLECTION,NEXT_PUBLIC_APPWRITE_FILES_COLLECTION,NEXT_PUBLIC_APPWRITE_BUCKET,NEXT_APPWRITE_KEY&envDescription=Appwrite%20configuration%20required&envLink=https%3A%2F%2Fappwrite.io%2Fdocs)

#### Option 2: Manual Deploy

1. **Fork or Clone the Repository**
   ```bash
   git clone https://github.com/himaenshuu/smartVault
   cd smartVault
   ```

2. **Connect to Vercel**
   - Push your repository to GitHub
   - Visit [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project" and import your repository

3. **Configure Environment Variables**
   
   In your Vercel dashboard, add these environment variables:
   
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE=your_database_id
   NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=your_users_collection_id
   NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=your_files_collection_id
   NEXT_PUBLIC_APPWRITE_BUCKET=your_bucket_id
   NEXT_APPWRITE_KEY=your_server_api_key
   ```

4. **Deploy**
   - Vercel will automatically build and deploy your application
   - Your app will be available at `https://your-project.vercel.app`

#### Setting up Appwrite Backend

1. **Create Appwrite Account**
   - Visit [Appwrite Cloud](https://cloud.appwrite.io)
   - Create a new account or sign in

2. **Create a New Project**
   - Click "Create Project"
   - Note down your Project ID

3. **Create Database and Collections**
   ```bash
   # Create Database
   Database ID: smartvault_db

   # Create Collections
   1. Users Collection: users
   2. Files Collection: files
   ```

4. **Create Storage Bucket**
   ```bash
   Bucket ID: smartvault_files
   ```

5. **Generate API Key**
   - Go to Settings > API Keys
   - Create a new server-side API key
   - Copy the secret key for `NEXT_APPWRITE_KEY`

#### Vercel Configuration

The project includes a `vercel.json` file with optimized settings:

- **Framework**: Next.js (auto-detected)
- **Build Command**: `npm run build`
- **Region**: Washington D.C. (iad1) for optimal performance
- **Function Timeout**: 30s for API routes
- **Security Headers**: Enabled for enhanced security

### Alternative Deployment Options

#### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add the same environment variables as above

#### Deploy to Railway

1. Connect your repository to Railway
2. Add environment variables
3. Railway will auto-deploy on every push

#### Docker Deployment

Use the included `Dockerfile` and `docker-compose.yml`:

```bash
# Copy environment file
cp .env.example .env.local

# Fill in your environment variables
nano .env.local

# Build and run
docker-compose up -d
```

### Post-Deployment Setup

1. **Verify Environment Variables**
   - Check that all Appwrite credentials are correctly set
   - Test the connection to your Appwrite instance

2. **Configure Domain (Optional)**
   - Add your custom domain in Vercel settings
   - Update Appwrite platform settings to include your domain

3. **Monitor Performance**
   - Use Vercel Analytics to monitor performance
   - Check Appwrite console for backend metrics

### Troubleshooting

**Build Errors:**
- Ensure all environment variables are set
- Check Appwrite configuration and connectivity
- Verify Next.js version compatibility

**Runtime Errors:**
- Check Vercel function logs
- Verify Appwrite permissions and API keys
- Ensure all collections and buckets are properly configured

## 🔥 Why SmartVault?

1. **Innovation**: AI-powered features set us apart
2. **Security**: Enterprise-grade protection built-in
3. **Performance**: Optimized for speed and efficiency
4. **Scalability**: Built for growth and high loads
5. **Modern Tech**: Latest industry-standard stack

## 📝 License

MIT License

---

### 🌟 Created with Passion by Himanshu

Using cutting-edge technologies like Next.js 15, TypeScript, and Appwrite to revolutionize file management..
