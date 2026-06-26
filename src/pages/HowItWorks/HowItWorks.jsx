import "./HowItWorks.css"
import HeroBanner from "../../components/user_section/HowItWokrs_Section/HeroBanner/HeroBanner"
import TabSwitcher from "../../components/user_section/HowItWokrs_Section/TabSwitcher/TabSwitcher"
import ComparisonTable from "../../components/user_section/HowItWokrs_Section/ComparisonTable/ComparisonTable"
import PaymentFlow from "../../components/user_section/HowItWokrs_Section/PaymentFlow/PaymentFlow"
import FAQAccordion from "../../components/user_section/HowItWokrs_Section/FAQAccordion/FAQAccordion"
import VideoDemo from "../../components/user_section/HowItWokrs_Section/VideoDemo/VideoDemo"
import CTABanner from '../../components/user_section/Home_Section/CTABanner/CTABanner'
import SEO from '../../seo/SEO'
import { createPageTitle } from '../../seo/seoData'

const HowItWorks = () => {
    return (
        <div>
            <SEO
                title={createPageTitle('How HelperLoc Works')}
                description="See how HelperLoc lets customers search local services, compare verified workers, book a slot, track service progress and leave reviews."
                keywords="how HelperLoc works, book local services, verified workers, home service booking process"
                canonicalPath="/how-it-works"
            />
            <HeroBanner />
            <TabSwitcher />
            <ComparisonTable />
            <PaymentFlow />
            <FAQAccordion />
            <VideoDemo />
            <CTABanner />
        </div>
    )
}

export default HowItWorks
