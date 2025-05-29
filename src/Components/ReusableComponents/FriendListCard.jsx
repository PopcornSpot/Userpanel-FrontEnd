import React from "react";
import image from "../../assets/LoginImagebg.jpg";

const FriendListCard = ({ friends }) => {
  const backendURL = "https://popcornspotbackend-production.up.railway.app";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {friends.map((friend, index) => (
        <div
          key={index}
          className="relative bg-white rounded-lg shadow-lg bg-gradient-to-t from-gray-800 via-gray-700 to-gray-700 overflow-hidden border group hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10 p-4">
            <div className="flex items-center">
              <img
                src={
                  friend.fileName
                    ? `${backendURL}/upload/${friend.fileName}`
                    : image
                }
                alt={friend.userName}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-50">
                  {friend.userName}
                </h3>
                <p className="text-sm text-gray-100">{friend.mobileNumber}</p>
              </div>
            </div>
            <div className="bg-gray-50 min-h-44 hover:bg-gray-100 px-4 py-3 mt-4 rounded-md">
              <h4 className="text-md font-semibold text-gray-700 mb-2">
                Recently Watched Movies:
              </h4>
              {friend.watchedMovies.length > 0 ? (
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  {friend.watchedMovies.map((movie, idx) => (
                    <li key={idx}>{movie}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  No movies watched recently.
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendListCard;
