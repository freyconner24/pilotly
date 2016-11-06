import React from 'react';

export default class AddressRow extends React.Component {
  render() {
    const {
      street_number,
      route,
      locality,
      administrativeArea,
      country,
      postalCode
    } = this.props.address;

    return (
      <div className="addressRowContainer">
        {street_number} {route} {locality}, {administrativeArea}; {country} {postalCode}
      </div>
    )
  }
}
