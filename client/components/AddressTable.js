import React from 'react';
import AddressRow from './AddressRow'

export default class AddressTable extends React.Component {

  renderAddressRows() {
    const addresses = this.props.addresses;
    if(!addresses.length) {
      return <div className="p20">No addresses to display</div>
    }
    return addresses.map((address, i) => {
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
