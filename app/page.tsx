
import HomeHead from './ui/home/section1';
// import { useEffect, useState } from 'react';
import  AboutSection  from './ui/home/about';
import  WhyChooseUs  from './ui/home/choose';
import JoinGlobalTeam from './ui/home/joinglobalteam';
import CareerOpportunities from './ui/home/career';
import HiringProcess from './ui/home/hiringprocess';
import LetsTalk from './ui/home/letstalk';
import jobspage from './ui/jobspage';
export default function Home() {

  return (
    <>
      <HomeHead />
      <jobspage />
      <HiringProcess />
      <AboutSection />
      <WhyChooseUs />
      <JoinGlobalTeam />
      <CareerOpportunities />
        <LetsTalk />
    </>
  );
}
