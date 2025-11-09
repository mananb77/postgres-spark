# Yelp Dataset Analysis: PostgreSQL vs Apache Spark

## Team

- Manan Bhargava
- Bianca Isabel Poblano
- Nawoda Wijesooriya

---

This document presents a comprehensive comparison of PostgreSQL and Apache Spark for analyzing the Yelp Open Dataset.

## Dataset Selection

* **Dataset description**: Yelp Open Dataset including businesses, users, and reviews
* **Dataset size and scope**: Details on number of records, file sizes, and data characteristics
* **Sampling strategy**: Approach for handling multi-GB datasets while maintaining referential integrity
* **PostgreSQL database schema**:
  * Show the result of running `\d [table_name]` for each table (users, businesses, reviews)
  * Document data types, constraints, and indexes
* **ER diagram**: Visual representation of table relationships and foreign keys
* **Spark data structures**: DataFrames, partitioning strategy, and schema definitions

## System and Database Setup

* **PostgreSQL data loading**: Code snippets, diagrams, and process for loading data from JSON/CSV
* **Compute resources**: Description of hardware setup (local machines, cloud resources, etc.)
* **Spark data loading**: Process for loading data into Spark DataFrames, including code snippets and diagrams
* **Data transformations**: JSON parsing, type conversions, sampling procedures, and data cleaning steps
* **Database design decisions**: Concessions made for performance, storage, or compatibility
* **Entity resolution**: Approach for maintaining referential integrity across users, businesses, and reviews

## PostgreSQL Tasks and Queries

Overview of analytical questions and business problems addressed with PostgreSQL.

### Task / Query 1

For each query, document:

* **Problem description**: What analytical question are we answering?
* **Solution approach**: Why is this query structure appropriate?
* **Performance evaluation**: Execution time, query plan, and optimization opportunities
* **Query**: The complete SQL statement
* **Results**: Sample output and interpretation

### Task / Query 2

[Same structure as above]

### Task / Query 3

[Same structure as above]

## Apache Spark Analysis

### Tool Selection Rationale

Explanation of why Apache Spark was chosen for distributed data processing and comparison with PostgreSQL.

### Task / Query 1

For each Spark task or query, document:

* **Problem description**: What analytical question are we answering?
* **Solution approach**: Why is this Spark operation appropriate?
* **Performance evaluation**: Execution time, DAG analysis, and resource utilization
* **Code**: The complete Spark code (PySpark or Scala)
* **Results**: Sample output and interpretation

### Task / Query 2

[Same structure as above]

## System Comparison

### Fitness & Ergonomics

* **Ease of use**: Learning curve, query complexity, and developer experience
* **Query expressiveness**: How naturally each system handles different types of queries
* **Debugging and optimization**: Tools and techniques available for troubleshooting
* **Integration**: How well each system integrates with other tools and workflows

### Performance Analysis

* **Query execution times**: Head-to-head comparison of identical queries
* **Scalability**: How each system performs as data volume increases
* **Resource efficiency**: Memory usage, CPU utilization, and disk I/O
* **Concurrency**: Ability to handle multiple simultaneous queries

### Recommendations

* When to use PostgreSQL vs Spark
* Optimal use cases for each system
* Hybrid approaches that leverage both systems

## Reflections

### Team Reflections

Insights and lessons learned from working on this project as a team.

### Individual Reflections

**Manan Bhargava:** ...

**Bianca Isabel Poblano:** ...

**Nawoda Wijesooriya:** ...

## References (Optional)
If relevant, include a reference page with citations of all outside sources used.

## Appendix (Optional)

* Include links, code samples, data excerpts.
