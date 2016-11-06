import React from 'react';
import AddressRow from './AddressRow'

export default class AddressTable extends React.Component {

  renderAddressRows() {
    return this.props.addresses.map((address, i) => {
      return (
        <AddressRow
          key={i}
          address={address}
        />
      );
    })
  }

  render() {
    return (
      <div className="addressTableContainer">
        {this.renderAddressRows()}
      </div>
    )
  }
}
