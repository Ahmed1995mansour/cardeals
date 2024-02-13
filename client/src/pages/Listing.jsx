import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaPalette,
  FaGlobeAmericas,
  FaShare,
  FaCar,
  FaGasPump,
  FaIndustry,
  FaCogs,
  FaCalendarAlt,
} from 'react-icons/fa';
import Loading from '../components/Loading';

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing({ flag }) {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);

  let url;
  if (flag === 'listing') {
    url = `/api/listing/get/${params.listingId}`;
  } else {
    url = `/api/trade/get/${params.tradeId}`;
  }
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);

        const res = await fetch(url);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId || params.tradeId]);

  return (
    <main>
      {loading && <Loading />}
      {error && <p className="text-center my-7 text-2xl">Something went wrong!</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map(url => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'contain',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - $ {listing.price ? listing.price.toLocaleString('en-US') : ''}
            </p>

            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                Trade / Sale
              </p>
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-6 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaIndustry className="text-lg" />
                {`Make: ${listing.make}`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaCar className="text-lg" />

                {`Model: ${listing.model}`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaCalendarAlt className="text-lg" />

                {`Year: ${listing.year}`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaGasPump className="text-lg" />
                {`Fuel Type: ${listing.fuelType}`}
              </li>
            </ul>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaCogs className="text-lg" />
                {`Transmission: ${listing.gear}`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaCar className="text-lg" />
                {`Body Type: ${listing.bodyType}`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaPalette className="text-lg" />
                {`Color: ${listing.color}`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaGlobeAmericas className="text-lg" />
                {`Millage: ${listing.millage}`}
              </li>
            </ul>
            {currentUser && listing.user !== currentUser._id && !currentUser.isAdmin && (
              <button
                onClick={() => navigate(`/trade-in-application/${listing._id}`)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Apply for a Trade
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
