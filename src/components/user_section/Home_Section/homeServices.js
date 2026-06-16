import {
    FaBolt,
    FaBroom,
    FaBug,
    FaCalendarCheck,
    FaCheckCircle,
    FaCut,
    FaHammer,
    FaHeadset,
    FaHome,
    FaIdCard,
    FaLock,
    FaMoneyBillWave,
    FaMousePointer,
    FaPaintRoller,
    FaPlug,
    FaRegCommentDots,
    FaShieldAlt,
    FaSnowflake,
    FaStar,
    FaTools,
    FaUniversity,
    FaUserCheck,
    FaUserShield,
    FaWrench,
} from 'react-icons/fa';

export const homeCategories = [
    { label: 'Plumber', Icon: FaWrench, color: '#1565c0', aliases: ['pipe repair', 'tap leakage', 'bathroom fitting'] },
    { label: 'Electrician', Icon: FaPlug, color: '#f57f17', aliases: ['wiring', 'fan install', 'switch repair'] },
    { label: 'Cleaning', Icon: FaBroom, color: '#2e7d32', aliases: ['house cleaning', 'deep cleaning', 'sofa cleaning'] },
    { label: 'AC Repair', Icon: FaSnowflake, color: '#0277bd', aliases: ['ac service', 'cooling', 'air conditioner'] },
    { label: 'Carpentry', Icon: FaHammer, color: '#6d4c41', aliases: ['furniture repair', 'wood work', 'door repair'] },
    { label: 'Painting', Icon: FaPaintRoller, color: '#6a1b9a', aliases: ['wall painting', 'home painting', 'texture paint'] },
    { label: 'Pest Control', Icon: FaBug, color: '#c62828', aliases: ['cockroach', 'termite', 'mosquito'] },
    { label: 'Salon', Icon: FaCut, color: '#ad1457', aliases: ['haircut', 'beauty', 'grooming'] },
    { label: 'Appliance', Icon: FaTools, color: '#00838f', aliases: ['washing machine', 'fridge repair', 'geyser repair'] },
    { label: 'Security', Icon: FaShieldAlt, color: '#37474f', aliases: ['cctv', 'guard', 'camera install'] },
];

export const howSteps = [
    { number: '01', Icon: FaMousePointer, title: 'Select a Service', description: 'Choose from verified home services tailored to your needs.' },
    { number: '02', Icon: FaCalendarCheck, title: 'Schedule It', description: 'Pick a date and time. Our pros are flexible and prompt.' },
    { number: '03', Icon: FaCheckCircle, title: 'Get It Done', description: 'Relax while our expert delivers quality at your doorstep.' },
];

export const whyFeatures = [
    { Icon: FaUserCheck, title: 'Verified Professionals', description: 'Aadhaar plus background verified pros.' },
    { Icon: FaMoneyBillWave, title: 'Transparent Pricing', description: 'No hidden charges, upfront quotes.' },
    { Icon: FaBolt, title: 'Same-day Service', description: 'Book and get help within hours.' },
    { Icon: FaLock, title: 'Safe Payments', description: 'Secure escrow payment system.' },
    { Icon: FaRegCommentDots, title: 'Real Reviews', description: 'Ratings from verified customers.' },
    { Icon: FaHeadset, title: '24/7 Support', description: 'Always here whenever you need.' },
];

export const safetyItems = [
    { Icon: FaIdCard, title: 'Aadhaar Verified', description: 'Mandatory identity verification for all service providers.' },
    { Icon: FaUniversity, title: 'Police Verification', description: 'Background check conducted by official authorities.' },
    { Icon: FaUserShield, title: 'Secure Escrow', description: 'Your payment is held safely until the task is completed.' },
    { Icon: FaHome, title: '24/7 Support', description: 'Dedicated safety team available around the clock.' },
];

export const StarIcon = FaStar;
