import Trade from '../models/trade.model.js';
import { errorHandler } from '../utiis/error.js';

export const createTrade = async (req, res, next) => {
  try {
    const trade = await Trade.create(req.body);
    return res.status(201).json(trade);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getTrades = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const trades = await Trade.find({
      user: userId,
    }).populate('listing');

    return res.status(200).json(trades);
  } catch (error) {
    next(error);
  }
};

export const getAllTrades = async (req, res, next) => {
  try {
    const trades = await Trade.find({}).populate('listing').populate('user');

    return res.status(200).json(trades);
  } catch (error) {
    next(error);
  }
};

export const getTrade = async (req, res, next) => {
  try {
    const trade = await Trade.findById(req.params.id).populate('listing');
    if (!trade) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(trade);
  } catch (error) {
    next(error);
  }
};

export const makeTradeOffer = async (req, res, next) => {
  try {
    const { status, discount } = req.body;
    if (!status || !discount) {
      return next(errorHandler(400, 'status and discount are required !'));
    }
    const trade = await Trade.findByIdAndUpdate(req.params.id, { status, discount }, { new: true });
    if (!trade) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(201).json(trade);
  } catch (error) {
    next(error);
  }
};

export const TradeOfferAction = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return next(errorHandler(400, 'status is required !'));
    }
    const trade = await Trade.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!trade) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(201).json(trade);
  } catch (error) {
    next(error);
  }
};
