# Peds-OR Prototype

Peds-OR (Pediatric Surgical Intelligence System) is a mobile-first clinical decision support prototype for pediatric surgeons.

This is a rapid, tap-first interface designed for use under pressure. It is not a textbook reader. Each screen is optimized to answer one question:

What should I do next?

## Core Goals

- Mobile-first user experience for iPhone-sized screens
- Fast navigation with minimal cognitive load
- Dark clinical interface with urgency color coding
- Decision flows and action cards instead of long paragraphs
- No backend dependency, all data loaded locally

## Implemented Demo Scope

The current prototype includes the intended demo subset:

- Home screen
- Search experience with advanced filter chips
- One full topic screen with interactive flow
- 2 AM Mode rapid action screen

## Screens and Capabilities

### 1) Home

- Search bar and voice icon button
- Quick entry buttons:
	- Symptoms
	- Diagnoses
	- Situations
- Highlighted 2 AM Mode button
- Context cards:
	- Case of the day
	- Pearl
	- Mistake

### 2) Search

- Clinician-style search matching phrases like:
	- baby not feeding
	- green vomit baby
- Horizontal scrollable filter chips for:
	- Entry Type: Symptom, Diagnosis, Situation
	- Age: Neonate, Infant, Child
	- Urgency: Emergency, Urgent, Routine
	- System: GI, Respiratory, Trauma, General surgery
	- Setting: ER, NICU, Ward, Post-op
- Combined search and filter logic

### 3) Results

- Card-based results with:
	- Title
	- Short description
	- Tags
	- Urgency color marker
- Tap a card to open topic details

### 4) Topic (full clinical screen)

- Quick Decision Flow with interactive branching
- Step-by-step management cards
- Investigations list cards
- Risk alerts in red
- Pearls and Pitfalls split view
- Mnemonic highlight block
- Mentor Mode mock audio panel
- Parent Mode explanation block
- Global toggle:
	- Resource-rich
	- Resource-limited

### 5) 2 AM Mode

Full-screen minimal interface with large, immediate-action buttons:

- Vomiting
- Distension
- Trauma
- Bleeding

This is the primary high-pressure workflow feature.

## Design System

- Theme: dark blue background with gold primary accents
- Urgency semantics:
	- Red = emergency, act now
	- Yellow = urgent, investigate quickly
	- Green = routine/safe observation

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
- Local JSON data source (no backend)

## Data Source

Clinical content is hardcoded in local JSON and loaded on the client.

Includes:

- One fully detailed topic for end-to-end decision flow demo
- Additional topic records for realistic search and filter behavior

## Project Structure

- app/page.tsx: single-page app state and screen routing
- app/data/topics.json: local topic dataset
- app/types/topic.ts: shared clinical type definitions
- app/components: reusable UI components

## Run Locally

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

http://localhost:3000

## Quality Checks

Lint:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

## Demo Walkthrough for Surgeons

Use this exact flow in presentations:

1. Open app in phone viewport.
2. Type: baby not feeding.
3. Show filtered search results.
4. Open the full topic.
5. Highlight:
	 - Decision flow
	 - Red risk alerts
	 - Step-by-step actions
6. Switch to 2 AM Mode for rapid triage workflow.

## Future Extensions

- Add more full topic flows across systems
- Add multilingual parent explanations
- Add offline audio mentor clips
- Add analytics for decision path usage in simulation environments
