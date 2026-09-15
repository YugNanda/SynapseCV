# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start Commands

### Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173) with HMR
npm run typecheck    # Run TypeScript type checking (includes react-router typegen)
```

### Production Build
```bash
npm run build        # Create production build in ./build directory
npm run start        # Serve production build
```

### Available Scripts
- `build` - Build the app for production
- `dev` - Start development server
- `start` - Serve production build
- `typecheck` - Generate types and run TypeScript checking

**Note**: This project has **no lint or test scripts** configured. No ESLint, Prettier, Jest, or Vitest dependencies are present.

## Project Overview

"Rizzumé" is a React-based AI resume analyzer that provides feedback on ATS compatibility, tone/style, content, structure, and skills. It's a **client-side SPA** running on the **Puter cloud platform**, which provides authentication, file storage, KV storage, and AI services.

## Architecture

### High-Level Structure
- **Frontend**: React 19.1.1 SPA with React Router v7.9.2 (file-based routing)
- **Backend**: None - uses Puter cloud platform for all backend services
- **State Management**: Zustand for global state, local state for UI
- **Build Tool**: Vite 7.1.7 with TailwindCSS 4.1.13

### Key Architectural Patterns
1. **Client-side SPA** - No traditional backend, runs entirely on Puter
2. **File-based routing** - React Router v7 conventions in `app/routes.ts`
3. **Component-based architecture** - Reusable components in `app/components/`
4. **Cloud-native storage** - All data via Puter services (KV store, file system, auth)

### Technology Stack
- **React 19.1.1** - UI framework
- **React Router v7.9.2** - Routing
- **TypeScript 5.9.2** - Type safety
- **TailwindCSS 4.1.13** - Styling
- **Vite 7.1.7** - Build tool
- **Zustand 5.0.8** - State management
- **Puter.js** - Cloud platform integration
- **pdfjs-dist** - PDF processing
- **react-dropzone** - File uploads

## Project Structure

```
app/
├── components/          # 12 reusable UI components
├── lib/                 # Core utilities (pdf2img.ts, puter.ts, utils.ts)
├── routes/              # 6 page routes (home, auth, upload, resume, wipe, user)
│   ├── home.tsx         # Dashboard with resume list
│   ├── auth.tsx         # Authentication
│   ├── Upload.tsx       # Resume upload
│   ├── resume.tsx       # Individual resume analysis
│   ├── Wipe.tsx         # Data reset
│   └── user.tsx         # User profile with all resumes
├── root.tsx             # Root component
├── routes.ts            # Route configuration
└── app.css              # Global styles
constants/               # Application constants
types/                   # TypeScript definitions
public/                  # Static assets
build/                   # Production build output
```

### Data Storage Architecture
- **Puter KV Store** - Key-value storage for resume data
  - Key pattern: `resume:*` (wildcard for listing)
  - Stores JSON with feedback scores and metadata
- **Puter File System** - Stores PDF files
- **Puter Auth** - User authentication

### Sample Data Structure
```typescript
interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: {
    overallScore: number; // 0-100
    ATS: { score: number; tips: Tip[] };
    toneAndStyle: { score: number; tips: DetailedTip[] };
    content: { score: number; tips: DetailedTip[] };
    structure: { score: number; tips: DetailedTip[] };
    skills: { score: number; tips: DetailedTip[] };
  };
}
```

## Key Components Flow

```
User Flow:
1. Auth → Sign in via Puter auth
2. Home → View resumes from KV storage
3. Upload → Drag-and-drop PDF → AI analysis → Store results
4. Resume/:id → View detailed feedback with scoring

Component Hierarchy:
├── Navbar
├── Home (ResumeCard[])
├── Upload (FileUploader with dropzone)
├── Resume/:id (ScoreGauge, ScoreBadge, ScoreCircle, Accordion)
├── Auth (Puter auth integration)
├── User (ProfileCard + ResumeCard[])
└── Wipe (data reset)
```

## State Management

The Zustand store (`usePuterStore`) manages:
- Authentication state (user, isAuthenticated)
- File system operations (read/write/upload)
- AI interactions (chat, image-to-text)
- KV storage operations (get/set/list/delete)

## Development Conventions

### File Organization
- **Routes**: Define pages in `app/routes/` using React Router v7 conventions
- **Components**: Place reusable UI components in `app/components/`
- **Utilities**: Core logic in `app/lib/`
- **Constants**: Application-wide constants in `constants/index.ts`
- **Types**: TypeScript definitions in `types/`

### Code Style
- **TypeScript required** - All code must be TypeScript
- **TailwindCSS** - Utility-first CSS styling
- **Path aliases** - `~/*` maps to `./app/*` (configured in tsconfig.json)

### No Testing Infrastructure
**Important**: This project lacks automated testing. No Jest, Vitest, or testing library dependencies found. Be cautious when making changes and consider adding tests if significantly refactoring.

## Important Files

- `react-router.config.ts` - React Router configuration (SPA mode)
- `vite.config.ts` - Vite and TailwindCSS configuration
- `tsconfig.json` - TypeScript configuration with path aliases
- `app/routes.ts` - Route definitions
- `constants/index.ts` - AI prompt templates and feedback formats
- `.claude/settings.local.json` - Claude IDE permissions

## Recent Development Activity

Active development (Oct-Nov 2025):
- `e040853` - User properly added
- `264996a` - Added user section but needs improvements
- `4834bcf` - Added wipe data functionality
- `e0f26a7` - Fixed resume fetching and ResumeCard errors
- `3a6bf81` - Implemented resume feedback components
- `75ef16b` - Created feedback page with PDF.js integration
- `b321e04` - Authentication implementation

## Common Development Tasks

### Adding a New Route
1. Create route component in `app/routes/your-page.tsx`
2. Add route to `app/routes.ts` with path pattern
3. Update navigation if needed

### Modifying AI Feedback
- AI prompt templates are in `constants/index.ts`
- Feedback structure is defined in the same file
- Modify prompt formats to change AI analysis behavior

### Working with Resume Data
- Reading resumes: Use `usePuterStore().kvGet()` with key pattern `resume:*`
- Writing resumes: Use `usePuterStore().kvSet(resumeId, resumeObject)`
- File uploads: Use `usePuterStore().fsUpload()`
- PDF processing: Use `pdf2img.ts` from `app/lib/`

### Troubleshooting
- **PDF rendering issues**: Check `pdfjs-dist` configuration
- **Route not loading**: Verify route definition in `app/routes.ts`
- **Type errors**: Run `npm run typecheck` to validate
- **Build failures**: Check Vite config and React Router v7 compatibility

## Claude IDE Settings

Configured permissions in `.claude/settings.local.json`:
- Can read project files
- Can run common bash commands (tree, cat, etc.)
- Access restricted to project directory only
