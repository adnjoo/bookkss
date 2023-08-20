import { useState, useRef, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { Transition } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';

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
  const [reviewDate, setReviewDate] = useState(dayjs(review.reviewDate));
  const modalRef = useRef<any>(null);

  const closeDatePicker = () => {
    setReviewDate(dayjs(review.reviewDate));
    setShowDatePicker(false);
  };

  const onSaveDate = () => {
    onSaveReview({
      reviewId: review.id,
      updatedBody: review.body,
      setPrivate: review.private,
      setArchive: review.archive,
      reviewDate: reviewDate.toISOString(),
    });
    setShowDatePicker(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setReviewDate(dayjs(review.reviewDate));
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showDatePicker]);

  return (
    <>
      <h3
        className='cursor-pointer text-xl font-bold'
        onClick={() => setShowDatePicker(!showDatePicker)}
      >
        {dayjs(review.reviewDate).format('YYYY-MM-DD')}
      </h3>
      <Transition
        show={showDatePicker}
        as='div'
        className='fixed inset-0 z-50 flex items-center justify-center'
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
          <div className='rounded-lg bg-white p-4' ref={modalRef}>
            <button
              className='absolute right-0 top-0 p-2'
              onClick={closeDatePicker}
            >
              <AiOutlineClose className='text-2xl' />
            </button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                disableFuture
                value={reviewDate}
                onChange={(newValue: any) => {
                  setReviewDate(newValue);
                }}
              />
              <button
                className='mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700              
              '
                onClick={onSaveDate}
              >
                Save
              </button>
            </LocalizationProvider>
          </div>
        </Transition.Child>
      </Transition>
    </>
  );
};
