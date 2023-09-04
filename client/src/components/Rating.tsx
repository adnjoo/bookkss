import React from 'react';
import RatingMui from '@mui/material/Rating';

interface RatingProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}

export const Rating: React.FC<RatingProps> = ({ rating, onRatingChange }) => {
  return (
    <div className='flex items-center gap-2'>
      <span>Rating: {rating} / 5</span>
      <RatingMui
        data-testid='rating'
        name='rating'
        value={rating}
        onChange={(_, newRating) => {
          if (newRating !== null) {
            onRatingChange(newRating);
          }
        }}
      />
    </div>
  );
};
