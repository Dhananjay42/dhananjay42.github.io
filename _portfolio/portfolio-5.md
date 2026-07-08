--
title: "Enhancing Automatic Speech Recognition Models for Maternal and Reproductive Health: Fine-Tuning and Real-World Evaluation in Wolof"
excerpt: " We have come up with a methodology through which Automatic Speech Recognition (ASR) models can be fine-tuned for specific domains for low-resource languages such as Wolof and Hausa. Specifically, we have fine-tuned these models for the maternal and reproductive healthcare domains."
header:
    teaser: nakala_out.png
collection: portfolio
---

This project was done at [YUX Design](https://yux.design/), a Dakar-based research firm, through the Stanford SEED program in the Summer of 2025. 

Collaborators: Ertony Basilwango, Yann Le Beux, Oche David Ankeli, Pierre Herve Berdys

Work was presented at the [AfricaNLP](https://sites.google.com/view/africanlp2026/home) Workshop, as part of [EACL 2026](https://2026.eacl.org/), held at Rabat, Morocco. 

## Motivation

Current transcription models are not too good at low-resource African languages, and do not support local languages and their linguistic variations. This hinders research and interventions in the application of these models in critical domains, such as healthcare, education, and governance. In this project, we aimed to fine-tune an Automatic Speech Recognition (ASR) model for Wolof for the maternal and reproductive health domain, that is robust to spoken variations, and able to capture the critical information accurately. 

## Methodology

Most African languages are considered "low-resource", which means that there isn't too much high quality textual data available for them. This makes it challenging to train models such as transformers, which require large amounts of data for decent results. Another challenge arrives through the fact that a lot of African languages are spoken, and when they are transcribed into the latin script, there can be different orthographic variations in how you represent different words. It is important that the ground truth data needs to be consistently spelt, so that the model can learn something logical. 

We started by defining keywords, using them to construct sentences in Wolof, and using language speakers to record various versions of each piece of text. After putting together this fine-tuning dataset, we used the LoRA (Low Rank Approximation) training scheme, which is a standard approach towards fine-tuning large models on small amounts of data. While directly attempting to fine-tune the model caused it to overfit, by using LoRA we were able to improve the model performance, which we kept track of using metrics such as CER (Character Error Rate), WER (Word Error Rate), and KER (Keyword Error Rate). The results are visualized below.

![LoRA Training Scheme](/images/nakala_out.png)

The model and further documentation of our work can be found in the below links.

## Links

- [📄 Full Paper](https://aclanthology.org/2026.africanlp-main.27.pdf)
- [💻 Model](https://nakala.ai/)
