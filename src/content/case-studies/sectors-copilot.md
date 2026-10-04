---
slug: sectors-copilot
title: Sectors Copilot
period: "2026"
category: AI Agent · Web
role: Front end
stack:
  - Laravel
  - Blade
  - Alpine.js
  - Preline UI
  - Tailwind CSS v4
  - Server-Sent Events
summary: Hackathon-built multi-step AI research agent — a Laravel application whose live workspace panel streams the agent's execution steps to the screen as they run.
---

## Context

Sectors Copilot was built for a 2026 hackathon: a research agent that breaks a question into multiple steps, executes them, and reports what it did. The hard part is not the answer — it is making a multi-step process something a user can watch and trust.

The project was still in progress when this was written.

## My role

**Front end.** I built the interface: the module views, the agent workspace, and the streaming panel that renders execution steps as they arrive. The backend and the orchestration logic were a teammate's work.

## Approach

The application is a Laravel 13 project split with `nwidart/laravel-modules` into five modules — Auth, Agent, SectorsData, Admin, and Dashboard. My work lived in the Agent and Dashboard surfaces.

Two front-end decisions shaped everything else:

**Server-Sent Events over polling.** The agent's steps arrive as a stream. Polling an endpoint on a timer would have meant guessing how often steps appear and paying for requests that return nothing. A single streaming response gives each step the moment it exists.

**Progressive rendering over a loading spinner.** A spinner tells the user nothing during a run that may take a minute. Rendering each step as it lands turns a wait into something readable — the user sees which step is running, what it returned, and where it failed.

## What was built

A live workspace panel that streams agent execution steps into the interface as the agent works, built with Blade templates and Alpine.js components on top of Preline UI and Tailwind CSS v4. The orchestration engine underneath is Google Gemini via `google-gemini-php/client`.

## Outcome

The step-by-step panel changed how the tool reads. Instead of a progress indicator and a final answer, a run shows its reasoning in sequence, which makes a wrong turn visible at the step it happened rather than only in the result.

## What I would do differently

Streaming state on the client got tangled as the panel grew. A single reducer-shaped store for step events — one place that owns the stream's state — would have been cleaner than spreading updates across several Alpine components. I would start there next time.
