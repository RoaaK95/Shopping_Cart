import type { FC } from "react";
import type { Review } from "../../types";

interface ReviewsProps {
  reviews: Review[];
}

export const Reviews: FC<ReviewsProps> = ({ reviews }) => {
  if (!reviews?.length) return <p>No reviews yet.</p>;

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.map((review) => {
        const dateObj = new Date(review.date);
        const formattedDate = `${dateObj.getFullYear()}/
      ${String(dateObj.getMonth() + 1).padStart(2, "0")}/
${String(dateObj.getDate()).padStart(2, "0")}
${String(dateObj.getHours()).padStart(2, "0")}:
${String(dateObj.getMinutes()).padStart(2, "0")}`;
        return (
          <p key={review.reviewerEmail + review.date.toString()}>
            <span>
              {review.rating} {review.comment} {formattedDate}{" "}
              {review.reviewerName} {review.reviewerEmail}
            </span>
          </p>
        );
      })}
    </div>
  );
};
