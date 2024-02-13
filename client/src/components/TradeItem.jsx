import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TradeItem = ({ trade }) => {
  const { currentUser } = useSelector(state => state.user);
  const { listing } = trade;
  const [offerDiscount, setOfferDiscount] = useState();

  const changeHandler = e => {
    setOfferDiscount(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/trade/admin/make-offer/${trade._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          discount: offerDiscount,
          status: 'review',
        }),
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitOffer = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/trade/accept-offer/${trade._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'accepted',
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeclineOffer = async () => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/trade/decline-offer/${trade._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'declined',
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-5xl m-3">
      <div className="md:flex justify-between">
        <div className="md:flex-shrink-0">
          <img
            className="h-64 w-full object-cover md:w-48"
            src={listing.imageUrls[0]}
            alt="Car Image"
          />
        </div>
        <div className="flex justify-between">
          <div className="p-8 flex-1">
            <div className="uppercase tracking-wide text-lg text-indigo-500 font-semibold">
              <Link to={`/listing/${listing._id}`}>{listing.name}</Link>
            </div>
            <p className="block mt-1 text-lg leading-tight font-medium text-black">
              Price: {listing.price}$
            </p>
            <p className="mt-2 text-gray-500">Request Status: {trade.status}</p>
          </div>
          <div className="p-8 flex-1">
            <div className="uppercase tracking-wide text-lg text-indigo-500 font-semibold">
              <Link to={`/trade/${trade._id}`}>{trade.name}</Link>
              {currentUser.isAdmin && trade.user ? (
                <p className="text-black lowercase text-sm">{`User: ${trade.user.username}`}</p>
              ) : (
                ''
              )}
              {currentUser.isAdmin && trade.status === 'pending' ? (
                <div>
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                      <input
                        className=" p-2 border-none focus:outline-none text-lg"
                        type="number"
                        id="discount"
                        onChange={changeHandler}
                        placeholder="Disocunt Amount ..."
                        required
                      />
                    </div>

                    <div className="flex gap-6 justify-center">
                      <button
                        type="submit"
                        className=" mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none  focus:ring-indigo-500"
                      >
                        Offer
                      </button>
                      <button
                        type="button"
                        onClick={handleDeclineOffer}
                        className="mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none  focus:ring-red-500"
                      >
                        Decline
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                ''
              )}
            </div>

            {trade.status === 'review' && !currentUser.isAdmin ? (
              <>
                <p>Discount: {trade.discount}$</p>
                <div>
                  <form className="flex gap-4" onSubmit={handleSubmitOffer}>
                    <button
                      type="submit"
                      className=" mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none  focus:ring-indigo-500"
                    >
                      Accept Offer
                    </button>
                    <button
                      type="button"
                      onClick={handleDeclineOffer}
                      className="mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none  focus:ring-red-500"
                    >
                      Decline
                    </button>
                  </form>
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="md:flex-shrink-0">
          <img
            className="h-64 w-full object-cover md:w-48"
            src={trade.imageUrls[0]}
            alt="Car Image"
          />
        </div>
      </div>
    </div>
  );
};

export default TradeItem;
