---
title: "Analyzing Caste-Based Child Nutrition Disparities Using NFHS-5 Data"
excerpt: "We applied causal inference methods such as difference-in-differences and triple-difference models to evaluate the impact of COVID-19 on child nutrition outcomes across caste groups using India’s NFHS-5 survey data."
header:
    teaser: nfhs_vis.png
collection: portfolio
---

Collaborators: Vedant Sahu, Dr. Dominik Rothenhausler. 

Course project done as part of STATS209: Causal Inference, Winter 2025-26 quarter. 
 
## Motivation

While there are many reasons to believe that there are large structural disparities in India along the lines of caste, quantitatively demonstrating this proves to be quite challenging due to haphazard data-collection processes. Coming to caste specifically, the last caste census was conducted in 2011 (15 years ago at the time of writing this), and hence, there are almosts no recent enumerations of caste in India. While this does reflect a larger symptom of how post-colonial governments operate, as statisticians deeply interested in the subcontinent and in the all-pervasive problem of caste, we wanted to identify approaches of quantifying inequality even in such challenging settings. 

Upon doing some research, we came across the National Family Health Survey (NFHS) data, which measures various healthcare indicators for a sample of the population, which also contains caste information of the respondents. Of particular interest to us is data from NFHS-5 (2019-21) and NFHS-4 (2014-15), both of which are fairly recent. 

![Disparity Visualization](/images/nfhs_vis.png)
*Figure 1: Distribution of child nutrition outcomes across caste groups*


Since we needed our problem to be modelled using a causal inference framework, we exploited another characteristic of the NFHS-5 data. It was conducted in 2 phases, pre-COVID, and post-COVID. Hence, if we were to think of the disparity between certain health metrics between Forward Castes (FC) and Backward Castes (BC) as the "outcome" and COVID as a "treatment", we have a natural way of modelling the causal effect of COVID on worsening existing disparities. For this particular project, we used the disparity in child malnutrition outcomes as the outcome, and performed our analysis at a district-level granularity. Here, the NFHS-4 data is used as historical data, to justify a parallel trends assumption, which directly ties into how the Difference-in-Difference-in-Differences (DDD) approach works. 

## Datasets Used

1. [NFHS-4 and NFHS-5 data](https://dhsprogram.com/data/)
2. [2011 Census Data](https://www.kaggle.com/datasets/danofer/india-census)
3. [COVID Data](https://data.covid19india.org/)

## Outcomes

We tried applying both Difference-in-Differences (DiD) Difference-in-Difference-in-Differences (DDD) approaches. While we did not observe significant effects of COVID on increasing the gap itself, what we observed was undeniably large caste-based disparities in child nutrition outcomes such as stunting and underweight rate. This is seen in the table below, and specific details on methodology can be found in the report attached at the end. 

![Table showing baseline disparities in health outcomes](/images/nfhs_out.png)

We believe that the methodology and the data used can be greatly useful in quantifying caste-based disparities in India currently, and the code we've used to carry out our analysis can be found in the below github repository. 

## Links

- [📄 Full Report](https://drive.google.com/file/d/1WklR7de31OOvLqfXIvoWT1XNOkjB4RMN/view?usp=sharing)
- [💻 GitHub Repository](https://github.com/Vedant-Sahu/covid-heterogenous-effect/tree/main)