import { Metadata } from "next";
import DashboardMainBody from "./body";

export const metadata:Metadata = {
    title: 'Welcome to dashboard - Kazibase'
}

export default function Dashboard(){
    return(
        <>
            <DashboardMainBody />
        </>
    )
}
