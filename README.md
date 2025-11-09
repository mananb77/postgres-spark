# Yelp Dataset Analysis: PostgreSQL vs Apache Spark

## Overview

This project performs a comprehensive analysis of the Yelp Open Dataset by comparing the performance and capabilities of two different data processing systems:

- **PostgreSQL**: A traditional relational database management system
- **Apache Spark**: A distributed data processing framework

The project demonstrates how to work with large-scale real-world data (millions of reviews, users, and businesses) and compares the trade-offs between relational and distributed processing approaches.

## Project Goals

- Load and process the Yelp Open Dataset (reviews, businesses, and users)
- Design an efficient relational database schema with appropriate foreign key relationships
- Implement data sampling strategies for handling large datasets
- Execute analytical queries on both PostgreSQL and Spark
- Compare performance, scalability, and ergonomics of both systems
- Analyze business performance, user behavior, and review patterns

## Dataset

The project uses the [Yelp Open Dataset](https://www.yelp.com/dataset), which includes:

- **Business data**: 150,346 businesses with attributes like location, categories, and ratings
- **User data**: ~2 million users with profile information and review history
- **Review data**: ~7 million reviews (sampled to 1 million for this project)

Due to the large size of the datasets (several GB), we implemented intelligent sampling strategies while maintaining referential integrity across tables.

## Repository Structure

```
.
├── README.md           # Project documentation
├── 0-checkpoint.md     # Project checkpoint and progress report
├── 1-final-report.md   # Final analysis and findings
├── code/               # Python scripts, notebooks, and data processing code
├── data/               # Data directory (excluded from git)
├── queries/            # SQL queries and Spark operations
└── images/             # Diagrams, screenshots, and visualizations
```

**Warning:** This project works with large datasets. The `.gitignore` is configured to exclude large files and **everything** inside `data/` to prevent accidentally committing multi-GB files to the repository.

## Key Features

### Database Design
- Normalized relational schema with three main tables (users, businesses, reviews)
- Foreign key relationships ensuring referential integrity
- ER diagram documenting table relationships

### Data Processing Pipeline
- JSON to CSV conversion with pandas
- Intelligent sampling of large datasets (1M reviews from 7M total)
- Data loading into PostgreSQL using COPY commands
- Distributed processing with Apache Spark DataFrames

### Query Analysis
- Performance benchmarking of identical queries across both systems
- Complex analytical queries including aggregations, joins, and grouping
- Comparison of query execution times and resource usage

## Getting Started

### Prerequisites
- PostgreSQL (version 12+)
- Apache Spark (version 3.x)
- Python 3.8+
- pandas library

### Setup

1. Download the Yelp Open Dataset from https://www.yelp.com/dataset
2. Place the JSON files in the `data/` directory
3. Run the data processing scripts in `code/` to sample and convert data
4. Load data into PostgreSQL using the provided SQL scripts
5. Configure Spark and load data into DataFrames

See `0-checkpoint.md` for detailed setup instructions and the data loading process.

## Project Team

- Manan Bhargava
- Bianca Isabel Poblano
- Nawoda Wijesooriya

## License

This project uses the Yelp Open Dataset, which is subject to the Yelp Dataset License Agreement. See `data/Dataset_User_Agreement.pdf` for details.

---
