# Data Directory

This directory is used to store the Yelp Open Dataset files and processed data.

## Contents

* **Raw data**: Original JSON files from Yelp Open Dataset
  * `business.json` - Business information and attributes
  * `user.json` - User profiles and statistics
  * `review.json` - Review text, ratings, and metadata

* **Processed data**: CSV files generated from sampling and transformation
  * `business.csv` - Cleaned business data
  * `user.csv` - User data
  * `review.csv` - Sampled review data (1M records)

## Important Notes

**Everything** in this directory is excluded from git to avoid committing large files.

To obtain the dataset:
1. Visit https://www.yelp.com/dataset
2. Agree to the dataset license terms
3. Download the JSON files
4. Place them in this directory
5. Run the data processing scripts in `code/` to generate CSV files
