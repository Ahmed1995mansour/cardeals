import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';

import TradeInApplication from './pages/TradeInApplication';
import Trades from './pages/Trades';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing/:listingId" element={<Listing flag="listing" />} />
          <Route path="/trade/:tradeId" element={<Listing flag="trade" />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/trade-in-application/:listingId" element={<TradeInApplication />} />
            <Route path="/trades" element={<Trades />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/create-listing" element={<CreateListing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
