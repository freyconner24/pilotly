var geoCoords = module.exports = {
  getGeoCoordByAddress: function(addressObject, addresses) {
    let resAddress = null;
    addresses.map((address) => {
      const {
        street_number,
        route,
        locality,
        administrativeArea,
        country,
        postalCode,
      } = address;

      if(
        addressObject.street_number == street_number &&
        addressObject.route == route &&
        addressObject.locality == locality &&
        addressObject.administrativeArea == administrativeArea &&
        addressObject.country == country &&
        addressObject.postalCode == postalCode
      ) {
        resAddress = address;
      }
    });

    if(!resAddress) {
      return null;
    }

    return {
      lat: resAddress.latitude,
      long: resAddress.longitude
    };
  }
}
