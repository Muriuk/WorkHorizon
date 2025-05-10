import { Metadata } from "next";
import ForJobEnquiries from "../ui/careers/jobenquiries";
import Careers_Start from "../ui/careers/startup";
import WhyWorkWithUs from "../ui/careers/whyWorkWithUs";

export const metadata:Metadata = {
    title: 'Careers - KaziBase'
}

export default function Careers(){
    
    return(
        <>
            <Careers_Start />
            <JoiningPath />
            <WhyWorkWithUs />
            <ForJobEnquiries />
        </>
    )
}
