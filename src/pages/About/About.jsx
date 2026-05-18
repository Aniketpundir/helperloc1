import React from 'react'
import "./About.css"
import AboutHero from "../../components/user_section/About_Section/AboutHero/AboutHero"
import StatsRow from "../../components/user_section/About_Section/StatsRow/StatsRow"
import OurStory from "../../components/user_section/About_Section/OurStory/OurStory"
import MissionVision from "../../components/user_section/About_Section/MissionVision/MissionVision"
import MeetTheTeam from "../../components/user_section/About_Section/MeetTheTeam/MeetTheTeam"
import ValuesGrid from "../../components/user_section/About_Section/ValuesGrid/ValuesGrid"
import WorkerSpotlight from "../../components/user_section/About_Section/WorkerSpotlight/WorkerSpotlight"
import TrustedBy from "../../components/user_section/About_Section/TrustedBy/TrustedBy"
import CTABanner from '../../components/user_section/Home_Section/CTABanner/CTABanner'

const About = () => {
    return (
        <div>
            <AboutHero />
            <StatsRow />
            <OurStory />
            <MissionVision />
            {/* <MeetTheTeam /> */}
            <ValuesGrid />
            <WorkerSpotlight />
            <TrustedBy />
            <CTABanner />
        </div>
    )
}

export default About