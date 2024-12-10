import React from "react";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
    return (
        <Rating
            initialRating={rating}
            readonly
            emptySymbol={<FaStar color="#ccc" />}
            fullSymbol={<FaStar color="gold" />}
        />
    );
};

export default StarRating;
