import React, { Component } from 'react';
import { actionCreators } from '../store/Hotel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelId: '',
            name: '',
            description: ''
        }
    }

    addHotel() {
        const hotel = {
            hotelId: this.state.hotelId,
            name: this.state.name,
            description: this.state.description };
        this.props.addHotel(hotel);
    }

    render() {

        return (
            <form>
                <h1>Add hotel</h1>

                <div className="form-group">
                    <label htmlFor="hotelName">ID</label>
                    <input className="form-control col-sm-6" id="hotelId" type="text" value={this.state.hotelId} onChange={(ev) => this.setState({ hotelId: ev.target.value })} />
                </div>

                <div className="form-group">
                    <label htmlFor="hotelName">Name</label>
                    <input className="form-control col-sm-6" id="hotelName" type="text" value={this.state.name} onChange={(ev) => this.setState({ name: ev.target.value })} />
                </div>

                <div className="form-group">
                    <label htmlFor="hotelDescription">Description</label>
                    <input className="form-control col-sm-6" id="hotelDescription" type="text" value={this.state.description} onChange={(ev) => this.setState({ description: ev.target.value })} />
                </div>
                <button className="btn btn-primary" onClick={this.addHotel.bind(this)}>Add</button>
            </form>
        )
    }
}

export default connect(
    state => state.hotels,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Add);