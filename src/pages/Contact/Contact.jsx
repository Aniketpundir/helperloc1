import "./Contact.css"
import ContactHero from "../../components/user_section/Contact_Section/ContactHero/ContactHero"
import ContactChannels from "../../components/user_section/Contact_Section/ContactChannels/ContactChannels"
import DepartmentDirectory from "../../components/user_section/Contact_Section/DepartmentDirectory/DepartmentDirectory"
import FAQAccordion from '../../components/user_section/HowItWokrs_Section/FAQAccordion/FAQAccordion'
import KnowledgeBase from "../../components/user_section/Contact_Section/KnowledgeBase/KnowledgeBase"
import OfficeMap from "../../components/user_section/Contact_Section/OfficeMap/OfficeMap"
import SocialFeed from "../../components/user_section/Contact_Section/SocialFeed/SocialFeed"
import Newsletter from "../../components/user_section/Contact_Section/Newsletter/Newsletter"
import SEO from '../../seo/SEO'
import { createPageTitle } from '../../seo/seoData'

const Contact = () => {
    return (
        <div>
            <SEO
                title={createPageTitle('Contact HelperLoc Support')}
                description="Contact HelperLoc for customer support, worker onboarding, bookings, refunds, service questions and local service assistance."
                keywords="HelperLoc contact, home service support, local worker support, booking help"
                canonicalPath="/contact-us"
            />
            <ContactHero />
            <ContactChannels />
            <DepartmentDirectory />
            <FAQAccordion />
            <KnowledgeBase />
            <OfficeMap />
            <SocialFeed />
            <Newsletter />
        </div>
    )
}

export default Contact
