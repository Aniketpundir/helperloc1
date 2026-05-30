import React from 'react';
import ServiceCard from '../../ServiceCard/ServiceCard';
import './Services.css';

const services = [
    {
        id: 1,
        title: 'Chowk Laborers',
        description: 'Hands Covered in Dust, Hearts Full of Dreams.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHGQ7tkl8IPAMQyBwVzIiwbaXKNU-cLjCJOpSXPXk-8mW4IeNH9bvayhYsPAzzqn4X-23ZrTr0K27vPOpuIRUKbnR9NK-Nrw4wbJjeHzMTEU1NBzq6GyyxUzrIwgFbAnhox-6-hDOjTsxZqb-A1jFHAwJF1JltskACeov8dzujpTFkh0rrIdb7DdquO5-euJXej7SRbJwMqsVKU7cxNB5EH90sH9u2K21bpbkb3eMn_ESsISNyaIN9ZGMk3RK-w5qNK11DKZjc_iTL',
    },
    {
        id: 2,
        title: 'Plumber',
        description: 'Expert plumbing solutions for your home.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_0kyXEE92eeCI8S8sdhyXclNbqWf5yQTYj-bmSCfN0EFM8iOzChg6OOYqIA2fU8GKNg1beSSMxrxemLWSvQDshB5K0zw5hGmAMzXnC4J_V41iujdV_jQDndASQVrjPuE4egu2avE2IfoDHPS2brOMrvPrdUeGBNWGNWO39dliiWw4SOCPsN5nJozuEdSzTVjbbI3QrzxtOKLxspVtSeFfsbkbWRC6FiSybqKwwyFKr2Vmp8lnv7oQ_SuZGvm26p1nfN3rZr57Vpoe',
    },
    {
        id: 3,
        title: 'Electrician',
        description: 'Reliable wiring and repairs you can trust.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtoHlxz8o0t40fa2Pj7YRDDdVqGrpgOPihY1F-_vuBh7-EJVgCK36qLQ2SmElN1hpVZ_IRF9J6LFpp3samsPobKt7MCEwl33wkHt-dKSvUvIJzklQJewLILQYyJVrN-J3uNPtNMgd5CdWUB5oM2qrCN8l_pmFyXr_d54ztSnBnUrMogvPWSYDbAOup5PJaVGRRSAJPn2FF_cYtUbnGR2KNPqPvuMES3fcvF74n1txjZgopu2igx70o6ik2W9DqpUkVTYP7t6Z8gZCR',
    },
    {
        id: 4,
        title: 'Painter',
        description: 'Bring your walls to life with expert painting.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDjHnr14DAfOojQVvry_RFNBUZR5LcpESDDFzu5ky5d4HnF2zPXki06TDqGmMPI1W9pGZ0zKNH9BF0_WoWkTixnkrBAhgFY1rC6Z8L2WYMLuiIiIDVLyEzyg-b-K5kD-eiTfF0dByBKFGc1vlMau37Qj8mdlFmUbj0meBXZwFWN458FxfmGOIOKYo25Y7JmKRw_L3cSnEqGLDNSftRxvbUpvXgSx3AmKNISnX6I4r4NxiOQgp0fiL5UXMA0vWqZ3WIof-MwaV7NVq-',
    },
    {
        id: 5,
        title: 'Carpenter',
        description: 'From fixes to fine furniture, we build with care.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8ACYnyI9UBguXEnrhKZgtOh5MP-eTffjvOhurgtezuJzxD5jM98RJVPrckFTJLxfOWXl33Ye8taC1Q5He-hryHPk7cEszrreJ512ZnfniZ5_UDxH0U4l5ect82zVFNMroDKPKqy3lyrzEYekYiTcqvk4k8eCixW0AyaEtrE5OqplLYKydWZHMBXsyGABsBn3z57WPYeYRhksApIn-fQkVkPzq1DvGGLm6FgT1tCtLwpbAELrgT3ldZ9Mh4AtHZJaOpUVXs7bV87TW',
    },
    {
        id: 6,
        title: 'Home Cleaning',
        description: 'Deep cleaning services for a healthier home.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyxG49sqP0afzUa8vvL95UiGbJR1tud5uLxHHyPqpB5BUjbvZxwUjc7YSwa9NySoDENzCYihxr11KXaCUs-nkaaQbpLmLsUcK_mEAE9s0a8Dx3KZnfEhtdoaWtIDfZaTdNauHwvFjN30VraxyppdKPq-baMe0JoBowcBOE46aUV4ItnLa0qvjkCpb4IOmkKR-3blHrB2_jZKYhGiRSTUqhJhsSiqWyP70eh1XU8V3lFJ9RKMq-plgfH7mKiKrBajyjmvUNEtxuCSZu',
    },
    {
        id: 7,
        title: 'Electrical',
        description: 'Reliable electrical repair services.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc72Mk6ju10OqHr97zCF6iItxjmrUZYC4-4ADnc7krAMcUBt0eHiHr987KeEKpG3hlfl0PLqfuEGPtwIuFJx81IhY140RIkDtAB33eFmNlT6_7V049WV4EOcYql9jRnRcj2nPKZ6LfZfJsjsNQkJWKzmEJLxBhXDpvigCLZ7eQ1-6GiFCHs-jFXuSqgZilGDkbRL7LnA3F7MeGryHLxnF-hRojO8pk3ZZR01Kuh6Of3KJTJWfc_SSKZLZAc2-TOW66wkdoZA1VgR9n',
    },
    {
        id: 8,
        title: 'Gardening',
        description: 'Professional gardening to keep your greens thriving.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcBTVjq-CmuvbHwMDvOPJF4n3hYWCVSWQoYKAhThemUhoLqEZ7OLqYEvw1Rr59FoszAo7kz6aAc-hA-8zYyAXw1jTxbZVKVliUlMjaaUCeES1sHJEKJxmE8ESKb_6le7G1qVXxasXHTgANfy_yTvU_7Go7LLqlFHMjxIOgeXGzic3yyBmo-nXW4iaU-jxomEWibChW88wczBZrTTxNyOUQ8806PXiNpeegdH_o7I4VLSqwAfYbblzypfcpdAfwmmSCtZyTwtkv4arg',
    },
];

const Services = () => {
    return (
        <section className="worker-category">
            <div className="worker-category__inner container">

                {/* Header */}
                <div className="worker-category__header">
                    <div>
                        <h2 className="worker-category__title">What do you need help with?</h2>
                        <p className="worker-category__subtitle">Choose from our wide range of trusted professionals</p>
                    </div>
                </div>

                {/* Grid */}
                <div className="worker-category__grid">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>

                {/* Footer */}
                <div className="worker-category__footer">
                    <button className="worker-category__more-link">
                        View All Services
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Services;