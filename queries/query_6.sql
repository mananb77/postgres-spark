SELECT yu.user_id, yu.name, AVG(yr.stars) AS avg_stars, yu.review_count
    FROM (SELECT * FROM yelp_business WHERE city = 'Philadelphia') yb
    JOIN yelp_small_reviews yr ON yb.business_id = yr.business_id
    JOIN yelp_users yu ON yu.user_id = yr.user_id
    GROUP BY yu.user_id, yu.name, yu.review_count
    ORDER BY avg_stars DESC, yu.review_count DESC
    LIMIT 10;