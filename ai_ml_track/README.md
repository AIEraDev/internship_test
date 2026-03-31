# TaxStreem Internship — AI / ML Track

---

## Overview

Welcome to the TaxStreem AI/ML Internship Assessment.

This is not a Kaggle competition. We are not optimising for accuracy scores. We are evaluating **how you reason through an ambiguous problem, make deliberate modeling decisions, and communicate your thinking** — exactly what you'll do as part of our AI team.

> ⏱️ **Time Budget:** 3–4 hours maximum. A clear, reasoned partial solution beats a chaotic complete one.

---

## Background

TaxStreem processes thousands of financial transactions daily. A recurring challenge is **semantic transaction grouping**: given a raw list of transaction descriptions from different sources, automatically cluster and label them into meaningful categories.

This matters because:
- Users expect clean, readable transaction histories
- Downstream tax logic depends on accurate categorisation
- Raw bank descriptions are noisy, inconsistent, and abbreviated

---

## The Task: Intelligent Transaction Grouper

You will build a system that takes a raw list of transaction descriptions and groups them into labelled semantic clusters — then explains the grouping.

---

## Input

```json
[
  "Uber trip 1200",
  "UBER EATS ORDER 3400",
  "uber ride lagos 1100",
  "Netflix subscription 4500",
  "NETFLIX.COM 4500",
  "Amazon Web Services invoice",
  "AWS charges July",
  "Bolt ride 900",
  "BOLT TECHNOLOGIES 1050",
  "Paystack transfer fee",
  "Flutterwave payout 15000",
  "MTN airtime recharge 500",
  "MTN data bundle 1200",
  "Airtel subscription 800",
  "Shoprite purchase 3200",
  "Shoprite Lagos 2800"
]
```

---

## Expected Output

```json
{
  "groups": [
    {
      "label": "Ride-hailing",
      "items": ["Uber trip 1200", "uber ride lagos 1100", "Bolt ride 900", "BOLT TECHNOLOGIES 1050"],
      "confidence": "high",
      "explanation": "Grouped by semantic similarity to transportation/ride services..."
    },
    {
      "label": "Food Delivery",
      "items": ["UBER EATS ORDER 3400"],
      "confidence": "medium",
      "explanation": "Uber Eats is distinct from Uber rides — food delivery, not transport..."
    },
    {
      "label": "Streaming",
      "items": ["Netflix subscription 4500", "NETFLIX.COM 4500"],
      "confidence": "high",
      "explanation": "Exact semantic match — same service, different raw string formats..."
    },
    {
      "label": "Cloud Infrastructure",
      "items": ["Amazon Web Services invoice", "AWS charges July"],
      "confidence": "high",
      "explanation": "AWS is the known acronym for Amazon Web Services..."
    },
    {
      "label": "Payment Processing",
      "items": ["Paystack transfer fee", "Flutterwave payout 15000"],
      "confidence": "medium",
      "explanation": "Both are Nigerian fintech payment processors..."
    },
    {
      "label": "Telecoms",
      "items": ["MTN airtime recharge 500", "MTN data bundle 1200", "Airtel subscription 800"],
      "confidence": "high",
      "explanation": "MTN and Airtel are mobile network operators..."
    },
    {
      "label": "Retail / Grocery",
      "items": ["Shoprite purchase 3200", "Shoprite Lagos 2800"],
      "confidence": "high",
      "explanation": "Same retail chain, different transaction descriptions..."
    }
  ],
  "ungrouped": [],
  "summary": {
    "total_input": 16,
    "total_groups": 7,
    "ungrouped_count": 0
  }
}
```

---

## Implementation Paths (Choose ONE or combine)

### Option A — LLM-Powered Approach (Recommended)
Use an LLM (OpenAI GPT, Anthropic Claude, Gemini, or open-source via Ollama) via API or SDK.

- Design a prompt that performs semantic grouping
- Parse and structure the output
- Handle edge cases in the LLM response (hallucinations, malformed JSON)

> **Focus:** Prompt engineering quality, output reliability, cost-awareness

### Option B — Classical NLP / Embedding Approach
Use sentence embeddings + clustering (e.g. `sentence-transformers` + HDBSCAN or KMeans).

- Embed descriptions using a pre-trained model
- Cluster using a suitable algorithm
- Label clusters using most representative member or LLM post-processing

> **Focus:** Clustering design, label generation, threshold decisions

### Option C — Hybrid (Strongest signal)
Use embeddings for initial clustering + LLM for label generation and explanation.

> **Focus:** System design, tool orchestration, quality vs cost trade-offs

---

## Requirements (Must Have)

- [ ] Accepts the input list and produces structured grouped output
- [ ] Each group must have: label, items, confidence, explanation
- [ ] A `summary` section with counts
- [ ] Python (preferred) or TypeScript implementation
- [ ] Edge case handling: duplicate descriptions, single-item groups, ambiguous items
- [ ] README documenting your approach

## Bonus (Top 10% separators)

- [ ] Cost estimation — how much does your solution cost per 1,000 transactions?
- [ ] Evaluation metric — how would you measure grouping quality without ground truth labels?
- [ ] Streaming output for large inputs
- [ ] Configurable confidence threshold
- [ ] Unit tests for the parsing/post-processing logic

---

## Technical Constraints

- You may use any LLM API (bring your own key — note this in your README)
- You may use HuggingFace models, Ollama local models, or any open-source embedding model
- Python 3.10+
- No use of ai libs e.g langchain. we want your raw implementation
- CPU-only solution

---

## Project Structure (Expected)

```
ai_ml_task/
├── src/
│   ├── grouper.py            # Core grouping logic
│   ├── prompt_templates.py   # LLM prompts (if applicable)
│   ├── embeddings.py         # Embedding logic (if applicable)
│   └── main.py               # Entry point
├── tests/
│   └── test_grouper.py
├── data/
│   └── sample_input.json     # The input list above
├── requirements.txt
├── .env.example
└── README.md
```

---

## What NOT To Do

- Do not just dump raw LLM output without parsing and validating it
- Do not hardcode the groupings — your solution must generalise to new inputs
- Do not optimise for the sample data specifically — think generalisation
- Do not skip the `explanation` field — this is intentional
- Do not submit a Jupyter notebook as your only deliverable — include a runnable script

---

## Evaluation Focus Areas

This track is evaluated differently from backend/frontend. We care most about:

**How do you think?**
- Do you understand the difference between semantic similarity and syntactic similarity?
- Do you make deliberate choices about clustering thresholds and confidence?
- Do you acknowledge what your approach gets wrong?

**How do you communicate?**
- Can you explain your reasoning clearly, in plain language?
- Do you surface trade-offs instead of pretending they don't exist?

---

## Submission

- GitHub repo (preferred) OR zip archive
- Must run with: `pip install -r requirements.txt && python src/main.py`
- Deadline: **72 hours from receipt**
- Include a `README.md` (see below)

---

## Required README Contents

1. **Approach** — which implementation path did you choose and why?
2. **Prompt Design** (if LLM) — what's your prompting strategy? What did you try that didn't work?
3. **Assumptions** — what did you assume about the problem?
4. **Trade-offs** — what does your solution get wrong? What would break it?
5. **Evaluation** — how would you measure whether it's working well?
6. **Cost estimate** — rough cost per 1,000 transactions (even ballpark)
7. **How to run** — exact commands, including env var setup

---

## Evaluation Rubric

| Area                                          | Weight |
|-----------------------------------------------|--------|
| Problem reasoning & approach quality          | 30%    |
| Output correctness & structure                | 30%    |
| Communication (README + explanations)         | 20%    |
| Code quality & reliability                    | 20%    |

---

## A Note on AI Tool Usage

You may use AI tools (Copilot, ChatGPT, etc.) during the task. We don't care. What we will test in the review call is whether **you can explain every line of your submission**. If you can't, it shows and it ends the conversation.

---

## Questions?

If the problem is unclear or you want to propose an alternate interpretation — ask. Clarity is a professional skill.

**— TaxStreem Data & AI Team**
