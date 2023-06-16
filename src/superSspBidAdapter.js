// super-ssp-bid-adapter.js

// Function to send a bid request to the server
function sendBidRequest() {
    // Replace the following variables with your actual data
    const ssspUid = 123; // Unique identifier passed in the configuration
    const adUnitCode = 'yourAdUnitCode';
    const auctionId = 'yourAuctionId';
    const bidId = 'yourBidId';
    const page = 'yourPageURL';
    const domain = 'yourDomain';
    const publisherDomain = 'yourPublisherDomain';
    const w = 300; // Device width
    const h = 250; // Device height
  
    // Construct the payload
    const payload = {
      ssspUid,
      adUnitCode,
      auctionId,
      bidId,
      mediaType: {
        banner: { sizes: [] },
      },
      site: {
        page,
        domain,
        publisher: {
          domain: publisherDomain,
        },
      },
      device: {
        w,
        h,
      },
      pubProvidedIds: {
        // Define your pubProvidedIds data here
      },
      tdidRepetition: 0, // Set tdidRepetition value according to the rules you mentioned
    };
  
    // Make an HTTP POST request to your server
    fetch('http://www.superssp.com:1234/api/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        // Process the response from the server
        console.log(data);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }
  
  // Call the sendBidRequest function to initiate the bid request
  sendBidRequest();
  