export const subscriptionReminderTemplate = (subscription, user, daysUntilRenewal) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Subscription Reminder</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <tr>
                <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">SubDub</h1>
                  <p style="margin: 10px 0 0; color: #f0f0f0; font-size: 14px;">Subscription Reminder</p>
                </td>
              </tr>
              
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px; color: #333333; font-size: 24px;">Hi ${user.name}! 👋</h2>
                  <p style="margin: 0 0 20px; color: #666666; font-size: 16px; line-height: 1.6;">
                    Your subscription to <strong style="color: #667eea;">${subscription.name}</strong> will renew in <strong>${daysUntilRenewal} day${daysUntilRenewal > 1 ? 's' : ''}</strong>.
                  </p>
                  
                  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px; margin: 20px 0;">
                    <tr>
                      <td style="padding: 24px;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="padding: 8px 0; color: #666666; font-size: 14px;">Subscription:</td>
                            <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600; text-align: right;">${subscription.name}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #666666; font-size: 14px;">Amount:</td>
                            <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600; text-align: right;">${subscription.currency} ${subscription.price.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #666666; font-size: 14px;">Frequency:</td>
                            <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600; text-align: right; text-transform: capitalize;">${subscription.frequency}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #666666; font-size: 14px;">Renewal Date:</td>
                            <td style="padding: 8px 0; color: #667eea; font-size: 14px; font-weight: 600; text-align: right;">${new Date(subscription.renewalDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #666666; font-size: 14px;">Payment Method:</td>
                            <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600; text-align: right; text-transform: uppercase;">${subscription.paymentMethod}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 20px 0 0; color: #999999; font-size: 13px; line-height: 1.6;">
                    Need to cancel or modify your subscription? Log in to your account to manage your subscriptions.
                  </p>
                </td>
              </tr>
              
              <tr>
                <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
                  <p style="margin: 0 0 10px; color: #999999; font-size: 12px;">
                    © ${new Date().getFullYear()} SubDub. All rights reserved.
                  </p>
                  <p style="margin: 0; color: #999999; font-size: 12px;">
                    You're receiving this because you have an active subscription with us.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};