"use client"
import { useState } from "react";
import SupportPageForm from "./components/SupportPageForm";
import SupportPageDropDown from "./components/SupportPageDropDown";
import SupportPageHistory from "./components/SupportPageHistory";

export default function SupportPage() {
    const [issue, setIssue] = useState("");
    return (
        <div>
            <div>
                <h2 className="text-center font-bold text-3xl mb-11 pt-10">Support & Issues</h2>
            </div>
            <SupportPageDropDown value={issue} handleChange={setIssue}/>
            <SupportPageForm issue={issue} setIssue={setIssue}/>
            <div>
                <h2 className="text-center font-bold text-3xl mt-24 mb-11 pt-10">Your Support Requests</h2>
            </div>
            <SupportPageHistory />
        </div>
    )
}