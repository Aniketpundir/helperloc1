import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import BookingConfirmed_Hero from './BookingConfirmed_Hero/BookingConfirmed_Hero';
import BookingConfirmed_WorkerInfo from './BookingConfirmed_WorkerInfo/BookingConfirmed_WorkerInfo';
import BookingConfirmed_BookingDetails from './BookingConfirmed_BookingDetails/BookingConfirmed_BookingDetails';
import BookingConfirmed_Actions from './BookingConfirmed_Actions/BookingConfirmed_Actions';
import BookingConfirmed_Suggestions from './BookingConfirmed_Suggestions/BookingConfirmed_Suggestions';
import {
    clearBookingDetail,
    fetchBookingDetails,
    fetchLatestBookingDetails,
} from '../../../Redux/Slice/bookingDetailSlice';
import './Booking_Confirmed.css';

const suggestions = [
    {
        id: 1,
        title: 'Professional Plumber',
        desc: 'Expert leakage repair and fittings.',
        rating: 4.8,
        image: 'https://ui-avatars.com/api/?name=Plumber&background=1565c0&color=fff&size=256&bold=true',
    },
    {
        id: 2,
        title: 'AC Deep Cleaning',
        desc: 'Improve cooling and air quality.',
        rating: 4.9,
        image: 'https://ui-avatars.com/api/?name=AC+Repair&background=1565c0&color=fff&size=256&bold=true',
    },
    {
        id: 3,
        title: 'Master Carpenter',
        desc: 'Furniture repair and custom builds.',
        rating: 4.7,
        image: 'https://ui-avatars.com/api/?name=Carpenter&background=1565c0&color=fff&size=256&bold=true',
    },
];

const Booking_Confirmed = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { booking, loading, error } = useSelector((state) => state.bookingDetail);

    useEffect(() => {
        const bookingId = searchParams.get('bookingId') || searchParams.get('id') || location.state?.bookingId;

        if (bookingId) {
            dispatch(fetchBookingDetails(bookingId));
        } else {
            dispatch(fetchLatestBookingDetails());
        }

        return () => {
            dispatch(clearBookingDetail());
        };
    }, [dispatch, location.state, searchParams]);

    if (loading) {
        return (
            <div className="booking-confirmed">
                <main className="booking-confirmed__main">
                    <p>Loading booking details...</p>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="booking-confirmed">
                <main className="booking-confirmed__main">
                    <p>{error}</p>
                </main>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="booking-confirmed">
                <main className="booking-confirmed__main">
                    <p>No booking details found.</p>
                </main>
            </div>
        );
    }

    return (
        <div className="booking-confirmed">
            <BookingConfirmed_Hero
                bookingId={booking.bookingId}
                workerName={booking.worker.name}
            />

            <main className="booking-confirmed__main">
                <div className="booking-confirmed__grid">
                    <div className="booking-confirmed__left">
                        <BookingConfirmed_WorkerInfo worker={booking.worker} />
                    </div>

                    <div className="booking-confirmed__right">
                        <BookingConfirmed_BookingDetails
                            bookingId={booking.bookingId}
                            details={booking.details}
                            payment={booking.payment}
                            timeline={booking.timeline}
                        />
                    </div>
                </div>

                <BookingConfirmed_Actions />

                <BookingConfirmed_Suggestions suggestions={suggestions} />
            </main>
        </div>
    );
};

export default Booking_Confirmed;
