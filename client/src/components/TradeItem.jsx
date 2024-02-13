import React from 'react';
import { Link } from 'react-router-dom';

const TradeItem = ({ trade }) => {
  const { listing } = trade;
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-56 w-full object-cover md:w-48"
            src={listing.imageUrls[0]}
            alt="Car Image"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-lg text-indigo-500 font-semibold">
            <Link to={`/listing/${listing._id}`}>{listing.name}</Link>
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">
            Price: {listing.price}$
          </p>
          <p className="mt-2 text-gray-500">Request Status: {trade.status}</p>

          <button className="mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeItem;
