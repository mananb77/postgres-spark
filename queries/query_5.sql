SELECT yu.user_id, yb.city, yb.state, COUNT(yb.business_id)
    FROM yelp_users yu
    JOIN yelp_small_reviews ysr ON yu.user_id = ysr.user_ids
    JOIN yelp_business yb ON ysr.business_id = yb.business_id
    GROUP BY yb.user_id, yb.city, yb.state;