import { company } from '$lib/data/generic';
import type { TemplateParams } from '../templates';

const templateHTML = ({ toEmail, baseURL, unsubscribeURL, iconURL, logoURL }: TemplateParams): string => `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Merriweather&family=Open+Sans&display=swap" rel="stylesheet" media="screen">
  <title>Newsletter Subscription</title>
  <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings
            xmlns:o="urn:schemas-microsoft-com:office:office"
          >
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <style>
        td,
        th,
        div,
        p,
        a,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Segoe UI", sans-serif;
          mso-line-height-rule: exactly;
        }
      </style>
    <![endif]-->
  <title>Confirm your email address</title>
  <style>
    .hover-important-text-decoration-underline:hover {
      text-decoration: underline !important
    }
    @media (prefers-color-scheme: dark) {
      .dark-border-neutral-700 {
        border-color: #404040 !important
      }
      .dark-bg-neutral-700 {
        background-color: #404040 !important
      }
      .dark-bg-neutral-800 {
        background-color: #262626 !important
      }
      .dark-bg-neutral-900 {
        background-color: #171717 !important
      }
      .dark-text-indigo-500 {
        color: #6366f1 !important
      }
      .dark-text-neutral-200 {
        color: #e5e5e5 !important
      }
      .dark-text-neutral-400 {
        color: #a3a3a3 !important
      }
    }
    @media (max-width: 600px) {
      .sm-my-8 {
        margin-top: 32px !important;
        margin-bottom: 32px !important
      }
      .sm-px-4 {
        padding-left: 16px !important;
        padding-right: 16px !important
      }
      .sm-text-2xl {
        font-size: 24px !important
      }
      .sm-text-sm {
        font-size: 14px !important
      }
    }
  </style>
</head>
<body style="margin: 0; width: 100%; background-color: #fafafa; padding: 0; -webkit-font-smoothing: antialiased; word-break: break-word">
  <div style="display: none">
    Please confirm your email address in order to activate your account.
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847;
    &#8199;&#65279;&#847; </div>
  <div role="article" aria-roledescription="email" aria-label="Confirm your email address" lang="en">
    <div class="dark-bg-neutral-900 sm-px-4 dark-text-neutral-200" style="background-color: #e5e5e5; font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; color: #171717">
      <table align="center" style="width: 100%; max-width: 640px" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td style="width: 100%;">
            <div class="sm-my-8" style="margin-top: 48px; margin-bottom: 48px; text-align: center">
              <a href="${baseURL}">
                <img src="${baseURL}${iconURL}" width="70" alt="${company.name}" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0">
              </a>
            </div>
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td class="dark-border-neutral-700 dark-bg-neutral-800" style="height: 100%; width: 100%; border-radius: 8px; background-color: #fafafa; padding: 32px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); border: 1px solid #e5e5e5">
                  <div class="sm-text-sm">
                    <h1 class="sm-text-2xl" style="font-size: 36px; font-weight: 700">
                      You have successfully<br>
                      signed up!
                    </h1>
                    <h2></h2>
                    <div class="dark-bg-neutral-700" style="margin-top: 24px; margin-bottom: 24px; height: 1px; background-color: #f5f5f5"></div>
                    <p>
                      Welcome to ${company.name} Newsletter! We're delighted to have you
                      as part of our community.
                      <br><br><br>
                      First of all, we promise to only send you email
                      occassionally. Also, we promise to respect your privacy.
                      <br><br>
                      Stay informed about:
                    </p>
                    <ul class="sm-text-sm" style="margin-top: 16px; list-style-type: disc">
                      <li>New Product Releases</li>
                      <li>Helpful Tips and Trends</li>
                      <li>Exclusive Offers and Events</li>
                    </ul> <br>
                    If you ever wish to update your email preferences or
                    unsubscribe, you can do so at any time using the link
                    provided at the bottom of our emails. <br>If you have any
                    questions or need assistance, feel free to reach out to our
                    customer support team at ${baseURL}/support. <br><br><br>
                    Thank you for joining us.<br><br>We look forward to keeping
                    you in the loop! <br><br>Best regards, <br><br>
                    <span style="margin-top: 8px; font-weight: 700">${company.staff.ceo},</span>
                    <br>Founder, <span style="font-style: italic">${company.name}</span>
                    <p></p>
                  </div>
                </td>
              </tr>
              <tr role="separator">
                <td style="line-height: 48px">&zwj;</td>
              </tr>
              <tr>
                <td class="dark-text-neutral-400" style="padding-left: 24px; padding-right: 24px; text-align: center; font-size: 12px; color: #525252">
                  <p style="margin: 0 0 16px; text-transform: uppercase">${company.name}</p>
                  <p style="margin: 0; font-style: italic;">
                    Quickly build HTML emails with utility-first CSS
                  </p>
                  <p style="cursor: default">
                    <a href="https://maizzle.com/docs/" class="dark-text-indigo-500 hover-important-text-decoration-underline" style="color: #4338ca; text-decoration: none">Docs</a>
                    &bull;
                    <a href="https://github.com/maizzle" class="dark-text-indigo-500 hover-important-text-decoration-underline" style="color: #4338ca; text-decoration: none">Github</a>
                    &bull;
                    <a href="https://twitter.com/maizzlejs" class="dark-text-indigo-500 hover-important-text-decoration-underline" style="color: #4338ca; text-decoration: none">Twitter</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>`;

// export template HTML as default

export default templateHTML;
