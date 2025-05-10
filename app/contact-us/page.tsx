
import { Metadata } from "next"
import ContactUsBody from "./body"


export const metadata:Metadata = {
    title: 'Contact Us - KaziBase'
}

export default function ContactUs(){
    
    return(
        <>
            <ContactUsBody />
        </>
    )
}
