import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    // Mailgun configuration (preferred for production)
    if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: `postmaster@${process.env.MAILGUN_DOMAIN}`,
          pass: process.env.MAILGUN_API_KEY,
        },
      });
      console.log('Mailgun email service initialized');
    }
    // Gmail configuration (fallback)
    else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD, // App-specific password
        },
      });
      console.log('Gmail email service initialized');
    }
    // No email service configured
    else {
      console.log('Email service not configured. Add MAILGUN_API_KEY + MAILGUN_DOMAIN or GMAIL_USER + GMAIL_APP_PASSWORD to enable emails.');
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.transporter) {
      console.log('Email service not configured. Skipping email send.');
      return false;
    }

    try {
      const mailOptions = {
        from: `"ValuationGenie Team" <${process.env.MAILGUN_DOMAIN ? `support@${process.env.MAILGUN_DOMAIN}` : process.env.GMAIL_USER || 'noreply@thevaluationgenie.com'}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${options.to}`);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendWelcomeEmail(email: string, firstName?: string): Promise<boolean> {
    const name = firstName || 'Valued Customer';
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e40af; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f8fafc; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 14px; }
          .button { display: inline-block; background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to ValuationGenie! 🎉</h1>
          </div>
          <div class="content">
            <h2>Hi ${name}!</h2>
            <p>Thank you for signing up with ValuationGenie. You're now part of our community of smart business owners and investors who get instant, professional business valuations.</p>
            
            <h3>What you can do next:</h3>
            <ul>
              <li>📊 <strong>Get Your First Valuation</strong> - Start with our comprehensive questionnaire</li>
              <li>💰 <strong>Professional Reports</strong> - Generate detailed PDF reports for just $39</li>
              <li>📈 <strong>Track Multiple Businesses</strong> - Save and compare different valuations</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="https://${process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000'}/valuation" class="button">Start Your First Valuation</a>
            </div>
            
            <p>Our 100% halal-compliant valuation system uses industry-standard SDE (Seller's Discretionary Earnings) methodology to give you accurate business valuations in minutes, not weeks.</p>
            
            <p>If you have any questions, feel free to reach out to our support team.</p>
            
            <p>Best regards,<br>The ValuationGenie Team</p>
          </div>
          <div class="footer">
            <p>© 2025 ValuationGenie. All rights reserved.</p>
            <p>Professional business valuations made simple.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Welcome to ValuationGenie!
      
      Hi ${name}!
      
      Thank you for signing up with ValuationGenie. You're now part of our community of smart business owners and investors who get instant, professional business valuations.
      
      What you can do next:
      - Get Your First Valuation - Start with our comprehensive questionnaire
      - Professional Reports - Generate detailed PDF reports for just $39
      - Track Multiple Businesses - Save and compare different valuations
      
      Visit ${process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000'}/valuation to start your first valuation.
      
      Our 100% halal-compliant valuation system uses industry-standard SDE methodology to give you accurate business valuations in minutes, not weeks.
      
      Best regards,
      The ValuationGenie Team
    `;

    return this.sendEmail({
      to: email,
      subject: 'Welcome to ValuationGenie - Start Your Business Valuation Journey!',
      html,
      text,
    });
  }
}

export const emailService = new EmailService();