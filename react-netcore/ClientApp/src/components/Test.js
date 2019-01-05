import React, { Component } from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            isLoaded: false,
            search: '',
        }
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
                        <button label="Delete Item" >Delete</button>
                        </td>
                        </tr>
                
                    ))}
                </tbody>
                </table>
            </div>


        );
    }
}
export default Test;