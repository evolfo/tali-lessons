export function generateAdminNotificationEmail(customerName, customerEmail, items, total, purchaseType) {
  const itemsList = items.map(item => `
    <li style="margin-bottom: 10px;">
      <strong>${item.name}</strong> - Quantity: ${item.quantity} - Price: $${item.price}
    </li>
  `).join('');

  const typeEmoji = purchaseType === 'lessons' ? '🎓' : '🎼';
  const typeLabel = purchaseType === 'lessons' ? 'Lesson' : 'Sheet Music';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #2c3e50; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">${typeEmoji} New ${typeLabel} Purchase!</h1>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: ${purchaseType === 'lessons' ? '#e8f4f8' : '#f0e8ff'}; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #2c3e50; margin: 0;">Customer Information</h2>
          </div>

          <table style="width: 100%; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 100px;">Name:</td>
              <td style="padding: 8px 0;">${customerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${customerEmail}" style="color: #2b77c4; text-decoration: none;">
                  ${customerEmail}
                </a>
              </td>
            </tr>
          </table>

          <div style="background: ${purchaseType === 'lessons' ? '#e8f4f8' : '#f0e8ff'}; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #2c3e50; margin: 0 0 15px 0;">Order Details</h2>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${itemsList}
            </ul>
          </div>

          <div style="background: #fff; padding: 20px; border-left: 4px solid #2b77c4; margin: 20px 0;">
            <p style="font-size: 20px; margin: 0; font-weight: bold; color: #2c3e50;">
              Total Amount: $${total}
            </p>
          </div>

          ${purchaseType === 'lessons' ? `
          <div style="background: #fff9e6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #d97706;">⚠️ Action Required</h3>
            <p style="margin: 0;"><strong>Remember to:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Reach out to the customer within 24 hours</li>
              <li>Schedule lesson times that work for both of you</li>
              <li>Send calendar invites with Zoom links</li>
              <li>Prepare any materials needed for the lessons</li>
            </ul>
          </div>
          ` : `
          <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2b77c4;">✅ Sheet Music Delivered</h3>
            <p style="margin: 0;"><strong>Good news:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Sheet music PDFs were automatically attached to the customer's email</li>
              <li>Verify the email was delivered successfully in Resend dashboard</li>
              <li>Keep a record of this purchase</li>
            </ul>
          </div>
          `}

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

          <p style="font-size: 12px; color: #888;">
            This is an automated notification from your Tali Recorder Lessons store.<br>
            Purchase time: ${new Date().toLocaleString('en-US', {
              timeZone: 'America/New_York',
              dateStyle: 'full',
              timeStyle: 'short'
            })}
          </p>
        </div>
      </body>
    </html>
  `;
}
