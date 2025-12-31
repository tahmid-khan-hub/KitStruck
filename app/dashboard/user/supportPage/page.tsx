"use client"
import { useState } from "react";
import SupportPageForm from "./components/SupportPageForm";
import SupportPageDropDown from "./components/SupportPageDropDown";

export default function SupportPage() {
    const [issue, setIssue] = useState("");
    return (
        <div>
            <div>
                <h2 className="text-center font-bold text-3xl mb-11 pt-10">Support</h2>
            </div>
            <SupportPageDropDown value={issue} handleChange={setIssue}/>
            <SupportPageForm issue={issue} setIssue={setIssue}/>
        </div>
    )
}