import React, { Component } from 'react';
import { actionCreators } from '../store/Hotel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelId: '',
            name: '',
            description: '',
        }
    }

    updateHotel(e) {
        e.preventDefault();
        const hotel = {
            hotelId: this.state.hotelId,
            name: this.state.name,
            description: this.state.description };
        this.props.updateHotel(hotel);
        this.setState({
            name: '',
            description: ''
          });
    }

    render() {
        return (
            <form>
                <h1>Edit hotel</h1>

                <div className="form-group">
                    <label htmlFor="hotelName">Name</label>
                    <input className="form-control col-sm-6" id="hotelName" type="text" value={this.state.name} onChange={(ev) => this.setState({ name: ev.target.value })} />
                </div>

                <div className="form-group">
                    <label htmlFor="hotelDescription">Description</label>
                    <input className="form-control col-sm-6" id="hotelDescription" type="text" value={this.state.description} onChange={(ev) => this.setState({ description: ev.target.value })} />
                </div>
                <button className="btn btn-primary" onClick={this.updateHotel.bind(this)}>Update</button>
            </form>
        )
    }
}

export default connect(
    state => state.hotels,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Edit);