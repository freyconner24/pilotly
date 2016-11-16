import { Meteor } from 'meteor/meteor';
import Distance from '../modules/Distance'
import GeoCoords from '../modules/GeoCoords'

Meteor.startup(() => {
});

if(Meteor.isServer) {
  Router.route('/getFilteredAddresses', {where : 'server'})
  .post(function() {
    var addresses = JSON.parse(Assets.getText("addresses.json"));

    const {
      geoCoord,
      addressObject,
      maxDistance,
    } = this.request.body;

    let lat1;
    let long1;

    if(geoCoord) {
      lat1 = geoCoord.lat;
      long1 = geoCoord.long;
      if(lat1 == null || long1 == null) {
        return this.response.end(JSON.stringify({error: "latitude or longitude are null"}));
      }
    } else if(addressObject) {
      let geoCoordFromAddress = GeoCoords.getGeoCoordByAddress(addressObject, addresses);
      if(!geoCoordFromAddress) {
        return this.response.end(JSON.stringify({error: "address not found"}));
      }
      lat1 = geoCoordFromAddress.lat;
      long1 = geoCoordFromAddress.long;
    } else {
      return this.response.end(JSON.stringify({error: "bad value passed"}));
    }

    let responseAddresses = [];

    addresses.map((address) => {
      const {
        latitude,
        longitude,
      } = address;
      const distance = Distance.calculateDistance(lat1, long1, latitude, longitude);
      if(distance < maxDistance) {
        responseAddresses.push(address)
      }
    })

    return this.response.end(JSON.stringify(responseAddresses));
  });
}
