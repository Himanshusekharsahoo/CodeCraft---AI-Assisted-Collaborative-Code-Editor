# ⚡ CodeCraft - AI-Assisted Collaborative Code Editor

## Overview

CodeCraft is a next-generation AI-powered code editor with real-time multi-user collaboration. It offers a seamless, intelligent coding experience by integrating AI-driven suggestions, live code editing, and advanced file management, making team-based development more efficient.

## Problem Statement

Developers often face challenges when collaborating in real-time, managing multiple code files, and ensuring code quality. CodeCraft addresses these issues by providing:

- **Real-time multi-user editing:** Simultaneous code collaboration without conflicts.
- **AI-powered coding assistance:** Smart code suggestions, auto-documentation, and syntax correction.
- **Efficient workspace management:** Organized file handling with structured project hierarchies.
- **Seamless synchronization:** Automatic saving and real-time updates of code, files, and user interactions.

## Solution Architecture

### Core Features

#### 1. Authentication & Database
- **Firebase Authentication & Firestore:**
  - Google & Email/OTP-based authentication.
  - Secure password management and account recovery.
  - Real-time synchronization using Firebase Realtime Database.

#### 2. AI Integration
- **Google Gemini API:**
  - AI-driven code suggestions, error correction, and auto-documentation.
  - Real-time syntax correction and linting.
- **AI Chatbot:**
  - Inbuilt chatbot for coding help, debugging, and documentation.

#### 3. Real-Time Collaboration
- **Live Cursor Tracking:** Displays active users' cursors with personalized colors and names.
- **Workspace Invitations:** Allows users to invite collaborators to join workspaces.
- **Real-Time Chat:** Instant messaging for discussions and code sharing.
- **Autosave & Synchronization:** Continuous saving of code edits to prevent data loss.

#### 4. Code Editor & UI
- **Monaco Editor:**
  - Multi-language support with syntax highlighting.
  - Customizable themes, font sizes, and collapsible code sections.
- **File Navigation Panel:**
  - Recursive file structure for organized management.
  - Drag-and-drop support for file reordering.
  - Live updates across all users in a workspace.

## Tech Stack

| Component                  | Technology                                          |
|----------------------------|-----------------------------------------------------|
| **Frontend**               | React.js, Next.js, Tailwind CSS, Shadcn UI          |
| **Code Editor**            | Monaco Editor                                       |
| **Realtime Backend**       | Firebase Realtime Database & Firestore              |
| **AI Services**            | Google Gemini API, OpenAI API                       |
| **Authentication**         | Firebase Authentication (Google & Email/OTP)        |
| **Backend (API Gateway)**  | Next.js API Routes                                  |
| **State Management**       | Zustand                                             |
| **Deployment**             | Vercel, Firebase Hosting                            |
| **Language**               | JavaScript, TypeScript                              |

## Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Himanshusekharsahoo/CodeCraft.git
   cd CodeCraft
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project.
   - Enable Authentication (Google & Email/OTP).
   - Configure Firestore and Realtime Database.
   - Add your Firebase configuration to `.env.local`.

4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.
