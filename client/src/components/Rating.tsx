import React from 'react';
import RatingMui from '@mui/material/Rating';

interface RatingProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
  showText?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  onRatingChange,
  showText,
}) => {
  return (
    <div className='flex items-center gap-2'>
      {showText && <span>Rating: {rating}</span>}
      <RatingMui
        data-testid='rating'
        name='rating'
        value={rating}
        onChange={(_, newRating) => {
          if (newRating !== null) {
            onRatingChange(newRating);
          }
        }}
        size='small'
      />
    </div>
  );
};
