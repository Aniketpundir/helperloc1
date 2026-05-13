import React from 'react'
import Hero from "../../components/Home_Section/Hero/Hero"
import Services from "../../components/Home_Section/Services/Services"
import HowItWorks from "../../components/Home_Section/HowItWorks/HowItWorks"
import Testimonials from "../../components/Home_Section/Testimonials/Testimonials"
import WhyChooseUs from "../../components/Home_Section/WhyChooseUs/WhyChooseUs"
import Safety from "../../components/Home_Section/Safety/Safety"
import CTABanner from "../../components/Home_Section/CTABanner/CTABanner"

const Home = () => {
    return (
        <>
            <Hero />
            <Services />
            <HowItWorks />
            <Testimonials />
            <WhyChooseUs />
            <Safety />
            <CTABanner />
        </>
    )
}

export default Home