import dayjs from 'dayjs';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');

import Subscription from '../models/subscription.model.js';

const REMAINDERS = [7,5,3,1]

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
            await sleepUntilRemainder(context,`Remainder ${daysBefore} days Before`, remaindDate);
        }
        await trigerRemainder(context,`Remainder ${daysBefore} days Before`);
    }
});

const fetchSubscriptionDetails = async (context, subscriptionId) => {
    //fetch subscription details from database
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    });
}

const sleepUntilRemainder = async (context,label,date) => {
    console.log(`sleeping until ${label} remaind date: ${date.format('YYYY-MM-DD')}`);
    await context.sleepUntil(label, date.toDate());
}

const trigerRemainder = async(context,label) => {
    return await context.run(label,()=>{
        console.log(`Triggering ${label} remainder`);
        //send SMS,email,notification logic here

    })
}