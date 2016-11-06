var Distance = module.exports = {
  toRadians: function(num) {
    return num * Math.PI / 180;
  },
  calculateCentralAngle: function(lat1, long1, lat2, long2) {
    let absLatChange = Math.abs(Distance.toRadians(lat2 - lat1));
    lat1 = Distance.toRadians(lat1);
    long1 = Distance.toRadians(long1);
    lat2 = Distance.toRadians(lat2);
    long2 = Distance.toRadians(long2);
    let sinLatMult = Math.sin(lat1) * Math.sin(lat2);
    let cosLatMult = Math.cos(lat1) * Math.cos(lat2);
    let centralAngle = Math.acos(sinLatMult + cosLatMult * Math.cos(absLatChange));

    return centralAngle;
  },
  calculateDistance: function(lat1, long1, lat2, long2) {
    let centralAngle = Distance.calculateCentralAngle(lat1, long1, lat2, long2);
    let radiusOfEarth = 6371e3;
    let distance = radiusOfEarth * centralAngle;
    return distance;
  }
}
