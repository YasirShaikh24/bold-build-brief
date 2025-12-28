const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  // Get form data
  const { name, email, message } = req.body;

  // Validate
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email address',
    });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #2E5E99 0%, #0D2440 100%); padding: 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                        📧 New Contact Form Submission
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-bottom: 20px;">
                            <div style="background-color: #E7F0FA; padding: 15px; border-radius: 8px; border-left: 4px solid #2E5E99;">
                              <p style="margin: 0 0 5px 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Name</p>
                              <p style="margin: 0; font-size: 16px; color: #0D2440; font-weight: 600;">${name}</p>
                            </div>
                          </td>
                        </tr>
                        
                        <tr>
                          <td style="padding-bottom: 20px;">
                            <div style="background-color: #E7F0FA; padding: 15px; border-radius: 8px; border-left: 4px solid #2E5E99;">
                              <p style="margin: 0 0 5px 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Email</p>
                              <p style="margin: 0; font-size: 16px; color: #0D2440; font-weight: 600;">
                                <a href="mailto:${email}" style="color: #2E5E99; text-decoration: none;">${email}</a>
                              </p>
                            </div>
                          </td>
                        </tr>
                        
                        <tr>
                          <td style="padding-bottom: 20px;">
                            <div style="background-color: #E7F0FA; padding: 15px; border-radius: 8px; border-left: 4px solid #2E5E99;">
                              <p style="margin: 0 0 10px 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                              <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; min-height: 80px;">
                                <p style="margin: 0; font-size: 15px; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        
                        <tr>
                          <td style="padding-top: 10px;">
                            <a href="mailto:${email}?subject=Re: Your inquiry" 
                               style="display: inline-block; background: linear-gradient(135deg, #2E5E99 0%, #0D2440 100%); color: #ffffff; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                              Reply to ${name}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                      <p style="margin: 0; font-size: 12px; color: #666;">
                        This email was sent from your <strong>InTence</strong> website contact form<br>
                        <span style="color: #999;">Received on ${new Date().toLocaleString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully to:', process.env.RECIPIENT_EMAIL);
    console.log('📧 From:', name, '-', email);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully! We will get back to you soon.',
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again or contact us directly at intence.it@gmail.com',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};