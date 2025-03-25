import emailjs from "@emailjs/browser";
import { Message } from "./elements";

export default function ContactMessageMail({message}: Message) {
    console.log("message: ", message);

    emailjs.sendForm(
        "service_nyd4frn", // Your EmailJS Service ID
        "wh-contact-message", // Your EmailJS Template ID
        message, // Your message object
        {
            publicKey: "6JNvWc5CCdRoexkSA",
        }
    )
    .then(() => {
        console.log("Email got sent");
        return true;
    })
    .catch((error) => {
        console.error("Failed to send email:", error);
        return false;
    });
}
