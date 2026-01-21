import Subscription from "../models/subscription.model.js";
import {SERVER_URL} from "../config/env.js"
import { workflowClient } from "../config/upstash.js"

export const CreateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });
        
        let workflowId = null;
        // Add error handling for workflow trigger
        try {
            const workflowRun = await workflowClient.trigger({
                url: `${SERVER_URL}/api/v1/workflows/subscription/remainder`,
                body: {
                    subscriptionId: subscription._id.toString(),
                    userId: req.user._id.toString(),
                    renewalDate: subscription.renewalDate
                }
            });
            workflowId = workflowRun.workflowRunId;
            console.log('Workflow triggered:', workflowId);
        } catch (workflowError) {
            console.error('Workflow trigger failed:', workflowError);
            // Don't fail the subscription creation if workflow fails
        }
        
        res.status(201).json({
            success: true,
            data: subscription,
            workflowId: workflowId
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