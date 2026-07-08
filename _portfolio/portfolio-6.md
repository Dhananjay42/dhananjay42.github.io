---
title: "Mapping Socio-Ecological Change in the Red Corridor using GIS"
excerpt: ""
header:
    teaser: caste_bias_out.png
collection: portfolio
---

Collaborators: Anka Reuel, Max Lamparth.

Course project done as part of CS134: Introduction to AI Governance, Winter 2024-25 quarter. 


## Motivation
As AI systems become increasingly prevalent in India and are integrated into decision-making across critical domains such as governance, healthcare, and education, it is essential to examine the structural discrimination they may perpetuate. While substantial research has investigated biases in large language models (LLMs) based on race, gender, and other protected characteristics, relatively little work has focused on auditing these models for caste bias. This gap is particularly significant in the Indian context, where caste continues to shape social, economic, and institutional outcomes. Understanding whether LLMs reproduce or amplify caste-based biases is therefore an important step toward ensuring that AI systems are fair and equitable.

## Methodology
We use the Word Embedding Association Test (WEAT) to measure bias by comparing the cosine similarity between two groups of entities (G₁, G₂) and two sets of attributes (A₁: positive, A₂: contrastive) to assess association differences. This is defined as:
$$  
S(G_1, G_2, A_1, A_2) = \frac{1}{|G_1|} \sum_{g_1 \in G_1} S(g_1, A_1, A_2) - \frac{1}{|G_2|} \sum_{g_2 \in G_2} S(g_2, A_1, A_2)
$$

where we define $$S(w, A_1, A_2)$$ as:

$$
S(w, A_1, A_2) = \frac{1}{|A_1|} \sum_{a_1 \in A_1} \cos(w, a_1) - \frac{1}{|A_2|} \sum_{a_2 \in A_2} \cos(w, a_2)
$$

The high-level idea here is that given a set of positive and negative adjectives, and terms associated with being either "upper" caste or "lower" caste, we can evaluate the WEAT score which measures the tendency for the models to associate a set of adjectives more with a certain group. We would like these scores to be close to 0, with large values indicating statistically significant biases in either direction. This is what our results look like:

![Caste Bias Scores](/images/caste_bias_out.png)

*Figure 1: WEAT scores for various LLMs across regional languages*

We observe that there are pretty high-values for the WEAT scores, indicating that the models have the tendency to show strong bias on the caste axis. A more detailed look at the methodology and code can be found below. 

## Links

- [📄 Full Paper](https://drive.google.com/file/d1P32SYwbMby3-XafMfbEg5_n2tcfN78vC/view)
- [💻 Github Link](https://github.com/Dhananjay42/caste_bias_in_AI)