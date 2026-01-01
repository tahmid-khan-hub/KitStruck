import AllSupportAndIssues from "./components/AllSupportAndIssues";

export default function SupportAndIssuesPage() {
    return (
        <div>
            <h2 className="mt-12 mb-5 text-center font-bold text-3xl"> Support & Issues</h2>
            {/* dots */}
            <p className="max-w-6xl mx-auto mr-0 md:mr-12 mb-7 text-center md:text-right">
                New <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500"></span><span className="text-gray-400"> | </span>
                Old <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-500"></span>
            </p>
            <div>
                <AllSupportAndIssues />
            </div>
        </div>
    )
}