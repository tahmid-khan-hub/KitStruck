"use client"
import Lottie from "react-lottie-player";
import noMyOrders from "@/public/No Item Found.json"

const LastOrdersEmpty = () => {
    return (
        <div className="flex flex-col items-center justify-center py-10">
            <Lottie
                animationData={noMyOrders}
                loop={true}
                className="w-64 h-64"
            />
            <p className="text-gray-500 text-lg mt-4">No latest orders found</p>
        </div>
    );
};

export default LastOrdersEmpty;