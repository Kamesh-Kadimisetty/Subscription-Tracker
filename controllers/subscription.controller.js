import Subscription from "../models/subscription.model.js";

export const CreateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id});
        res.status(201).json({
            success: true,
            data: subscription
        });
    } catch (error) {
        next(error);
    }
}

export const GetUserSubscriptions = async (req, res, next) => {
    try {
        //check if the user is same as one in token
        if(req.user._id.toString() !== req.params.id.toString()){
            const error = new Error("You are not the owner of this account");
            error.status = 403;
            throw error;
        }
        const subscriptions = await Subscription.find({user: req.params.id});
        res.status(200).json({
            success: true,
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
}