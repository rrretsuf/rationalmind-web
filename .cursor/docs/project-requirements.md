### **Rational Mind Web App - Project Requirements Document (PRD)**

**Version:** 1.0
**Date:** June 13, 2025
**Status:** Active

#### **1. Overview & Strategic Purpose**

##### **1.1. Application Name**

Rational Mind

##### **1.2. Web Application's Core Mandate**

This document outlines the requirements for a web-based version of the existing "Rational Mind" React Native application. The web app's primary strategic purpose is twofold:

1.  **Primary User Onboarding & Monetization Engine:** The web app will be the exclusive platform for new user sign-ups and the sole point of payment for premium subscriptions via Stripe. It serves as the primary gateway into the Rational Mind ecosystem.
2.  **High-Fidelity Conversational Platform:** It will provide a near-identical, mobile-first conversational experience to the native app, allowing users to engage with their AI companion seamlessly in a web browser.

##### **1.3. Target Audience & Acquisition Channel**

  * **Primary Demographic:** 16-25 year olds.
  * **Primary Acquisition Channel:** Organic TikTok marketing driving traffic directly to the web application. This dictates a critical requirement: **The web experience must be flawlessly optimized for mobile browsers.**

-----

#### **2. Key User Flows**

##### **2.1. New User Acquisition & Onboarding**

1.  A user discovers Rational Mind via TikTok and clicks a link to the web app's landing page.
2.  The user signs up using Email/Password or Apple Sign-In.
3.  Upon successful registration, the user is immediately funneled into a multi-step onboarding process (adapted from the mobile app) to establish their initial profile.
4.  At the end of onboarding, the user is presented with the paywall/pricing page.
5.  The user can either subscribe to a premium plan or continue with the free, message-limited tier.
6.  The user lands on the main chat interface, ready for their first session.

##### **2.2. Core Conversational Loop**

1.  An authenticated user (free or premium) navigates to the main session screen.
2.  The user initiates a conversation by typing or using voice-to-text (STT).
3.  The input is sent to the existing `openai-chat` Supabase Edge Function.
4.  The AI's response is streamed back in real-time via Server-Sent Events (SSE), creating a fluid, interactive experience.
5.  The conversation continues, with the AI leveraging the full context-memory system from the backend.

##### **2.3. Subscription & Monetization Flow**

1.  A free-tier user hits their daily message limit. They are presented with a modal prompting them to upgrade.
2.  The user is directed to the pricing page.
3.  The user selects a subscription plan and is redirected to a Stripe Checkout session.
4.  Upon successful payment, the `stripe-webhook` function updates their profile status in Supabase.
5.  The web app UI reflects their new premium status, unlocking unlimited messaging and features.

-----

#### **3. Core Features & Requirements**

##### **3.1. Authentication**

  * **Must** support Email/Password and Apple Sign-In.
  * **Must** integrate seamlessly with the existing Supabase Auth service.
  * **Must** protect all authenticated routes from public access.

##### **3.2. Onboarding**

  * **Must** replicate the exact multi-step flow from the React Native app (`app/(onboarding)/`).
  * **Must** save user responses to the `profiles` table in the Supabase database via the existing services.

##### **3.3. Chat Interface**

  * **Must** be a visually identical replica of the mobile app's `app/(main)/session.tsx`.
  * **Must** implement real-time, streaming responses using SSE from the `openai-chat` function.
  * **Must** support text input and voice-to-text (STT) via the browser's Web Speech API or by calling the `transcribe-audio` function.
  * The UI must feel fluid and performant, especially on mobile devices.

##### **3.4. Session History & Profile Management**

  * **Must** provide read-only access to past session transcripts, fetched from the existing backend.
  * **Must** allow users to view their AI-generated "Dynamic Profile" and "Main Pattern".
  * **Must** allow users to sign out and delete their account.

##### **3.5. Subscription & Billing**

  * **Must** integrate Stripe Checkout for handling subscriptions.
  * **Must** present clear pricing tiers (Free vs. Premium).
  * **Must** correctly handle the post-payment flow to unlock premium features based on the `subscription_status` field in the user's profile.

##### **3.6. UI/UX & Responsiveness**

  * **Critical Requirement:** The application **must** be designed mobile-first. The experience on a mobile browser should be indistinguishable from a native application.
  * **Must** maintain the dark, minimalist, glassy/gradient aesthetic of the mobile app. All styling must be achieved with Tailwind CSS, referencing the existing `tailwind.config.js`.
  * The layout must be fully responsive and function flawlessly on desktop browsers without compromising the mobile experience.

-----

#### **4. Scope**

##### **4.1. In-Scope for Launch**

  * All features listed in Section 3.
  * A fully functional, production-ready web application deployed on Cloudflare Pages.
  * End-to-end user journey from landing page to active, paying user.

##### **4.2. Out-of-Scope for Launch**

  * Any feature not present in the existing React Native application.
  * Redesigning or altering existing user flows.
  * Building a separate administrative dashboard.
  * Native mobile features that do not have a web equivalent (e.g., native push notifications).