---
title: "Afristereo: A Culturally Grounded Dataset for Evaluating Stereotypical Bias in LLMs"
excerpt: "We've built the first open-source African stereotype dataset and evaluation framework grounded in local socio-cultural contexts, to evaluate LLMs for Afro-specific bias."
header:
    teaser: afristereo_out.png
collection: portfolio
---

This project was done at [YUX Design](https://yux.design/), a Dakar-based research firm, through the Stanford SEED program in the Summer of 2025. 

Collaborators: Yann Le Beux, Oluchi Audu, Oche David Ankeli, Melissah Weya, Marie Daniella Ralaiarinosy

Work was presented at the [AfricaNLP](https://sites.google.com/view/africanlp2026/home) Workshop, as part of [EACL 2026](https://2026.eacl.org/), held at Rabat, Morocco. 

## Motivation

Existing AI bias evaluation benchmarks largely reflect Western perspectives, leaving African-specific contexts under-represented. This leads to LLMs potentially reproducing harmful stereotypes in African-specific contexts across various domains. To address this gap, we introduce AfriStereo, the first open-source African stereotype dataset and evaluation framework grounded in local socio-cultural contexts. This dataset, which contains over 5000 stereotype anti-stereotype pairs, can be used to evaluate various LLMs for Afro-specific bias. 

## Methodology

Closely following the methodology of Google Research's [SPICE](https://arxiv.org/pdf/2307.10514) dataset, we collected stereotypes by surveying respondents across African countries such as Senegal, Kenya, and Nigeria.  Using few-shot prompting with human-in-the-loop validation, we augmented the dataset to over 5,000 stereotype–antistereotype pairs. Entries were manually annotated and verified by culturally-informed reviewers. Using this dataset, we evaluated the Bias Preference Ratio (BPR) of various LLMs, measuring their tendency to have systemic preferences for stereotypes over anti-stereotypes. We found that quite a few of the LLMs we evaluated show statistically significant biases. 

![bias values](/images/afristereo_bias.png)

More details on the methodology and the results can be found in the paper attached below. 

## Links

- [📄 ArXiv Paper](https://arxiv.org/pdf/2511.22016)
- [💻 GitHub Repository](https://github.com/YUX-Cultural-AI-Lab/Afri-Stereo)