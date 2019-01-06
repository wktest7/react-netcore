import React, { Component } from 'react';
import { actionCreators } from '../store/Hotel';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
    
    handleDeleteItem(id) {
        this.props.deleteHotel(id);
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
                                    <button onClick={this.handleDeleteItem.bind(this, item.hotelId)} className="btn btn-danger" >Delete</button>
                                    <Link to={`/edit/${item.hotelId}`} className="btn btn-success btn-space pull-right">Edit</Link>
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