SELECT 
        user_id, 
        name, 
        array_length(STRING_TO_ARRAY(friends, ','), 1) as number_of_friends
    FROM yelp_users
    ORDER BY number_of_friends DESC
    LIMIT 5;