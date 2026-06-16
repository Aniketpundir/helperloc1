import React from 'react'
import Hero from "../../components/user_section/Home_Section/Hero/Hero"
import Services from "../../components/user_section/Home_Section/Services/Services"
import HowItWorks from "../../components/user_section/Home_Section/HowItWorks/HowItWorks"
import Testimonials from "../../components/user_section/Home_Section/Testimonials/Testimonials"
import WhyChooseUs from "../../components/user_section/Home_Section/WhyChooseUs/WhyChooseUs"
import Safety from "../../components/user_section/Home_Section/Safety/Safety"
import CTABanner from "../../components/user_section/Home_Section/CTABanner/CTABanner"
import CategoryBar from "../../components/user_section/Home_Section/CategoryBar/CategoryBar"

const Home = () => {
    return (
        <>
            <CategoryBar />
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