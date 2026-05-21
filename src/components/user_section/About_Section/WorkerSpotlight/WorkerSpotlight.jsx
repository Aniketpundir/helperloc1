import './WorkerSpotlight.css';

const workers = [
    {
        id: 1,
        name: 'Ramesh Kumar',
        role: 'Senior Electrician',
        rating: '4.9',
        quote:
            'Working with HelperLoc has given my family financial stability and provided me with health benefits I never had before. I take pride in every job.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB389RGy1dhWp02o76RUhcnNzhAoCL9oRjFWktXix2tAGwRoQbommCYr-HiRXVu-FykcwhEZba4uIAFvDl5BQDUcMIKsSx3ZF9LH3PNNVj-P9l2e6TsvgIEPvmCf0bFnJLG57sooZY84Z3ib98qh7YOa1_OLkFstJcB5n-wYPeMkoKhwQwkwQScHr_rikjxthvYjAbnuDgddU1Nh1e3Lm5CvZzimRKhIO4IAOPTfBMRkICfF7u43oKeGddUI2BsU6RQPnitba4JzTZd',
    },
    {
        id: 2,
        name: 'Sunita Devi',
        role: 'Professional Cleaning Expert',
        rating: '5.0',
        quote:
            'The training I received here changed how I view my profession. Clients respect me, and the app makes it so easy to manage my schedule.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPhRcPtk3l7uH3KthEXjGP2B5BBA_S5SsV2ciru2y5u1_6yXnijvzvZmbGMu-KXTEqdJb3GglhA-ntEQx9gKReWlH7wH46F_dDQtA-NiQenaiAbroHOwRuxSLnEkRQnmW5SKsfM2VddaacBDDBLyUNGGTwxPD6Ri7KhsPQhoeIVqPJiuEvcxoXUu6rw6PLmIcKTb6YuiYhjZYeXz-zw3tXvbvnhZ9WFDFaqvBTqBOa99_dGAUVH3Ad3x-J0GtFUNdz9QwTBury-FV8',
    },
];

const StarIcon = () => (
    <svg
        className="worker-star-icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);

export default function WorkerSpotlight() {
    return (
        <section className="worker-spotlight">
            <div className="worker-spotlight__inner">
                <h2 className="worker-spotlight__heading">Worker Spotlight</h2>
            </div>

            <div className="worker-spotlight__track">
                <div className="worker-spotlight__spacer" aria-hidden="true" />

                {workers.map((w) => (
                    <div key={w.id} className="worker-card">
                        <div className="worker-card__img-wrap">
                            <img src={w.img} alt={w.name} className="worker-card__img" />
                        </div>
                        <div className="worker-card__body">
                            <div className="worker-card__rating">
                                <StarIcon />
                                <span>{w.rating} Rating</span>
                            </div>
                            <h4 className="worker-card__name">{w.name}</h4>
                            <p className="worker-card__role">{w.role}</p>
                            <p className="worker-card__quote">"{w.quote}"</p>
                        </div>
                    </div>
                ))}
                
                <div className="worker-spotlight__spacer" aria-hidden="true" />
            </div>
        </section>
    );
}