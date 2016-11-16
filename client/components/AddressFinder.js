import React from 'react';
import AddressTable from './AddressTable'
import Api from '../../modules/Api'
import Status from '../../modules/Status'

export default class AddressFinder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      maxDistance: "",
      isLatLong: true,
      lat: "",
      long: "",
      street_number: "",
      route: "",
      locality: "",
      administrativeArea: "",
      country: "",
      postalCode: "",
      addresses: [],
      inputStatus: Status.INITIAL,
      inputError: ""
    }

    this.calculateDistanceEndpoint = "http://localhost:3000/getFilteredAddresses";
  }

  componentDidMount() {
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
    this.setState({inputStatus: Status.PENDING});
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

    Api.post(this.calculateDistanceEndpoint, data)
    .then((addresses) => {
      // console.log("addresses", addresses);
      this.setState({
        addresses: addresses,
        inputStatus: Status.SUCCESS
      });
    })
    .catch((err) => {
      console.log("err", err);
      this.setState({
        inputStatus: Status.ERROR,
        addresses: [],
        inputError: err.error
      });
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

  renderInputStatus(inputStatus) {
    switch (inputStatus) {
      case Status.INITIAL:
        return null;
      case Status.ERROR:
        return <div className="errorMessage" style={{marginBottom: "20px"}}>You got an error: {this.state.inputError}</div>;
      case Status.PENDING:
        return <img className="addressLoader" src="https://graphiclineweb.files.wordpress.com/2013/10/ajaxloader.gif?w=604" />;
      default:
        return null;
    }
  }

  renderAddressTable() {
    const {
      inputStatus,
      addresses
    } = this.state;

    if(inputStatus == Status.SUCCESS) {
      return <AddressTable
        addresses={addresses}
      />;
    }

    return null;
  }

  render() {
    const pr = this.props;
    const {
      latLongOrAddress,
      maxDistance,
      isLatLong,
      addresses,
      inputStatus,
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
        {this.renderInputStatus(inputStatus)}
        {this.renderAddressTable()}
      </div>
    )
  }
}
