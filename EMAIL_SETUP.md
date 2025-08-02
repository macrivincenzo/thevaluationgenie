# Email Setup for ValuationGenie

## Gmail Setup (Recommended - Free!)

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to https://myaccount.google.com/security
   - Turn on 2-Step Verification if not already enabled

2. **Create App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password (looks like: "abcd efgh ijkl mnop")

3. **Add Environment Variables**:
   - `GMAIL_USER`: Your Gmail address (e.g., yourname@gmail.com)
   - `GMAIL_APP_PASSWORD`: The 16-character app password

## Alternative: Other Email Services

The system can be easily configured for other providers:
- **Outlook/Hotmail**: Change service to 'outlook'
- **Yahoo**: Change service to 'yahoo'
- **Custom SMTP**: Configure with custom host, port, and security settings

## Testing

Once configured, every new user signup will automatically receive a beautiful welcome email with:
- Personalized greeting
- Overview of ValuationGenie features
- Direct link to start their first valuation
- Professional branding

The email system is non-blocking, so if email fails, user signup still succeeds.