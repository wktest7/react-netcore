import React, { Component } from 'react';
import { actionCreators } from '../store/Hotel';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Test extends Component {

        state = {
            hotelId: '',
            name: '',
            description: '',
            isLoaded: false,
            search: '',
            editing: ''
        
    }

    componentDidMount() {
        fetch('api/hotels')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json
                })
            });
    }

    handleHotelUpdate(hotel) {
        this.props.updateHotel(hotel);
        setTimeout(this.props.requestHotels, 500);
    }
    
    handleEditField(event) {
        if (event.keyCode === 13) {
            let target = event.target,
                update = {};

            update.name = this.state.editing;
            update[target.name] = target.value;
        }
    }

    handleEditItem() {
        let itemId = this.state.editing;

        var editHotel = this.props.hotels.find((v) => v.name === itemId);

        editHotel.description = this.refs[`description_${itemId}`].value;

        this.handleHotelUpdate(editHotel);
        this.setState({ editing: '' });
    }

    handleHotelDelete(hotel) {
        this.props.deleteHotel(hotel);
    }

    handleDeleteItem() {
        let itemId = this.state.editing;

        var deleteHotel = this.props.hotels.find((v) => v.name === itemId);

        this.handleHotelDelete(deleteHotel);
    }

    onchange = e => {
        this.setState({ search: e.target.value });
      };

    render() {
        var { isLoaded, items } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="search">Search</label>
                    <input className="form-control col-sm-6" id="search" type="text" placeholder="search..." onChange={this.onchange} />
                </div>
                <table>
                <tbody>
                    {items.map(item => (
                        <tr key={item.hotelId}>
                        <td>
                            Name: {item.name}
                        </td>  
                        <td>
                            Description: {item.description}
                        </td>
                        <td>
                        <button onClick={this.handleDeleteItem.bind(this)} label="Delete Item" >Delete</button>
                        </td>
                        </tr>
                
                    ))}
                </tbody>
                </table>
            </div>


        );
    }
}
export default connect(
    state => state.hotels,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Test);