import React from 'react';
import WorkerDetail_Profile from './WorkerDetail_Profile/WorkerDetail_Profile';
import WorkerDetail_BookingForm from './WorkerDetail_BookingForm/WorkerDetail_BookingForm';
import WorkerDetail_Reviews from './WorkerDetail_Reviews/WorkerDetail_Reviews';
import './Worker_Detail.css';

const workerData = {
    id: 1,
    name: 'Ramesh Kumar',
    category: 'Electrician',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRjjiuMQQcX2srSbcNcUKjITbY2VYJ6IgOEpNXG7YirKjFGdDoHJdmc1uc7u5JBxuOUaEgaolcT1PC3sAhbWjpbXyA1ewZYktZgUf_TwZtBsQEPBhIR5fMfssfPM0d62YEXPRoix6-I6u4HYox9aEr80LWC8O3G2DBAfpH4yBK1dwhyr8WET6fABRyqqkbFhRUa9RgjjyvO0NSSxsCgFl-SjNYRvPUrF33lJDmnC1ERou5J5ecR06EMorBS7u6hN2RFpgfbWpnh6pO',
    rating: 4.9,
    reviews: 214,
    location: 'Delhi, India',
    experience: '6 Years',
    rate: '₹400/hr',
    avgTime: '1.5 hrs',
    jobsDone: '850+',
    skills: ['Wiring', 'Meter Fix', 'Fan Install', 'Panel Work', 'Inverter'],
    about: 'Professional licensed electrician with over 6 years of experience in residential and commercial electrical maintenance. Committed to safety and efficient problem-solving.',
    verified: true,
};

const reviewsData = [
    {
        id: 1,
        initials: 'AK',
        name: 'Anil Kapoor',
        time: '2 days ago',
        rating: 5,
        text: 'Ramesh was very professional. He fixed our main switchboard wiring within 30 minutes. Highly recommend for any electrical issues.',
        avatarColor: 'rgba(0, 175, 254, 0.2)',
        avatarTextColor: 'var(--color-secondary)',
    },
    {
        id: 2,
        initials: 'SP',
        name: 'Sonia Pant',
        time: '1 week ago',
        rating: 5,
        text: 'Very polite and efficient. He even checked our other sockets for safety without asking for extra. Great service!',
        avatarColor: 'rgba(255, 219, 201, 0.6)',
        avatarTextColor: 'var(--color-tertiary)',
    },
    {
        id: 3,
        initials: 'RV',
        name: 'Rahul Verma',
        time: '2 weeks ago',
        rating: 4,
        text: 'Excellent work on the inverter installation. Arrived on time and was very tidy with the wiring layout.',
        avatarColor: 'rgba(202, 230, 255, 0.5)',
        avatarTextColor: 'var(--color-on-secondary-fixed)',
    },
];

const Worker_Detail = () => {
    return (
        <div className="worker-detail">
            <nav className="worker-detail__breadcrumb">
                <a href="#" className="worker-detail__breadcrumb-link">Home</a>
                <span className="material-symbols-outlined worker-detail__breadcrumb-sep">chevron_right</span>
                <a href="#" className="worker-detail__breadcrumb-link">Workers</a>
                <span className="material-symbols-outlined worker-detail__breadcrumb-sep">chevron_right</span>
                <a href="#" className="worker-detail__breadcrumb-link">{workerData.category}</a>
                <span className="material-symbols-outlined worker-detail__breadcrumb-sep">chevron_right</span>
                <span className="worker-detail__breadcrumb-current">{workerData.name}</span>
            </nav>

            <div className="worker-detail__layout">
                <aside className="worker-detail__left">
                    <WorkerDetail_Profile worker={workerData} />
                </aside>
                <div className="worker-detail__right">
                    <WorkerDetail_BookingForm worker={workerData} />
                    <WorkerDetail_Reviews
                        reviews={reviewsData}
                        workerName={workerData.name}
                        rating={workerData.rating}
                    />
                </div>
            </div>
        </div>
    );
};

export default Worker_Detail;