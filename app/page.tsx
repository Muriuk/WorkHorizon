
import HomeHead from './ui/home/section1';
// import { useEffect, useState } from 'react';
import  AboutSection  from './ui/home/about';

import JoinGlobalTeam from './ui/home/joinglobalteam';
import HiringProcess from './ui/home/hiringprocess';
import LetsTalk from './ui/home/letstalk';
export default function Home() {

  return (
    <>
      <HomeHead />
      <HiringProcess />
      <AboutSection />
      
      <JoinGlobalTeam />
     
        <LetsTalk />
    </>
  );
}
