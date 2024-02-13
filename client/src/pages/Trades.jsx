import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import TradeItem from '../components/TradeItem';
import { useSelector } from 'react-redux';

const Trades = () => {
  const { currentUser } = useSelector(state => state.user);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let url;

  if (currentUser.isAdmin) {
    url = `/api/trade/admin/get`;
  } else {
    url = `/api/trade/get`;
  }

  console.log(trades);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setTrades(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchTrades();
  }, []);

  return (
    <div className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        {currentUser.isAdmin ? 'Trades List' : 'Your Trades List'}
      </h1>

      {loading ? (
        <Loading />
      ) : error ? (
        <p>Something Went Wrong</p>
      ) : trades.length > 0 ? (
        trades.map(trade => <TradeItem key={trade._id} trade={trade} />)
      ) : (
        <p>You have no trades yet.</p>
      )}
    </div>
  );
};

export default Trades;
