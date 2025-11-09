WITH parsed_categories AS (
    SELECT
        yb.business_id,
        yb.city,
        yb.state,
        yb.name,
        yb.stars,
        yb.review_count,
        UNNEST(yb.categories) AS category
    FROM yelp_business yb
    ),
    num_categories AS (
        SELECT DISTINCT
            category,
            COUNT(*) AS num_category
        FROM parsed_categories
        GROUP BY category
    ),
    ranked_businesses AS (
        SELECT
            pc.category,
            pc.business_id,
            pc.name,
            pc.city,
            pc.state,
            pc.stars,
            pc.review_count,
            nc.num_category,
            RANK() OVER (
                PARTITION BY pc.category
                ORDER BY pc.stars DESC, pc.review_count DESC
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
    LIMIT 10;