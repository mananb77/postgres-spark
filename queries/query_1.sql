WITH ranked_business AS (
        SELECT 
            yb.business_id,
            yb.city,
            yb.review_count,
            yb.stars,
            CASE WHEN yb.stars > 4.7 AND yb.review_count > 100
            THEN 1
            ELSE 0
            END AS is_good
        FROM yelp_business yb
    ), concentration_by_city AS (
        SELECT 
            city,
            COUNT(business_id) as num_business,
            SUM(is_good) as total_is_good
        FROM ranked_business
        GROUP BY city
        HAVING COUNT(business_id) > 50
        ORDER BY total_is_good DESC
    )

    SELECT * FROM concentration_by_city LIMIT 10;