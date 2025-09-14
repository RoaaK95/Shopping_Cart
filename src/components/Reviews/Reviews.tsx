
import type { FC } from "react";
import type { Review } from "../../types";
import classes from './Reviews.module.scss';

interface ReviewsProps {
  reviews: Review[];
}

export const Reviews: FC<ReviewsProps> = ({ reviews }) => {
  if (!reviews?.length)
    return <div className={classes.noReviews}>No reviews yet.</div>;

  return (
    <div className={classes.reviewsContainer}>
      <div className={classes.reviewsTitle}>Reviews</div>
      {reviews.map((review) => {
        const dateObj = new Date(review.date);
        const formattedDate = `${dateObj.getFullYear()}/
          ${String(dateObj.getMonth() + 1).padStart(2, "0")}/
          ${String(dateObj.getDate()).padStart(2, "0")} ${String(dateObj.getHours()).padStart(2, "0")}:
          ${String(dateObj.getMinutes()).padStart(2, "0")}`;
        return (
          <div className={classes.reviewItem} key={review.reviewerEmail + review.date.toString()}>
            <div className={classes.reviewHeader}>
              <span className={classes.reviewRating}>{review.rating}★</span>
              <span className={classes.reviewMeta}>{formattedDate}</span>
              <span className={classes.reviewMeta}>{review.reviewerName} ({review.reviewerEmail})</span>
            </div>
            <div className={classes.reviewComment}>{review.comment}</div>
          </div>
        );
      })}
    </div>
  );
};
