import { Resend } from 'resend';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private resend: Resend | null = null;

  constructor() {
    this.initializeResend();
  }

  private initializeResend() {
    // Resend configuration
    if (process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY);
      console.log('Resend email service initialized');
    } else {
      console.log('Email service not configured. Add RESEND_API_KEY to enable emails.');
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.resend) {
      console.log('Email service not configured. Skipping email send.');
      return false;
    }

    try {
      const result = await this.resend.emails.send({
        from: 'ValuationGenie <noreply@thevaluationgenie.com>',
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });

      console.log(`Email sent successfully to ${options.to}`, result);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendWelcomeEmail(email: string, firstName?: string): Promise<boolean> {
    const name = firstName || 'Valued Customer';
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://thevaluationgenie.com';
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">Welcome to ValuationGenie!</h1>
          <p style="color: #64748b; font-size: 18px; margin: 10px 0;">Your professional business valuation platform</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #1e293b; margin-top: 0;">Hello ${name}!</h2>
          <p style="color: #475569; line-height: 1.6;">
            Thank you for joining ValuationGenie! Your account has been successfully created, and you're now ready to access professional business valuations.
          </p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1e293b;">What you can do now:</h3>
          <ul style="color: #475569; line-height: 1.6;">
            <li>Create comprehensive business valuation reports</li>
            <li>Access industry-specific valuation multipliers</li>
            <li>Generate professional PDF reports</li>
            <li>Track your valuation history</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${baseUrl}/login" 
             style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Start Your First Valuation
          </a>
        </div>
        
        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #475569; font-size: 14px; margin: 0; text-align: center;">
            <strong>Having trouble with the button?</strong><br>
            Copy and paste this link into your browser: ${baseUrl}/login
          </p>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center;">
          <p style="color: #94a3b8; font-size: 14px; margin: 0;">
            Best regards,<br>
            The ValuationGenie Team
          </p>
        </div>
      </div>
    `;

    const text = `
      Welcome to ValuationGenie, ${name}!

      Thank you for joining ValuationGenie! Your account has been successfully created, and you're now ready to access professional business valuations.

      What you can do now:
      - Create comprehensive business valuation reports
      - Access industry-specific valuation multipliers  
      - Generate professional PDF reports
      - Track your valuation history

      Start your first valuation: ${baseUrl}/login

      Best regards,
      The ValuationGenie Team
    `;

    return this.sendEmail({
      to: email,
      subject: 'Welcome to ValuationGenie - Your Professional Business Valuation Platform',
      html,
      text,
    });
  }



  async sendAppSumoActivationEmail(email: string, tierName: string, monthlyLimit?: number): Promise<boolean> {
    const limitText = monthlyLimit ? `${monthlyLimit} reports per month` : 'unlimited reports';
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://thevaluationgenie.com';
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">🎉 AppSumo Lifetime Deal Activated!</h1>
          <p style="color: #64748b; font-size: 18px; margin: 10px 0;">Your ${tierName} plan is now active</p>
        </div>
        
        <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); padding: 20px; border-radius: 10px; margin-bottom: 20px; color: white; text-align: center;">
          <h2 style="margin: 0 0 10px 0;">🔥 ${tierName.toUpperCase()} LIFETIME ACCESS</h2>
          <p style="margin: 0; font-size: 18px; font-weight: bold;">${limitText}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1e293b;">Your lifetime benefits include:</h3>
          <ul style="color: #475569; line-height: 1.6;">
            <li>✅ ${limitText}</li>
            <li>✅ Premium PDF reports</li>
            <li>✅ Priority generation</li>
            <li>✅ Email support</li>
            <li>✅ No monthly fees ever</li>
            ${tierName === 'unlimited' || tierName === 'pro' ? '<li>✅ Early access to new features</li>' : ''}
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${baseUrl}/dashboard" 
             style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Access Your Dashboard
          </a>
        </div>
        
        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #475569; font-size: 14px; margin: 0; text-align: center;">
            <strong>Having trouble with the button?</strong><br>
            Copy and paste this link into your browser: ${baseUrl}/dashboard
          </p>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center;">
          <p style="color: #94a3b8; font-size: 14px; margin: 0;">
            Thank you for choosing ValuationGenie!<br>
            The ValuationGenie Team
          </p>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: email,
      subject: `🎉 AppSumo ${tierName} Lifetime Deal Activated - ValuationGenie`,
      html,
    });
  }
}

export const emailService = new EmailService();