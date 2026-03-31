# TaxStreem Internship — Backend Track
### TypeScript / Node.js · Golang (Optional Advanced Path)

---

## Overview

Welcome to the TaxStreem Backend Internship Assessment.

This task is designed to simulate a real-world problem you will encounter working inside our systems. We are not testing whether you know everything — we are testing **how you think, structure your work, and communicate decisions**.

> ⏱️ **Time Budget:** 2–4 hours maximum. Do not exceed this. A clean 2-hour submission beats a half-baked 6-hour one.

---

## The Task: Transaction Reconciliation Microservice (Lite)

Financial systems need to reconcile transactions between internal records and external payment processors. Mismatches reveal bugs, fraud, or integration failures. You're building the core of that system.

### Primary Languages
- **TypeScript / Node.js**
- **Golang** 

---

## Specification

### Endpoint

```
POST /reconcile
Content-Type: application/json
```

### Request Body

```json
{
  "internal": [
    { "id": "TXN-001", "amount": 10000, "currency": "NGN", "reference": "PAY-A" },
    { "id": "TXN-002", "amount": 20000, "currency": "NGN", "reference": "PAY-B" },
    { "id": "TXN-003", "amount": 5000,  "currency": "NGN", "reference": "PAY-C" }
  ],
  "external": [
    { "id": "EXT-A", "amount": 10000, "currency": "NGN", "reference": "PAY-A" },
    { "id": "EXT-B", "amount": 20500, "currency": "NGN", "reference": "PAY-B" },
    { "id": "EXT-D", "amount": 7500,  "currency": "NGN", "reference": "PAY-D" }
  ]
}
```

### Expected Response

```json
{
  "matched": [
    {
      "internal_id": "TXN-001",
      "external_id": "EXT-A",
      "amount": 10000,
      "status": "exact"
    }
  ],
  "near_matched": [
    {
      "internal_id": "TXN-002",
      "external_id": "EXT-B",
      "internal_amount": 20000,
      "external_amount": 20500,
      "difference": 500,
      "status": "tolerance_match"
    }
  ],
  "unmatched_internal": [
    { "id": "TXN-003", "amount": 5000, "reference": "PAY-C" }
  ],
  "unmatched_external": [
    { "id": "EXT-D", "amount": 7500, "reference": "PAY-D" }
  ],
  "summary": {
    "total_internal": 3,
    "total_external": 3,
    "matched": 1,
    "near_matched": 1,
    "unmatched_internal": 1,
    "unmatched_external": 1
  }
}
```

---

## Matching Logic

Implement the following matching strategy (in priority order):

1. **Exact Match** — same `reference` AND same `amount`
2. **Tolerance Match** — same `reference` AND amount difference within ±500 NGN (configurable via env var `TOLERANCE_AMOUNT`)
3. **Unmatched** — anything left over

> The tolerance threshold should be configurable, not hardcoded.

---

## Project Structure (Expected)

```
backend_task/
├── src/
│   ├── routes/
│   │   └── reconcile.ts
│   ├── services/
│   │   └── reconciliationService.ts
│   ├── utils/
│   │   └── matcher.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── tests/
│   └── matcher.test.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## Requirements (Must Have)

- [ ] Working `POST /reconcile` endpoint
- [ ] Exact and tolerance-based matching logic
- [ ] Proper TypeScript types — no `any`
- [ ] Input validation with clear error messages (400 for bad input)
- [ ] `.env.example` with `TOLERANCE_AMOUNT` documented
- [ ] README with setup instructions

## Bonus (Top 10% separators)

- [ ] Unit tests for matching logic (Jest or Vitest)
- [ ] Golang implementation of the same service (separate folder)
- [ ] Structured logging (e.g. pino or winston)
- [ ] Concurrent/parallel matching for large payloads
- [ ] Docker / docker-compose setup

---

## What NOT To Do

- Do not over-engineer. No databases, no auth, no queues needed.
- Do not use `any` in TypeScript — it defeats the purpose.
- Do not submit without running your own code first.
- Do not copy-paste without understanding what it does.

---

## Submission

- GitHub repo (preferred)
- Deadline: **72 hours from receipt**
- Your repo must include a `README.md` (see below)

---

## Required README Contents

Your README **must** answer:

1. **Approach** — how did you design the matching logic?
2. **Assumptions** — what did you assume where the spec was silent?
3. **Trade-offs** — what did you sacrifice for simplicity?
4. **What you'd improve** — with more time, what would you change?
5. **How to run** — clear setup steps (should work on a fresh machine)

> This README is weighted equally to your code. If we can't understand your thinking, your code doesn't matter.

---

## Evaluation Rubric

| Area                          | Weight |
|-------------------------------|--------|
| Code clarity & structure      | 30%    |
| Problem solving & logic       | 30%    |
| TypeScript correctness        | 20%    |
| Communication (README)        | 20%    |

---

## Environment & Tools

- Node.js v20+
- TypeScript v5+
- Golang 1.24+
- Any HTTP framework (Express, Fastify, Elysia — your choice)
- Jest or Vitest for tests

---

## Questions?

If anything is genuinely unclear, email us. We prefer candidates who ask sharp questions over candidates who assume silently and build the wrong thing.

Good luck. Ship something real.

**— TaxStreem Engineering**
