---
slug: etic-question-generator
title: ETIC Question Generator
period: "2026"
category: AI / LLM
role: Fine-tuning & evaluation
stack:
  - Python
  - PyTorch
  - Transformers
  - PEFT
  - TRL
  - Unsloth
  - LLaMA 3.1
summary: Undergraduate thesis — fine-tuning LLaMA 3.1 8B Instruct with LoRA to generate English test simulation questions for the ETIC Structure section.
---

## Context

The English Language Division at PPB UIN Jakarta assembles ETIC listening and structure items by hand. Producing new question variants at volume is slow and repetitive, and the work is constrained by a fixed grammar-skill syllabus.

This project asked a narrow question: can a small, cheaply fine-tuned open model generate *new* Structure-section items that keep the ETIC format, rather than reproducing items it has already seen?

It is a supporting tool. It is **not** an official item-generation or item-approval system, and it has not been deployed in the institution.

## My role

Sole author. I designed the data pipeline, ran the fine-tuning, built both inference scenarios, ran all four evaluation metrics, and wrote the thesis.

## Approach

**Data.** 550 questions in total: 470 used for training from *Longman Complete Course for the TOEFL Test*, and 80 held out for testing from the ETIC PPB item bank. Everything was formatted as instruction / input / output, following the OSEMN workflow. Cleaning covered structural completeness checking and de-duplication, and the items were labelled across 20 grammar-skill categories.

**Training.** LLaMA 3.1 8B Instruct was loaded in 4-bit (bnb-4bit) from the Unsloth repository, and adapted with LoRA rather than fully fine-tuned — the point was to fit a useful experiment inside a single free Colab GPU.

Key configuration: LoRA rank **r = 32**, **lora_alpha = 64**, lora_dropout 0.05, targeting q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, and down_proj. Max sequence length 2048, seed 3407. That came to **83,886,080 trainable parameters out of 8,114,147,328 — 1.03%**.

Training ran for 2 epochs / **236 steps** in about **709 seconds** at learning rate 5×10⁻⁵, fp16, paged_adamw_8bit with a cosine schedule. Final training loss was **1.3605**, down from 2.7985 at step 20. Environment: Colab Tesla T4 (14.56 GB VRAM), CUDA 12.8, Python 3.12.13.

**Evaluation.** BLEU, BERTScore F1, and ROUGE-1/2/L, measured across two prompt scenarios.

## What was built

| Scenario | BLEU | BERTScore F1 | ROUGE-1 | ROUGE-2 | ROUGE-L |
|---|---|---|---|---|---|
| A — standard prompt | 0.0842 | **0.8729** | 0.2747 | 0.0188 | 0.2373 |
| B — Islamic-context prompt | 0.0693 | **0.8443** | 0.2555 | 0.0106 | 0.2143 |

## Outcome

The metric pattern is the result worth reading. BLEU and ROUGE are low while BERTScore is high — for question generation that is the **desired** shape: the output is lexically different from the reference but semantically equivalent. The model produced new variants rather than reproducing memorised items, which was the entire question.

Prompt scenario B dropped consistently across every metric (≈3.3% on BERTScore, ≈17.8% on BLEU) — the measurable cost of steering the model toward Islamic context.

PPB's Coordinator of the English Language Division reviewed the output qualitatively: all generated items met the basic ETIC format (stem, four choices, one key), and most matched the requested grammar skill.

I make no claim beyond that review. The project did not measure institutional efficiency, and it did not replace any official question-development process.

## What I would do differently

Reference-based metrics are a blunt instrument for generative tasks — the BLEU/BERTScore split told me *that* variety improved, not *why*. A grammar-skill classification check on the generated items would have measured the thing the syllabus actually cares about. I would also have run a third prompt scenario to isolate which part of scenario B caused the drop.
