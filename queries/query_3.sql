SELECT 
        TO_CHAR(ysr.date, 'Month') AS review_month,
        AVG(yb.stars) AS avg_stars,
        AVG(yb.review_count) AS avg_review_count,
        COUNT(ysr.review_id) AS total_reviews
    FROM yelp_business yb
    JOIN yelp_small_reviews ysr ON yb.business_id = ysr.business_id
    WHERE 'Restaurants' = ANY(yb.categories)
    GROUP BY review_month
    ORDER BY avg_review_count DESC;