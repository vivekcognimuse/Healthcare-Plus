import React from "react";
import Script from "next/script";

const GoogleAnalytics = () => {
  // Replace G-XXXXXXXXXX with your actual Google Analytics 4 measurement ID
  const GA_MEASUREMENT_ID = "";

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              transport_url: 'https://www.google-analytics.com',
              cookie_domain: 'auto',
              cookie_flags: 'SameSite=None;Secure',
              anonymize_ip: true
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
