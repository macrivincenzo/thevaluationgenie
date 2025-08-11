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

  async sendWelcomeEmail(email: string, firstName?: string, isAppSumo: boolean = false): Promise<boolean> {
    const name = firstName || 'Valued Customer';
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://thevaluationgenie.com';
    
    const appSumoSection = isAppSumo ? `
      <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h3 style="color: #d97706; margin-top: 0; display: flex; align-items: center;">
          🎉 Don't Forget to Activate Your AppSumo Code!
        </h3>
        <p style="color: #92400e; line-height: 1.6; margin-bottom: 15px;">
          You have an AppSumo activation code that unlocks lifetime access to ValuationGenie. Don't miss out on activating it!
        </p>
        <div style="text-align: center;">
          <a href="${baseUrl}/lifetime" 
             style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Activate Your Code Now
          </a>
        </div>
      </div>
    ` : '';
    
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
        
        ${appSumoSection}
        
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
          <a href="${baseUrl}/dashboard" 
             style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Start Your First Valuation
          </a>
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

      Start your first valuation: ${baseUrl}/dashboard

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

  async sendAppSumoWelcomeEmail(email: string, activationCode: string, tier: string): Promise<boolean> {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://thevaluationgenie.com';
    
    const tierName = tier === 'basic' ? 'Basic' : tier === 'pro' ? 'Pro' : 'Unlimited';
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">🎉 Welcome to ValuationGenie!</h1>
          <p style="color: #64748b; font-size: 18px; margin: 10px 0;">Your AppSumo Lifetime Deal is Ready!</p>
        </div>
        
        <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #d97706; margin-top: 0; text-align: center;">🚀 Your AppSumo ${tierName} Access</h2>
          <p style="color: #92400e; line-height: 1.6; text-align: center; margin-bottom: 20px;">
            Thank you for purchasing ValuationGenie through AppSumo! Follow these 2 simple steps to get started:
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Step 1: Create Your Account</h3>
            <div style="text-align: center; margin: 15px 0;">
              <a href="${baseUrl}/signup" 
                 style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Create Account Now
              </a>
            </div>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Step 2: Activate Your Lifetime Code</h3>
            <p style="color: #475569; margin-bottom: 15px;">Your activation code:</p>
            <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; text-align: center; margin: 15px 0;">
              <code style="font-size: 18px; font-weight: bold; color: #1e293b;">${activationCode}</code>
            </div>
            <div style="text-align: center; margin: 15px 0;">
              <a href="${baseUrl}/lifetime" 
                 style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Activate Code
              </a>
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1e293b;">What you get with ${tierName} access:</h3>
          <ul style="color: #475569; line-height: 1.6;">
            <li>Professional business valuation reports</li>
            <li>Industry-specific valuation multipliers</li>
            <li>PDF report generation</li>
            <li>${tier === 'basic' ? '5 reports per month' : tier === 'pro' ? '10 reports per month' : 'Unlimited reports'}</li>
          </ul>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center;">
          <p style="color: #94a3b8; font-size: 14px; margin: 0;">
            Questions? Just reply to this email!<br>
            The ValuationGenie Team
          </p>
        </div>
      </div>
    `;

    const text = `
      Welcome to ValuationGenie - Your AppSumo ${tierName} Access is Ready!

      Thank you for purchasing ValuationGenie through AppSumo! Follow these 2 simple steps:

      Step 1: Create Your Account
      Visit: ${baseUrl}/signup

      Step 2: Activate Your Lifetime Code
      Your activation code: ${activationCode}
      Activate at: ${baseUrl}/lifetime

      What you get with ${tierName} access:
      - Professional business valuation reports
      - Industry-specific valuation multipliers
      - PDF report generation
      - ${tier === 'basic' ? '5 reports per month' : tier === 'pro' ? '10 reports per month' : 'Unlimited reports'}

      Questions? Just reply to this email!
      The ValuationGenie Team
    `;

    return this.sendEmail({
      to: email,
      subject: `🎉 Your AppSumo ValuationGenie ${tierName} Access is Ready!`,
      html,
      text,
    });
  }

  async sendAppSumoActivationEmail(email: string, tierName: string, monthlyLimit?: number): Promise<boolean> {
    const limitText = monthlyLimit ? `${monthlyLimit} reports per month` : 'unlimited reports';
    
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
          <a href="https://thevaluationgenie.com/dashboard" 
             style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Access Your Dashboard
          </a>
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