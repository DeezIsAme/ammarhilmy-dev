---
slug: koperasi-financial-system
title: Cooperative Financial Management System
period: February – March 2025
category: Web · Freelance
role: Front end
stack:
  - Laravel
  - MySQL
  - Blade
  - Tailwind CSS
  - Alpine.js
repo: https://gitlab.com/jakewd7/koperasilaravel
summary: Freelance build for a savings-and-loan cooperative — cash income, expense and transfer transactions, member savings, loan records, and an operational dashboard.
---

## Context

A savings-and-loan cooperative (koperasi) runs on records that have to reconcile: cash coming in, cash going out, transfers between accounts, member savings (simpanan), and loans (pinjaman) with their repayment schedules. The client needed those flows in one system instead of ledgers and spreadsheets kept in parallel.

A teammate and I built it as a freelance project over February and March 2025.

## My role

**Front end.** I built the interface across the system: the transaction forms, the data tables, the dashboard, and the responsive navigation. The backend logic and data layer were my teammate's work.

## Approach

Three constraints drove the front-end work:

**These users enter numbers all day.** A form that is pleasant once and tiring on the twentieth entry is a failed form. Labels sat next to their fields rather than above them, tab order followed the reading order, and validation messages appeared at the field rather than in a summary at the top.

**The tables carry the system.** Members, savings, loans, and transactions are all tables. Getting column alignment, row density, and clear empty states right mattered more than any single screen.

**Feedback has to be unmissable.** Financial actions are consequential, so submissions confirmed with SweetAlert dialogs rather than a subtle inline change, and destructive actions asked first.

## What was built

A Laravel application on MySQL covering cash income, expense, and transfer transactions, member savings, loan records, and a dashboard summarising the position. The front end uses reusable Blade views with Tailwind CSS and Alpine.js — transaction forms, data tables, responsive navigation, dropdowns, and confirmation dialogs. The work is under version control across 13 commits.

## Outcome

The system replaced the parallel records for the covered flows, so the same transaction no longer had to be entered twice into two places that could disagree.

## What I would do differently

The Blade views grew more duplicated than they should have. Two transaction forms that were 80% identical stayed separate files, so a change to one had to be repeated in the other — and once it was missed. Extracting the shared field groups into Blade components, with the differences passed as props, is the refactor I would do before adding a third form.
