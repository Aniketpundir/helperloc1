import { useRef } from 'react';
import './SocialFeed.css';

const posts = [
    {
        id: 1,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL_jGL_yN9r41jnk8sXGcgS6l5eyX9HvEbflXJLJeQKsyeFeJWAGJRtexX4xZWE3cy7gsUvL1-PrXHImQv1bkgWTPLjRllvr5wcpmf4bRVWMpFo66IojBiaoX_qCNyRGaKwT--gcU7nDPGnkbzfmr5CddSpyUvGb-9pNT0qc-tGTOReBAimcx8n9pf83WJcc5H-DANPLcOA7k1bb1Y2-k9ovS0ugtm4CC7sMn9oTeMr3j-Ioeyf_enVShz4qORFDAdBcb2klvAFQBK',
        tagIcon: 'thumb_up',
        tag: 'Helper Stories',
        caption: '"Joining HelperLoc changed my business reach in Delhi..."',
    },
    {
        id: 2,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt6czBlaKr8T2oYarsfMS4X5xaAlb3nhCt-OmZzRLtYBtrZ86nwiHPwgcS7QGFed3OzA-Sh-TggKP5qZbqjUYmxwzL2CCbC5XV_WhPqiA3rxIVGNfTtN-RzELeTdKwGVhN34E8uQLdI3myGB_2BPmqcXwHwEsAI8xwJ1E3o82sE3_697NTCE0qwHnMg0n30yXIVMrqvhkdZeh1IuJhoZlYTW0ae9d9P7m7NjfXh-p61uLHo-wQwo8x6ETRmlwpXF9VU7LURVJcky2F',
        tagIcon: 'verified',
        tag: 'Customer Tips',
        caption: '5 Tips to keep your home sparkling this monsoon season.',
    },
    {
        id: 3,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk0K8O1h6iGCPJCfVUmmWlr8rFcHvgLXPxocwWva3P0zOYXGxJBiN4Xmv8k3di8MHeYRcunJT1lSrtJsHqtd4heI-c18dv7KytVr33EQhXyS_tO8ArR9WazBPjtKV3dEwET2k9uE0VTWoq2DnqKO7JySQNC_e1kOB8N5c1UTLhEKwPtmCr5mO3PcbO_2CwtITC0GHuheQZlP0418s_rwYzBsQrcLpAU499aOTI-EpRHvJ13F4S7HglYN9SYO1zl2QwpJKr8sm0yOh-',
        tagIcon: 'star',
        tag: 'Safety Updates',
        caption: 'Announcing our new double-verification safety protocol.',
    },
];

export default function SocialFeed() {
    const trackRef = useRef(null);

    const scroll = (dir) => {
        if (!trackRef.current) return;
        trackRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    };

    return (
        <section className="social-feed">
            <div className="social-feed__inner">

                {/* Header */}
                <div className="social-feed__header">
                    <div>
                        <h2 className="social-feed__heading">HelperLoc Community</h2>
                        <p className="social-feed__sub">See what's happening in our social channels</p>
                    </div>
                    <div className="social-feed__controls">
                        <button
                            className="social-feed__ctrl-btn"
                            onClick={() => scroll(-1)}
                            aria-label="Scroll left"
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button
                            className="social-feed__ctrl-btn"
                            onClick={() => scroll(1)}
                            aria-label="Scroll right"
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Cards track */}
                <div className="social-feed__track" ref={trackRef}>
                    {posts.map((p) => (
                        <div key={p.id} className="social-card">
                            <img className="social-card__img" src={p.img} alt={p.tag} />
                            <div className="social-card__body">
                                <div className="social-card__tag">
                                    <span className="material-symbols-outlined social-card__tag-icon">{p.tagIcon}</span>
                                    <span className="social-card__tag-label">{p.tag}</span>
                                </div>
                                <p className="social-card__caption">{p.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}