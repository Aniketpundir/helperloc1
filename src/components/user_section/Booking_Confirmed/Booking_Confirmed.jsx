import React from 'react';
import BookingConfirmed_Hero from './BookingConfirmed_Hero/BookingConfirmed_Hero';
import BookingConfirmed_WorkerInfo from './BookingConfirmed_WorkerInfo/BookingConfirmed_WorkerInfo';
import BookingConfirmed_BookingDetails from './BookingConfirmed_BookingDetails/BookingConfirmed_BookingDetails';
import BookingConfirmed_Actions from './BookingConfirmed_Actions/BookingConfirmed_Actions';
import BookingConfirmed_Suggestions from './BookingConfirmed_Suggestions/BookingConfirmed_Suggestions';
import './Booking_Confirmed.css';

const bookingData = {
    bookingId: '#HL-2026-00842',
    worker: {
        name: 'Ramesh Kumar',
        service: 'Electrician',
        rating: 4.9,
        reviews: 124,
        location: 'Delhi, NCR',
        experience: '6 years',
        rate: '₹400 / hour',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9DmApsF8YKYVBQeo_yrg0V9f_4l-68AVfSFGmWNn3qn6A_QjL_3zckLTphMDfTZUsZcTjtjrvPIfTtW319UPHKuNQi72bTpFPlVeVPh7ZP5A8N3NFnWl1JX97BoghIvpMIFHoM8JNbyTg3Ca6GkvxMYQlWwjY39G543I_K6PdlCtOtxfEg0onrlSzMFdooqMV1IpWcfgYTJxY-Iip4JxjHE93c8YDLkFggDivlNT2MvFFDvNA9-iyJtw7Nn005wuASbcjJp0CvGgE',
        badges: ['Aadhaar Verified', 'Police Verified'],
        verified: true,
    },
    details: {
        date: '24 May 2026',
        time: '10:00 AM - 11:00 AM',
        workers: '1 Professional',
        phone: '+91 98765 43210',
        address: 'A-124, 4th Floor, Green Park Extension, Near Metro Gate 2, Delhi - 110016',
        workNeeded: 'Fixing kitchen sink leakage and replacing main circuit breaker.',
    },
    payment: {
        rateLabel: 'Hourly Rate (₹400 x 1 worker)',
        rateValue: '₹400/hr',
        durationLabel: 'Estimated Duration',
        durationValue: '2 Hours',
        totalLabel: 'Est. Total Amount',
        totalValue: '₹800',
    },
    timeline: [
        { label: 'Confirmed', desc: 'Booking accepted by Ramesh Kumar', done: true },
        { label: 'Notified', desc: 'Worker notified of the schedule', done: true },
        { label: 'On The Way', desc: 'Scheduled for May 24, 09:30 AM', done: false },
        { label: 'In Progress', desc: 'Work verification required at site', done: false },
    ],
    suggestions: [
        {
            id: 1,
            title: 'Professional Plumber',
            desc: 'Expert leakage repair and fittings.',
            rating: 4.8,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA1yb6GOKNKQunT44AobTfQJUcIKqjIujPop2FP-_JdfrhiYCHmAefboALFfrCKRQlLeCvSORE9rMkUU8gMc_rBulcQgXCHBEdBtSADM4pkywQYI9rp_XVj7jdmuCHcK4m_quro790fMd_8Dk14VxJNNz-8o_rCS8NfDV4pRE1wdm93E7itZavVF7xXYBRS4IdF8_1BfTyuj9sCWjO980HPvCFKEEm_GCTGjSqPded3SdhoHK_KtQYBlNd9sLOwhNB-UXLgOLNZIkp',
        },
        {
            id: 2,
            title: 'AC Deep Cleaning',
            desc: 'Improve cooling and air quality.',
            rating: 4.9,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFiS2HbihaFKTUALlzgMbzXq1jpKbahCBHopneSgCgit3c15HE9GAtMUqTO_K2aNmaCrBtH3TEplqY1vL4vndLiEc0lFCNtPcJZ-JTbM5dTm8RZm6oPe9letBN9sVjr6AfOLfDixB-vztP5Nolv-Mhflxwaz1MRwLPpUjUw-bypVrrUB74YSO3ZxX8ig-COq7Qga9UMgUsFw7zXtz2RfkOHDI5N5HMFRp71Htbj31kTuM2ZsoQ2-Qb3w2dEPwi-14cNaES8dEON7Jy',
        },
        {
            id: 3,
            title: 'Master Carpenter',
            desc: 'Furniture repair and custom builds.',
            rating: 4.7,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoe7J05BJb0FmI-wnNwxI23HMEgfnohsI4gM5Rvtz8bRIDagnkX7q6-j2TSA0a7rOLEyFzIx0FahNHSBuuU445QuvUSC7OZeLgLHjcnRy6Y3Chj8tdLAklzCyebVL3etFtEKAXBGzQOZ3ty6LfrBVqjZVdBEPRc-TMaQOv0ue7rzlpbqXxuO5JCh5T-rmykRTCk26QLoCbm7A0jD90G9iq53SRPEltUUCSffD944wfZTc9hDs8AcGxpfNce4gJ37NGe0TPLMsSvoE6',
        },
    ],
};

const Booking_Confirmed = () => {
    return (
        <div className="booking-confirmed">
            <BookingConfirmed_Hero
                bookingId={bookingData.bookingId}
                workerName={bookingData.worker.name}
            />

            <main className="booking-confirmed__main">
                <div className="booking-confirmed__grid">
                    {/* Left Column */}
                    <div className="booking-confirmed__left">
                        <BookingConfirmed_WorkerInfo worker={bookingData.worker} />
                    </div>

                    {/* Right Column */}
                    <div className="booking-confirmed__right">
                        <BookingConfirmed_BookingDetails
                            bookingId={bookingData.bookingId}
                            details={bookingData.details}
                            payment={bookingData.payment}
                            timeline={bookingData.timeline}
                        />
                    </div>
                </div>

                <BookingConfirmed_Actions />

                <BookingConfirmed_Suggestions suggestions={bookingData.suggestions} />
            </main>
        </div>
    );
};

export default Booking_Confirmed;