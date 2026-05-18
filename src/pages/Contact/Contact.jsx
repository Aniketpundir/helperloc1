import React from 'react'
import "./Contact.css"
import ContactHero from "../../components/user_section/Contact_Section/ContactHero/ContactHero"
import ContactChannels from "../../components/user_section/Contact_Section/ContactChannels/ContactChannels"
import DepartmentDirectory from "../../components/user_section/Contact_Section/DepartmentDirectory/DepartmentDirectory"
import FAQAccordion from '../../components/user_section/HowItWokrs_Section/FAQAccordion/FAQAccordion'
import KnowledgeBase from "../../components/user_section/Contact_Section/KnowledgeBase/KnowledgeBase"
import OfficeMap from "../../components/user_section/Contact_Section/OfficeMap/OfficeMap"
import SocialFeed from "../../components/user_section/Contact_Section/SocialFeed/SocialFeed"
import Newsletter from "../../components/user_section/Contact_Section/Newsletter/Newsletter"

const Contact = () => {
    return (
        <div>
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