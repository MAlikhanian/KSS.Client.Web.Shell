import nodemailer from 'nodemailer';

export interface SendEmailContent {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  buttonUrl?: string;
}

export interface SendEmailProps {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  content?: SendEmailContent;
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
  content = {},
}: SendEmailProps) {
  const { title, subtitle, description, buttonLabel, buttonUrl } = content;

  // Build the email HTML template with inline conditions for each section.
  const emailHtml =
    html ??
    `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>${subject}</title>
        </head>
        <body style="margin: 0; padding: 20px 10px; background-color: #f6f6f6; font-family: Arial, sans-serif; color: #333;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f6f6f6;">
            <tr>
              <td align="center">
                <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="5" style="background-color: #ffffff;">
                  <!-- Header -->
                  <tr>
                    <td align="center" style="background-color: #ffffff; color: #333; padding: 20px; text-align: center;">
                      <h1 style="margin: 0; font-size: 20px;">Shoplit</h1>
                    </td>
                  </tr>
                  <!-- Content -->
                  <tr>
                    <td style="padding: 20px; color: #333;">
                      ${title ? `<h2 style="margin-top: 0; font-size: 20px;">${title}</h2>` : ''}
                      ${subtitle ? `<p style="margin: 10px 0; font-size: 16px;">${subtitle}</p>` : ''}
                      ${
                        buttonLabel && buttonUrl
                          ? `
                        <p style="text-align: center; margin: 30px 0;">
                          <a href="${buttonUrl}" style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 9px;">
                            ${buttonLabel}
                          </a>
                        </p>`
                          : ''
                      }
                      ${description ? `<p style="margin: 20px 0; font-size: 16px;">${description}</p>` : ''}
                      <p style="margin: 10px 0; font-size: 16px;">
                        Thank you,<br />
                        Shoplit Team
                      </p>
                    </td>
                  </tr>
                  <!-- Footer (Optional) -->
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `${process.env.SMTP_SENDER} <${process.env.SMTP_FROM}>`,
    to,
    subject,
    text,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${maskEmail(to)}`);
  } catch (error) {
    // The error message can carry the recipient address, so only its class and code are logged.
    console.error(
      `Error sending email to ${maskEmail(to)}: ${describeEmailError(error)}`,
    );
    throw error;
  }
}

/**
 * Masks an address for logging: first character, then "***@domain".
 * A comma-separated list is masked entry by entry.
 */
export function maskEmail(address: unknown): string {
  if (typeof address !== 'string') return '***';
  return address
    .split(',')
    .map((entry) => {
      const value = entry.trim();
      const at = value.lastIndexOf('@');
      if (at < 1) return '***';
      return `${value[0]}***@${value.slice(at + 1)}`;
    })
    .join(', ');
}

/**
 * Describes a send failure without its message: error class, plus the
 * transport code and SMTP response code when they have the expected shape.
 */
export function describeEmailError(error: unknown): string {
  if (!error || typeof error !== 'object') return 'UnknownError';
  const { name, code, responseCode } = error as {
    name?: unknown;
    code?: unknown;
    responseCode?: unknown;
  };
  const parts = [
    typeof name === 'string' && /^[A-Za-z]{1,64}$/.test(name) ? name : 'Error',
  ];
  if (typeof code === 'string' && /^[A-Z0-9_]{1,32}$/.test(code)) {
    parts.push(`code=${code}`);
  }
  if (typeof responseCode === 'number') {
    parts.push(`responseCode=${responseCode}`);
  }
  return parts.join(' ');
}
