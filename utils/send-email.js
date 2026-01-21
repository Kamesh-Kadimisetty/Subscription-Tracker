import dayjs from "dayjs";
import { subscriptionReminderTemplate } from "./email-template.js";
import transporter, { accountEmail } from "../config/nodemailer.js"; 

export const sendRemainderEmail = async ({to, type, subscription}) => {
    if(!to || !type) throw new Error("Invalid parameters for sending email");

    console.log('Sending email to:', to);
    console.log('Subscription data:', subscription);
    console.log('User data:', subscription.user);

    // Calculate days until renewal
    const daysUntilRenewal = dayjs(subscription.renewalDate).diff(dayjs(), 'day');

    const htmlContent = subscriptionReminderTemplate(subscription, subscription.user, daysUntilRenewal);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: `Subscription Reminder: ${subscription.name} renews in ${daysUntilRenewal} days`,
        html: htmlContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Email sending failed:', error);
        throw error;
    }
}