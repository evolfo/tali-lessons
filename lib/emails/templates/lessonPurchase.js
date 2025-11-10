export function generateLessonPurchaseEmail(customerName, items, total) {
  const itemsList = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price}</td>
    </tr>
  `).join('');

  // Calculate total number of lessons
  const totalLessons = items.reduce((sum, item) => {
    // Extract lesson count from item name (e.g., "5 Lessons" -> 5)
    const match = item.name.match(/(\d+)\s*Lesson/i);
    const lessonsPerItem = match ? parseInt(match[1]) : 1;
    return sum + (lessonsPerItem * item.quantity);
  }, 0);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2b77c4 0%, #2a5a8a 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Welcome to Your Recorder Journey!</h1>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Dear ${customerName},</p>

          <p style="font-size: 16px;">Thank you for choosing Tali Recorder Lessons! I'm so excited to work with you and help you achieve your musical goals.</p>

          <h2 style="color: #2b77c4; margin-top: 30px;">Order Summary</h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #2b77c4; color: white;">
                <th style="padding: 12px; text-align: left;">Lesson Package</th>
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

          <div style="background: #fff; padding: 20px; border-left: 4px solid #2b77c4; margin: 30px 0;">
            <h3 style="margin-top: 0; color: #2b77c4;">What Happens Next?</h3>
            <ol style="margin: 10px 0; padding-left: 20px; line-height: 1.8;">
              <li><strong>I'll reach out within 24 hours</strong> to introduce myself and learn about your goals</li>
              <li><strong>We'll schedule your lessons</strong> at times that work best for you</li>
              <li><strong>You'll receive a confirmation email</strong> with lesson details and Zoom links</li>
              <li><strong>I'm looking forward to working with you!</strong></li>
            </ol>
          </div>

          <div style="background: #fff9e6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c3e50;">🎵 Prepare for Your Lessons</h3>
            <p style="margin: 10px 0;">To get the most out of our time together, please:</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Have your recorder ready and in good condition</li>
              <li>Prepare a quiet space with good lighting</li>
              <li>Have any music or pieces you'd like to work on</li>
              <li>Come with questions - there are no silly questions!</li>
            </ul>
          </div>

          <p style="font-size: 16px;">I'm looking forward to working with you and helping you grow as a recorder player. If you have any questions before our first lesson, please feel free to reply to this email.</p>

          <p style="font-size: 16px;">
            See you soon!<br>
            <strong>Tali Rubinstein</strong><br>
            <em>Professional Recorder Player & Teacher</em>
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
