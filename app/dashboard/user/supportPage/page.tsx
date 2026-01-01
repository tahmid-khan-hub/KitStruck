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
                <h2 className="text-center font-bold text-3xl mt-11 mb-8 t-10">Support & Issues</h2>
                {/* dots */}
                <p className="max-w-6xl mx-auto mr-0 md:mr-12 mb-7 text-center md:text-right">
                    Replied <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500"></span><span className="text-gray-400"> | </span>
                    Not replied <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-500"></span>
                </p>
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