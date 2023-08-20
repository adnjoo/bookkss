import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { Transition } from '@headlessui/react';
import type { Review } from './ReviewComponent';
import { onSaveReviewProps } from '../pages';

export const MyDateCalendar = ({
  review,
  onSaveReview,
}: {
  review: Review;
  onSaveReview: (props: onSaveReviewProps) => void;
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const closeDatePicker = () => {
    // console.log('closeDatePicker');
    setShowDatePicker(false);
  };

  return (
    <>
      <h3
        className='cursor-pointer text-xl font-bold'
        onClick={() => setShowDatePicker(!showDatePicker)}
      >
        {review.reviewDate.slice(0, 10)}
      </h3>
      <Transition
        show={showDatePicker}
        as='div'
        className='fixed inset-0 z-50 flex items-center justify-center'
        onClick={closeDatePicker} // Close when clicking on the overlay
      >
        {/* Dark overlay */}
        <Transition.Child
          enter='transition-opacity ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-50'
          leave='transition-opacity ease-in duration-200'
          leaveFrom='opacity-50'
          leaveTo='opacity-0'
          className='pointer-events-none fixed inset-0 bg-black opacity-0'
          onClick={closeDatePicker} // Close when clicking on the overlay
        />
        {/* Date picker */}
        <Transition.Child
          enter='transition-transform ease-out duration-300'
          enterFrom='translate-y-4 opacity-0'
          enterTo='translate-y-0 opacity-100'
          leave='transition-transform ease-in duration-200'
          leaveFrom='translate-y-0 opacity-100'
          leaveTo='translate-y-4 opacity-0'
          className='relative z-10'
        >
          <div className='rounded-lg bg-white p-4'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                disableFuture
                value={dayjs(review.reviewDate)}
                onChange={(newValue: any) => {
                  onSaveReview({
                    reviewId: review.id,
                    updatedBody: review.body,
                    setPrivate: review.private,
                    setArchive: review.archive,
                    reviewDate: new Date(newValue).toISOString(),
                  });
                }}
              />
            </LocalizationProvider>
          </div>
        </Transition.Child>
      </Transition>
    </>
  );
};
