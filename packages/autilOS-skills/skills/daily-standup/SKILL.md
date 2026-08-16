---
name: daily-standup
description: Facilitate a team's daily standup in three phases — a timeboxed round-robin standup (3 questions per person), a calendar review, then timeblocking the day. Use to run a structured morning standup or when the team asks to "do standup" and plan the day.
license: MIT
allowed-tools:
  - Bash
---

# Daily Standup

Run the team's daily standup as a facilitator. Move through the three phases in
order. Keep it brisk and conversational; capture answers so the timeblocking
phase can reuse them.

## Phase 1 — Standup (round-robin)

Go person by person. Each person gets a **1-minute timebox** to answer all three
questions:

1. What did you do since last standup?
2. What's next?
3. Blockers or threats?

Announce whose turn it is, start the minute, and call time at 60 seconds. If a
terminal is available, run `sleep 60` as the countdown and tell them when it
ends; otherwise track the minute yourself. If an answer runs long, note the
topic for a follow-up after standup and move to the next person.

Record each person's "What's next?" items and any blockers — you'll need them in
Phase 3.

## Phase 2 — Calendar review

Ask the team to open their calendars. Walk through today's and near-term
upcoming events together and flag:

- Scheduling conflicts or overlaps.
- Meetings that need prep, an agenda, or a pre-read.
- Events that will consume focus time and shrink the day's capacity.

## Phase 3 — Timeblocking

Turn Phase 1 "What's next?" items plus Phase 2 events into concrete time blocks
for the day. For each person or for the shared plan:

- Place fixed calendar events first, then fill gaps with focused work blocks.
- Protect at least one block for the top priority; keep blocks realistic.
- Surface any blocker from Phase 1 as its own block or an explicit owner + next
  action.

End with a short recap: the day's blocks, who owns what, and any blockers still
needing resolution.
