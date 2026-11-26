import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || '"Shibani Travels" <bookings@shibanitravels.com>';

let transporter: nodemailer.Transporter | null = null;

async function getTransporter() {
  if (transporter) return transporter;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });
  } else {
    // Development mode fallback
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log('Nodemailer: Configured Ethereal Mail test account for development emails.');
    } catch (err) {
      console.warn('Nodemailer: Failed to create test account, falling back to console logging.', err);
      // Mock transporter
      transporter = {
        sendMail: async (options: any) => {
          console.log('--- MOCK EMAIL SENT ---');
          console.log(`To: ${options.to}`);
          console.log(`Subject: ${options.subject}`);
          console.log(`Text:\n${options.text}`);
          console.log('-----------------------');
          return { messageId: 'mock-id-' + Date.now() };
        }
      } as any;
    }
  }

  return transporter!;
}

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  try {
    const client = await getTransporter();
    const info = await client.sendMail({
      from: SMTP_FROM,
      to,
      subject,
      text,
      html
    });
    console.log(`Email sent successfully: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}
