import React from 'react'
import "./Contact.css"
import ContactHero from "../../components/Contact_Section/ContactHero/ContactHero"
import ContactChannels from "../../components/Contact_Section/ContactChannels/ContactChannels"
import DepartmentDirectory from "../../components/Contact_Section/DepartmentDirectory/DepartmentDirectory"
import FAQAccordion from '../../components/HowItWokrs_Section/FAQAccordion/FAQAccordion'
import KnowledgeBase from "../../components/Contact_Section/KnowledgeBase/KnowledgeBase"
import OfficeMap from "../../components/Contact_Section/OfficeMap/OfficeMap"
import SocialFeed from "../../components/Contact_Section/SocialFeed/SocialFeed"
import Newsletter from "../../components/Contact_Section/Newsletter/Newsletter"

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