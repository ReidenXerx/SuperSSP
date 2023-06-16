import { registerBidder } from 'prebid.js/src/adapters/bidderFactory.js';
import * as utils from 'prebid.js/src/utils.js';
import { BANNER } from 'prebid.js/src/mediaTypes.js';
import {config} from 'prebid.js/src/config.js';


const BIDDER_CODE = 'superssp';

export const spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [BANNER],

  isBidRequestValid: function(bid) {
    return !!bid.params.ssspUid;
  },

  buildRequests: function(validBidRequests, bidderRequest) {
    let payload = validBidRequests.map(bidRequest => {
      let pubProvidedIds = config.getConfig('pubProvidedIds') || [];
      let unifiedId = config.getConfig('unifiedId') || '';
      
      // Convert pubProvidedIds to required format
      let pubProvidedIdsObject = pubProvidedIds.reduce((acc, cur) => {
        if (acc[cur.source]) {
          acc[cur.source].push(cur.id);
        } else {
          acc[cur.source] = [cur.id];
        }
        return acc;
      }, {});
      
      // Handle tdidRepetition
      let tdidRepetition = -2;
      if (unifiedId) {
        if (pubProvidedIdsObject["adserver.org"] && pubProvidedIdsObject["adserver.org"].includes(unifiedId)) {
          tdidRepetition = pubProvidedIdsObject["adserver.org"].indexOf(unifiedId);
        } else {
          tdidRepetition = -1;
        }
      }
      
      return {
        ssspUid: bidRequest.params.ssspUid,
        adUnitCode: bidRequest.adUnitCode,
        auctionId: bidRequest.auctionId,
        bidId: bidRequest.bidId,
        mediaType: bidRequest.mediaTypes,
        site: {
          page: bidderRequest.refererInfo.referer,
          domain: utils.parseUrl(bidderRequest.refererInfo.referer).hostname,
          publisher: {
            domain: utils.parseUrl(bidderRequest.refererInfo.referer).hostname
          },
        },
        device: {
          w: window.innerWidth,
          h: window.innerHeight
        },
        pubProvidedIds: pubProvidedIdsObject,
        tdidRepetition: tdidRepetition
      }
    });

    return {
      method: 'POST',
      url: 'http://www.superssp.com:1234/api/v1',
      data: payload
    };
  },

  interpretResponse: function(serverResponse, request) {
    // Transform server response to prebid's expected format
  },

  getUserSyncs: function(syncOptions, serverResponses, gdprConsent, uspConsent) {
    // Synchronize users if necessary
  },

  onTimeout: function(timeoutData) {
    // Handle timeout
  },

  onBidWon: function(bid) {
    // Handle bid won
  },

  onSetTargeting: function(bid) {
    // Handle set targeting
  }
};

registerBidder(spec);
