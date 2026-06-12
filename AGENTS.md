# Skill-Check Project Instructions

We are building Skill-Check, a premium AI-powered interview practice and evaluation platform.

The product allows candidates to:
- Practice realistic AI-led interviews
- Record their video
- Capture mixed audio containing candidate microphone + AI interviewer voice
- Receive transcript-based feedback
- View interview reports and scores

For now, build frontend UI only.
Do not implement real AI, recording, S3 upload, authentication, database, or payments yet.
Use mock data and clean placeholders.

Tech stack:
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react
- Recharts where charts are needed
- Modular reusable components

Design style:
- Premium SaaS UI
- Inspired by Linear, Vercel, Stripe, and Notion
- Light theme first
- Calm, trustworthy, professional
- Off-white page background
- White rounded cards
- Indigo/blue primary accent
- Subtle cyan/green success accents
- Clean typography using Inter or Geist
- Fully responsive

Code quality:
- Use TypeScript everywhere
- Keep components small and reusable
- Avoid hardcoded repeated UI
- Use realistic dummy data
- Keep files organized
- Prefer readable code over clever code
- Do not add unnecessary dependencies
- Ensure the app runs without backend services

Candidate-first priority:
Build the candidate flow before admin pages.

Main candidate journey:
Landing -> Login -> Dashboard -> Interview Setup -> Waiting Room -> Live Interview -> Processing -> Result -> Upgrade

Important future architecture:
The recording system will later use:
- Browser MediaRecorder
- Web Audio API
- Candidate video track
- Mixed audio track from candidate microphone and AI interviewer audio
- Direct S3 upload using presigned URLs

For now, represent this through UI states and placeholders only.
