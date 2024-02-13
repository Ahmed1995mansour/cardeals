import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [carListings, setCarListings] = useState([]);

  SwiperCore.use([Navigation]);
  console.log(carListings);
  useEffect(() => {
    const fetchCarListings = async () => {
      try {
        const res = await fetch('/api/listing/get');
        const data = await res.json();
        setCarListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCarListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 pt-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          Car with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Car Deals is the best place to find your next perfect car to drive.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={'/search'} className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
          Let's get started...
        </Link>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {carListings && carListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={'/search?offer=true'}>
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {carListings.map(listing => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
