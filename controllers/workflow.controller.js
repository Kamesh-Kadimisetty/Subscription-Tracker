import dayjs from 'dayjs';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');

import Subscription from '../models/subscription.model.js';
import {sendRemainderEmail} from '../utils/send-email.js';
const REMAINDERS = [7,5,2,1]

export const sendRemainders = serve(async (context)=> {
    const { subscriptionId } = context.requestPayload; 
    const subscription = await fetchSubscriptionDetails(context, subscriptionId);

    if(!subscription || subscription.status !=='active') return; 

    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())){
        console.log(`Subscription ${subscription._id} has renewal date has passed stopping workflow.`);
        return; 
    } 

    for(const daysBefore of REMAINDERS){
        const remaindDate = renewalDate.subtract(daysBefore,'day');

        if(remaindDate.isAfter(dayjs())){
            await sleepUntilRemainder(context,`${daysBefore} days before reminder`, remaindDate);
        }
        
        // Re-fetch subscription to ensure user data is available
        if(dayjs().isSame(remaindDate,'day')){
            const freshSubscription = await fetchSubscriptionDetails(context, subscriptionId);
            await trigerRemainder(context,`${daysBefore} days before reminder`, freshSubscription);
        }
    }
});

const fetchSubscriptionDetails = async (context, subscriptionId) => {
    //fetch subscription details from database
    return await context.run('get subscription', async () => {
        const subscription = await Subscription.findById(subscriptionId).populate('user', 'name email');
        console.log('Fetched subscription with user:', subscription);
        // Convert to plain object to ensure it serializes correctly
        return subscription.toObject();
    });
}

const sleepUntilRemainder = async (context,label,date) => {
    console.log(`sleeping until ${label} remaind date: ${date.format('YYYY-MM-DD')}`);
    await context.sleepUntil(label, date.toDate());
}
const trigerRemainder = async(context, label, subscription) => {
    console.log(`Triggering ${label} remainder`);
    console.log('Subscription in trigger:', subscription);
    
    if(!subscription || !subscription.user) {
        console.error('Subscription or user is undefined');
        return;
    }
    
    await context.run(`send email for ${label}`, async () => {
        await sendRemainderEmail({
            to: subscription.user.email,
            type: label,
            subscription: subscription
        });
    });
}
// {
//     "name":"Amazon Prine",
//     "price":199.9,
//     "currency":"INR",
//     "frequency":"monthly",
//     "category":"entertainment",
//     "startDate":"2026-01-20T16:34:55.714+00:00",
//     "paymentMethod":"upi"
//   }