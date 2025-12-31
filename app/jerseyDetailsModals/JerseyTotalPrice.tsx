"use client"

const JerseyTotalPrice = ({price, quantity}:{price: number; quantity: number;}) => {
    return (
        <div>
            <p className="mb-5 font-semibold">Total price: {price*quantity}$</p>
        </div>
    );
};

export default JerseyTotalPrice;