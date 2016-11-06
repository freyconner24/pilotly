import React from 'react';
import AddressTable from './AddressTable'

export default class AddressFinder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      maxDistance: "500000",
      isLatLong: true,
      lat: 37.331967,
      long: -122.030306,
      street_number: 1,
      route: "Infinite Loop",
      locality: "Cupertino",
      administrativeArea: "CA",
      country: "United States",
      postalCode: "95014",
      addresses: []
    }

    this.calculateDistanceEndpoint = "http://localhost:3000/getFilteredAddresses";
  }

  componentDidMount() {
  }

  fetchPost(url, data) {
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    if(arguments.length > 1) {
      options.body = JSON.stringify(data);
    }

    return fetch(url, options)
    .then(res => res.json())
    .then((res) => {
      if(res.error) {
        throw res;
      }

      return res;
    })
  }

  handleAddressInputChange(key, e) {
    const state = this.state;
    let value = e.target.value;
    state[key] = value;

    this.setState(state);
  }

  handleMaxDistance(e) {
    let value = e.target.value;
    this.setState({maxDistance: value});
  }

  handleLatChange(e) {
    let value = e.target.value;
    this.setState({lat: value});
  }

  handleLongChange(e) {
    let value = e.target.value;
    this.setState({long: value});
  }

  getGeoCoord() {
    const {
      lat,
      long
    } = this.state;
    return {
      lat: parseFloat(lat),
      long: parseFloat(long)
    };
  }

  getAddressObject() {
    const {
      street_number,
      route,
      locality,
      administrativeArea,
      country,
      postalCode,
    } = this.state;

    return {
      street_number: street_number,
      route: route,
      locality: locality,
      administrativeArea: administrativeArea,
      country: country,
      postalCode: postalCode,
    }
  }

  getAddresses() {
    let {
      maxDistance,
      latLongOrAddress,
      isLatLong
    } = this.state;
    let data = {
      maxDistance: maxDistance
    };

    if(isLatLong) {
      data.geoCoord = this.getGeoCoord();
    } else {
      data.addressObject = this.getAddressObject();
    }

    this.fetchPost(this.calculateDistanceEndpoint, data)
    .then((addresses) => {
      console.log("addresses", addresses);
      if(addresses.error) {
        // handle error
      } else {
        this.setState({addresses: addresses});
      }
    })
  }

  formatAddress(address) {
    const {
      street_number,
      route,
      locality,
      administrativeArea,
      country,
      postalCode,
    } = address;
    return `${street_number} ${route} ${locality}, ${country} ${postalCode}`
  }

  toggleIsLatLong() {
    this.setState({isLatLong: !this.state.isLatLong});
  }

  renderAddresses() {
    return (
      <AdressTable
        addresses={this.state.addresses}
      />
    );
  }

  renderLatLongInputs() {
    const {
      lat,
      long
    } = this.state;

    return (
      <div className="latLongInputs">
        <input
          className="inputNormal"
          value={lat}
          onChange={this.handleLatChange.bind(this)}
          placeholder="Latitude"
        />
        <input
          className="inputNormal"
          value={long}
          onChange={this.handleLongChange.bind(this)}
          placeholder="Longitude"
        />
      </div>
    );
  }

  renderAddressInput() {
    const {
      street_number,
      route,
      locality,
      administrativeArea,
      country,
      postalCode
    } = this.state;

    return (
      <div className="addressInputs">
        <input
          className="inputNormal"
          value={street_number}
          onChange={this.handleAddressInputChange.bind(this, 'street_number')}
          placeholder="Street number"
        />
        <input
          className="inputNormal"
          value={route}
          onChange={this.handleAddressInputChange.bind(this, 'route')}
          placeholder="Route"
        />
        <input
          className="inputNormal"
          value={administrativeArea}
          onChange={this.handleAddressInputChange.bind(this, 'administrativeArea')}
          placeholder="Administrative area"
        />
        <input
          className="inputNormal"
          value={country}
          onChange={this.handleAddressInputChange.bind(this, 'country')}
          placeholder="Country"
        />
        <input
          className="inputNormal"
          value={postalCode}
          onChange={this.handleAddressInputChange.bind(this, 'postalCode')}
          placeholder="Postal code"
        />
      </div>
    );
  }

  render() {
    const pr = this.props;
    const {
      latLongOrAddress,
      maxDistance,
      isLatLong,
      addresses,
    } = this.state;

    return (
      <div className="addressFinderContainer">
        <button
          className="centerBlock mb20"
          onClick={this.toggleIsLatLong.bind(this)}
        >
          {isLatLong ? "SWITCH TO ADDRESS" : "SWITCH TO INPUT LAT & LONG"}
        </button>

        {isLatLong ?
          this.renderLatLongInputs()
          :
          this.renderAddressInput()
        }

        <input
          className="inputNormal centerBlock mb20"
          value={maxDistance}
          onChange={this.handleMaxDistance.bind(this)}
          placeholder="Max Distance (meters)"
        />
        <div>
          <button
            className="centerBlock mb20"
            onClick={this.getAddresses.bind(this)}
          >
            GET ADDRESSES
          </button>
        </div>
        <AddressTable
          addresses={addresses}
        />
      </div>
    )
  }
}
