import React from 'react'
import "./HowItWorks.css"
import HeroBanner from "../../components/user_section/HowItWokrs_Section/HeroBanner/HeroBanner"
import TabSwitcher from "../../components/user_section/HowItWokrs_Section/TabSwitcher/TabSwitcher"
import ComparisonTable from "../../components/user_section/HowItWokrs_Section/ComparisonTable/ComparisonTable"
import PaymentFlow from "../../components/user_section/HowItWokrs_Section/PaymentFlow/PaymentFlow"
import FAQAccordion from "../../components/user_section/HowItWokrs_Section/FAQAccordion/FAQAccordion"
import VideoDemo from "../../components/user_section/HowItWokrs_Section/VideoDemo/VideoDemo"
import CTABanner from '../../components/user_section/Home_Section/CTABanner/CTABanner'

const HowItWorks = () => {
    return (
        <div>
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