export function generateSheetMusicPurchaseEmail(customerName, items, total) {
  const itemsList = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">🎼 Thank You for Your Purchase!</h1>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Dear ${customerName},</p>

          <p style="font-size: 16px;">Thank you for purchasing my sheet music!</p>

          <h2 style="color: #667eea; margin-top: 30px;">Order Summary</h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #667eea; color: white;">
                <th style="padding: 12px; text-align: left;">Sheet Music</th>
                <th style="padding: 12px; text-align: center;">Quantity</th>
                <th style="padding: 12px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
            <tfoot>
              <tr style="font-weight: bold; background: #f0f0f0;">
                <td colspan="2" style="padding: 12px; text-align: right;">Total:</td>
                <td style="padding: 12px; text-align: right;">$${total}</td>
              </tr>
            </tfoot>
          </table>

          <div style="background: #fff; padding: 20px; border-left: 4px solid #667eea; margin: 30px 0;">
            <h3 style="margin-top: 0; color: #667eea;">📥 Your Sheet Music is Attached to this Email!</h3>
          </div>

          <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c3e50;">🎵 Practice Tips</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Start slowly and focus on accuracy before speed</li>
              <li>Practice difficult sections separately</li>
              <li>Record yourself to hear your progress</li>
              <li>Have fun and enjoy the music!</li>
            </ul>
          </div>

          <p style="font-size: 16px;">If you have any questions about the sheet music or need help with anything, please don't hesitate to book a lesson with me!</p>

          <p style="font-size: 16px;">
            Happy playing!<br>
            <strong>Tali Rubinstein</strong><br>
            <em>Professional Recorder Player</em>
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

          <p style="font-size: 12px; color: #888; text-align: center;">
            © ${new Date().getFullYear()} Tali Recorder Lessons. All rights reserved.
          </p>
        </div>
      </body>
    </html>
  `;
}
