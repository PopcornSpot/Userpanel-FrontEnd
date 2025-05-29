import React, { useState } from "react";

const TicketSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState(2);

  const seatOptions = [
    { label: "Diamond", price: 190, status: "Available" },
    { label: "Pearl", price: 60, status: "Sold Out" },
  ];

  const handleSeatChange = (seatCount) => {
    setSelectedSeats(seatCount);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      
       

        
        <h1 className="text-xl font-semibold text-center">How many seats?</h1>
        <div className=" w-[200] flex justify-center mb-4">
          <img
            src="https://i.imgur.com/kO8IPx6.png" 
            alt="Popcorn"
            className="w-16 h-16 sm:w-60 sm:h-60"
          />
        </div>

       
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {Array.from({ length: 10 }).map((_, index) => {
            const seatNumber = index + 1;
            return (
              <button
                key={seatNumber}
                className={`w-5 h-5 sm:w-6 sm:h-6 flex justify-center items-center rounded-sm ${
                  selectedSeats === seatNumber
                    ? "bg-orange-400 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleSeatChange(seatNumber)}
              >
                {seatNumber}
              </button>
            );
          })}
        </div>

        
        <div className="mt-6 space-y-4">
          {seatOptions.map((seat, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="text-lg font-medium">{seat.label}</p>
                <p
                  className={`text-sm ${
                    seat.status === "Available"
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {seat.status}
                </p>
              </div>
              <p className="text-lg font-medium">₹{seat.price}</p>
            </div>
          ))}
        </div>

       <div>
       <button className="w-full flex items-center justify-center mt-6 bg-orange-400 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600">
          Select Seats
        </button>
       </div>
      </div>
    </div>
  );
};

export default TicketSelection;