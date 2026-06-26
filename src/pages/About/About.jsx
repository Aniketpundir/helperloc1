import "./About.css"
import AboutHero from "../../components/user_section/About_Section/AboutHero/AboutHero"
import StatsRow from "../../components/user_section/About_Section/StatsRow/StatsRow"
import OurStory from "../../components/user_section/About_Section/OurStory/OurStory"
import MissionVision from "../../components/user_section/About_Section/MissionVision/MissionVision"
import ValuesGrid from "../../components/user_section/About_Section/ValuesGrid/ValuesGrid"
import WorkerSpotlight from "../../components/user_section/About_Section/WorkerSpotlight/WorkerSpotlight"
import TrustedBy from "../../components/user_section/About_Section/TrustedBy/TrustedBy"
import CTABanner from '../../components/user_section/Home_Section/CTABanner/CTABanner'
import SEO from '../../seo/SEO'
import { createPageTitle } from '../../seo/seoData'

const About = () => {
    return (
        <div>
            <SEO
                title={createPageTitle('About HelperLoc - Verified Local Service Booking')}
                description="Learn how HelperLoc connects customers with verified local workers for home services, repairs, cleaning and maintenance across Indian cities."
                keywords="about HelperLoc, verified local workers, local service booking platform, home service marketplace"
                canonicalPath="/about-us"
            />
            <AboutHero />
            <StatsRow />
            <OurStory />
            <MissionVision />
            <ValuesGrid />
            <WorkerSpotlight />
            <TrustedBy />
            <CTABanner />
        </div>
    )
}

export default About
