// MeetTheTeam.jsx
import './MeetTheTeam.css';

const team = [
    {
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADEh4H34TOxnOV9NKv0nblk5B4s2u4OOGUe22Oka3m6zKLoFqydgwQgloYQxgvwWpLUhoPkYvof3jXw2d9ewzuztjwyzDmIQFSy2fI3BRV_jVuWDk2iP9J5GSzd3awiKtenlZyfPllB9yoNJgdmGO6sreiJ6ih0LKyLQABUMh7YE62UuJIB_nlYF7wEH8x-0czih3ITn2M4sYmQJ2355neZ8ozmvz7M8ZtYLZv5ElF2WOtRkPR0AbqS0_dZVYw3i-f2JDt2u3sJq_H',
        name: 'Rahul Sharma',
        role: 'Co-Founder & CEO',
        quote: '"Trust is the currency of our platform."',
    },
    {
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUqUXx2BRDH9QNwLq3LkARsiUnI3zUP47EQF5zS0lq0Fsuph3QQ1qd-xYRxcG7OSbTkiFnzK4z3DE-P2SaZHZo6WMDPEzOEW3mkw-POPwF0rKTBFX_fxgWPCI7Opys_--VXVpSJwTkagdKQVRAmXq-MEAai6xoxXw4RXrr-1TADEBXKdL9eLfbMuaOPLCpJ5DmypSFbdAVNbkkmg9v3GzXStaQsTsCJqSP3DKERVc29vzNJWnciuO3pwV8khXM0z1mfMEFLkR5qHiCB',
        name: 'Priya Mehta',
        role: 'Operations Head',
        quote: '"Safety isn\'t a feature, it\'s our foundation."',
    },
    {
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ6vkY5KK4dYjZsGWteQBf4wTEF_r5clmOl5-Sj0w6u8MXNUgO4yEk3WYVr2K4aXWmM5akWZRnhqgJUKBRvU8ywZ0-FWQQjiseMItGhEaq8gd7_rQSpYomZgrVakbPFH73g_MeO48oZwj4ywVc4kS8qBRlgBFOBLzOvMRe9RQhCvZ2mzk4qtd7dAuxxhQbuEHo4MCfovY1K6KPxs5U9J2TiyHquP1vDlFkYg6YzAcZT2bEnn-7OSEVxn_78JXbbrY32owVc3Nyx0oL',
        name: 'Arjun Verma',
        role: 'CTO',
        quote: '"Technology should work for people, not vice versa."',
    },
    {
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG5PN6xD7Q3MoL6QeX_-XPZFdQLgnb37HQirADhfA_eLIbM1vbZrvYFka9El45R8XiII-z-5hAZY8nPS7OPS3bfvwalpH5YQuXsP3YbWUva6HGCPDU1GhqtS0ciG4Jf_vnm-PsNWChCjewl6A3vtuzUtg1V6vFmwgAxpiqJGz4FFWVkU5CD79YQ8w3Shzmmqhjxqdnz3o9Uoo2pB4GazdhcKQKM6EDFyWyiPgZSb3sSCWOqOYWDWRQYKYHpUIQOfdvOxSmYFxL29rP',
        name: 'Sneha Gupta',
        role: 'Community Lead',
        quote: '"Our workers are the heart of HelperLoc."',
    },
];

const MeetTheTeam = () => {
    return (
        <section className="meet-team">
            <div className="meet-team__inner">
                <h2 className="meet-team__heading">The Minds Behind HelperLoc</h2>
                <div className="meet-team__grid">
                    {team.map((member) => (
                        <div className="meet-team__card" key={member.name}>
                            <img
                                className="meet-team__card-img"
                                src={member.img}
                                alt={member.name}
                            />
                            <div className="meet-team__card-body">
                                <h4 className="meet-team__card-name">{member.name}</h4>
                                <p className="meet-team__card-role">{member.role}</p>
                                <p className="meet-team__card-quote">{member.quote}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MeetTheTeam;