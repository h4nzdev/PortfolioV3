import { personalInfo } from '../data/portfolioData';

/**
 * Generates formatted mailto link with encoded subject and body as fallback.
 */
export function generateMailtoLink({ name, email, subject, message }) {
  const encSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${name}`);
  const encBody = encodeURIComponent(
    `Hello Hanz,\n\nSender: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via hanzmagbal.com communication portal`
  );
  return `mailto:${personalInfo.email}?subject=${encSubject}&body=${encBody}`;
}

/**
 * Sends contact form payload to Web3Forms API.
 * If no access key is present or the request fails, provides clean error info and fallback mailto.
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.email
 * @param {string} params.subject
 * @param {string} params.message
 * @param {string} [params.botcheck]
 * @returns {Promise<{success: boolean, message?: string, error?: string, isMissingKey?: boolean, fallbackMailto?: string}>}
 */
export async function sendContactMessage({ name, email, subject, message, botcheck }) {
  // Anti-spam honeypot
  if (botcheck) {
    return { success: false, error: 'Spam detected.' };
  }

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();

  // If no access key is configured yet in .env, gracefully provide direct mailto fallback
  if (!accessKey) {
    return {
      success: false,
      isMissingKey: true,
      error: 'Web3Forms access key not yet configured in .env',
      fallbackMailto: generateMailtoLink({ name, email, subject, message }),
    };
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject: subject || `Portfolio Inquiry from ${name}`,
        message,
        from_name: 'Hanz Dev Portfolio Contact Portal',
      }),
    });

    const result = await response.json();

    if (result.success) {
      return { success: true, message: result.message || 'Message transmitted successfully.' };
    } else {
      return {
        success: false,
        error: result.message || 'Submission was not accepted by gateway.',
        fallbackMailto: generateMailtoLink({ name, email, subject, message }),
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Network connection error.',
      fallbackMailto: generateMailtoLink({ name, email, subject, message }),
    };
  }
}
