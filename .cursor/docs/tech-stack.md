### **Rational Mind Web App - Tech Stack Document**

**Version:** 1.0
**Date:** June 13, 2025
**Status:** Active

#### **1. High-Level Architecture**

The Rational Mind web application will be a modern, serverless frontend application that acts as a new "head" for the existing backend infrastructure. The architecture is explicitly designed for development velocity, performance, and scalability.

  * **Frontend:** A **Next.js** application, rendered server-side and statically for optimal performance, hosted on **Cloudflare Pages**.
  * **Backend:** The existing **Supabase** project will be reused in its entirety. The web app is a new client that consumes the same database, authentication, and Edge Functions as the mobile app. **No backend development is required.**
  * **Deployment:** Continuous integration and deployment via a GitHub to Cloudflare Pages workflow.

-----

#### **2. Frontend Technology Stack**

##### **2.1. Core Framework**

  * **Framework:** **Next.js** (v14+)
  * **Language:** **TypeScript**
  * **Routing:** Next.js **App Router**
  * **Reasoning:** Chosen for its seamless React ecosystem compatibility, which allows for maximum code reuse from the React Native app. Its file-based routing mirrors Expo Router, and its server-side rendering (SSR) and static site generation (SSG) capabilities are ideal for performance and deployment on Cloudflare.

##### **2.2. Styling**

  * **Library:** **Tailwind CSS**
  * **Configuration:** The `tailwind.config.ts` file will be a direct copy of the mobile app's configuration to ensure 100% visual consistency. All styling will be implemented using utility classes.
  * **Rationale:** This is non-negotiable for development speed and maintaining the brand's aesthetic.

##### **2.3. State Management**

  * **Primary Method:** **React Context** combined with `useState` and `useEffect` hooks.
  * **Authentication State:** A root `AuthProvider` context will be created to manage the user's session state across the entire application, adapted directly from `hooks/useAuth.tsx`.
  * **Onboarding State:** A dedicated `OnboardingProvider` will manage the state of the multi-step form, adapted from `contexts/OnboardingContext.tsx`.

##### **2.4. Data Fetching & Communication**

  * **Supabase Client:** The official `@supabase/ssr` library will be used to create client and server components that can interact with the Supabase backend.
  * **Real-time Chat:** The browser's native **`EventSource` API** will be used to connect to the `openai-chat` Supabase Edge Function and handle the Server-Sent Events (SSE) stream for real-time AI responses.
  * **Standard Data:** Standard `async/await` fetch calls will be used within React Server Components or `useEffect` hooks for fetching data like session history and user profiles.

-----

#### **3. Backend Services (Existing)**

The web application will connect to and reuse the following existing Supabase services without modification.

  * **Authentication:** Supabase Auth (Email/Password, Apple Sign-In).
  * **Database:** Supabase PostgreSQL with the `pgvector` extension.
  * **Edge Functions (Deno/TypeScript):**
      * `openai-chat`: The core conversational engine. The web app will consume its SSE stream.
      * `create-session`, `process-session-end`: Manage the session lifecycle.
      * `transcribe-audio`: Handles voice-to-text processing.
      * `stripe-webhook`: Manages subscription status updates from Stripe.
      * `create-customer-portal-session`: (or a new variant) will be called to initiate Stripe Checkout sessions.

-----

#### **4. Third-Party Services & APIs**

  * **Payments:** **Stripe**
      * **Integration:** Stripe Checkout (Redirects). A Next.js API route will be used as a secure intermediary to create the checkout session. This API route will be the only part of the web app with server-side logic that calls a Supabase function.
  * **Hosting & Deployment:** **Cloudflare Pages**
      * **Workflow:** The GitHub repository will be linked to a Cloudflare Pages project. On every push to the `main` branch, Cloudflare will automatically build and deploy the Next.js application.
      * **Environment Variables:** All keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `STRIPE_SECRET_KEY`, etc.) will be stored securely in the Cloudflare Pages project settings.

-----

#### **5. Development & Tooling**

  * **Package Manager:** `npm`
  * **IDE:** Any modern code editor (e.g., VS Code with Cursor).
  * **Version Control:** Git, hosted on GitHub.
  * **Code Linting:** ESLint, configured by `create-next-app`.