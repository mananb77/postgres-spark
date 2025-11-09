export const queries = [
  {
    id: 1,
    title: "Top Cities with High-Quality Businesses",
    objective: "Identify cities with the highest concentration of highly-rated businesses (>4.7 stars, >100 reviews)",
    description: "This query analyzes business quality across cities by filtering businesses with exceptional ratings and substantial review counts, then aggregating by city to find locations with the most premium establishments.",
    sqlCode: `WITH ranked_business AS (
    SELECT
        business_id,
        city,
        review_count,
        stars,
        CASE
            WHEN stars > 4.7 AND review_count > 100 THEN 1
            ELSE 0
        END AS is_good
    FROM yelp_business
),
concentration_by_city AS (
    SELECT
        city,
        COUNT(business_id) as num_business,
        SUM(is_good) as total_is_good
    FROM ranked_business
    GROUP BY city
    HAVING COUNT(business_id) > 50
    ORDER BY total_is_good DESC
)
SELECT *
FROM concentration_by_city
LIMIT 10;`,
    sparkCode: `from pyspark.sql.functions import col, count, sum as _sum, when

ranked_business = business_df.select(
    "business_id",
    "city",
    "review_count",
    "stars",
    when((col("stars") > 4.7) & (col("review_count") > 100), 1)
    .otherwise(0).alias("is_good")
)

concentration_by_city = (
    ranked_business
    .groupBy("city")
    .agg(
        count("business_id").alias("num_business"),
        _sum("is_good").alias("total_is_good")
    )
    .filter(col("num_business") > 50)
    .orderBy(col("total_is_good").desc())
    .limit(10)
)

concentration_by_city.show()`,
    features: ["Common Table Expressions (CTEs)", "CASE statements", "Aggregations", "HAVING clause"],
    complexity: "Medium",
  },
  {
    id: 2,
    title: "Top Business in Every Category",
    objective: "Find the highest-rated business in each Yelp category, ranked by popularity",
    description: "Using window functions and array operations, this query unnests business categories, ranks businesses within each category by stars and reviews, then selects the top performer in each category.",
    sqlCode: `WITH parsed_categories AS (
    SELECT
        business_id,
        city,
        state,
        name,
        stars,
        review_count,
        UNNEST(categories) AS category
    FROM yelp_business
),
num_categories AS (
    SELECT
        DISTINCT category,
        COUNT(*) AS num_category
    FROM parsed_categories
    GROUP BY category
),
ranked_businesses AS (
    SELECT
        category,
        business_id,
        name,
        city,
        state,
        stars,
        review_count,
        num_category,
        RANK() OVER (
            PARTITION BY category
            ORDER BY stars DESC, review_count DESC
        ) AS rank_in_category
    FROM parsed_categories pc
    JOIN num_categories nc ON pc.category = nc.category
)
SELECT
    category,
    num_category,
    business_id,
    name,
    city,
    state,
    stars,
    review_count
FROM ranked_businesses
WHERE rank_in_category = 1
ORDER BY num_category DESC
LIMIT 10;`,
    sparkCode: `from pyspark.sql.functions import explode, split, col, count, rank
from pyspark.sql.window import Window

parsed_categories = business_df.select(
    "business_id",
    "city",
    "state",
    "name",
    "stars",
    "review_count",
    explode(split(col("categories"), ", ")).alias("category")
)

num_categories = (
    parsed_categories
    .groupBy("category")
    .agg(count("*").alias("num_category"))
)

window_spec = Window.partitionBy("category").orderBy(
    col("stars").desc(),
    col("review_count").desc()
)

ranked_businesses = (
    parsed_categories
    .join(num_categories, "category")
    .withColumn("rank_in_category", rank().over(window_spec))
)

result = (
    ranked_businesses
    .filter(col("rank_in_category") == 1)
    .orderBy(col("num_category").desc())
    .limit(10)
    .select("category", "num_category", "business_id",
            "name", "city", "state", "stars", "review_count")
)

result.show(truncate=False)`,
    features: ["Window Functions", "UNNEST/Explode", "Array Operations", "Multi-level CTEs", "RANK()"],
    complexity: "High",
  },
  {
    id: 3,
    title: "Restaurant Review Seasonality",
    objective: "Analyze monthly patterns in restaurant reviews to identify seasonal trends",
    description: "This query examines review distribution across months for restaurants, calculating average ratings, review counts, and total reviews per month to reveal seasonal patterns in dining behavior.",
    sqlCode: `SELECT
    TO_CHAR(ysr.date, 'Month') AS review_month,
    AVG(yb.stars) AS avg_stars,
    AVG(yb.review_count) AS avg_review_count,
    COUNT(ysr.review_id) AS total_reviews
FROM yelp_business yb
JOIN yelp_small_reviews ysr
    ON yb.business_id = ysr.business_id
WHERE 'Restaurants' = ANY(yb.categories)
GROUP BY review_month
ORDER BY avg_review_count DESC;`,
    sparkCode: `from pyspark.sql.functions import month, avg, count, col, array_contains

restaurant_reviews = (
    business_df
    .filter(array_contains(col("categories"), "Restaurants"))
    .join(reviews_df, "business_id")
)

seasonality = (
    restaurant_reviews
    .groupBy(month(col("date")).alias("review_month"))
    .agg(
        avg("stars").alias("avg_stars"),
        avg("review_count").alias("avg_review_count"),
        count("review_id").alias("total_reviews")
    )
    .orderBy(col("avg_review_count").desc())
)

seasonality.show()`,
    features: ["Date Functions", "Array Filtering", "JOIN Operations", "Aggregations"],
    complexity: "Medium",
  },
  {
    id: 4,
    title: "Users with Most Friends",
    objective: "Identify the most socially connected users on Yelp",
    description: "This query parses the comma-separated friend list for each user and ranks them by friend count to find the most connected members of the Yelp community.",
    sqlCode: `SELECT
    user_id,
    name,
    array_length(
        STRING_TO_ARRAY(friends, ','), 1
    ) as number_of_friends
FROM yelp_users
ORDER BY number_of_friends DESC
LIMIT 5;`,
    sparkCode: `from pyspark.sql.functions import col, split, size

most_friends = (
    users_df
    .withColumn(
        "number_of_friends",
        size(split(col("friends"), ","))
    )
    .select("user_id", "name", "number_of_friends")
    .orderBy(col("number_of_friends").desc())
    .limit(5)
)

most_friends.show()`,
    features: ["String Parsing", "Array Functions", "Simple Aggregation"],
    complexity: "Low",
  },
  {
    id: 5,
    title: "Food Adventurer Analysis",
    objective: "Find users who review businesses across multiple geographic locations",
    description: "This complex query identifies 'food adventurers' - users who write reviews for businesses in diverse cities, demonstrating geographic exploration in their dining experiences.",
    sqlCode: `-- Identifies users reviewing in multiple cities
SELECT
    yu.user_id,
    yu.name,
    COUNT(DISTINCT yb.city) as cities_reviewed,
    COUNT(yr.review_id) as total_reviews
FROM yelp_users yu
JOIN yelp_reviews yr ON yu.user_id = yr.user_id
JOIN yelp_business yb ON yr.business_id = yb.business_id
GROUP BY yu.user_id, yu.name
HAVING COUNT(DISTINCT yb.city) > 10
ORDER BY cities_reviewed DESC
LIMIT 20;`,
    sparkCode: `from pyspark.sql.functions import col, countDistinct, count

food_adventurers = (
    users_df
    .join(reviews_df, "user_id")
    .join(business_df, "business_id")
    .groupBy("user_id", "name")
    .agg(
        countDistinct("city").alias("cities_reviewed"),
        count("review_id").alias("total_reviews")
    )
    .filter(col("cities_reviewed") > 10)
    .orderBy(col("cities_reviewed").desc())
    .limit(20)
)

food_adventurers.show()`,
    features: ["Multi-table JOINs", "DISTINCT Aggregations", "Complex Filtering"],
    complexity: "High",
  },
  {
    id: 6,
    title: "Top Philadelphia Restaurant Reviewers",
    objective: "Identify most active and influential restaurant reviewers in Philadelphia",
    description: "This query combines geographic filtering, business category selection, and user aggregation to find the top-rated reviewers specifically for Philadelphia restaurants.",
    sqlCode: `SELECT
    yu.user_id,
    yu.name,
    AVG(yr.stars) AS avg_stars,
    yu.review_count
FROM (
    SELECT *
    FROM yelp_business
    WHERE city = 'Philadelphia'
) yb
JOIN yelp_small_reviews yr
    ON yb.business_id = yr.business_id
JOIN yelp_users yu
    ON yu.user_id = yr.user_id
GROUP BY yu.user_id, yu.name, yu.review_count
ORDER BY avg_stars DESC, yu.review_count DESC
LIMIT 10;`,
    sparkCode: `from pyspark.sql.functions import col, avg

philly_reviewers = (
    business_df
    .filter(col("city") == "Philadelphia")
    .join(reviews_df, "business_id")
    .join(users_df, "user_id")
    .groupBy("user_id", "name", "review_count")
    .agg(avg("stars").alias("avg_stars"))
    .orderBy(
        col("avg_stars").desc(),
        col("review_count").desc()
    )
    .limit(10)
)

philly_reviewers.show()`,
    features: ["Subqueries", "Multi-table JOINs", "City Filtering", "Dual Sorting"],
    complexity: "Medium",
  },
];
