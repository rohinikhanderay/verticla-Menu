import React from 'react'

export class AddressForm extends React.Component  {
    constructor(props) {
        super(props)
        this.state = this.initialState()
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.autocomplete = null
    }

    componentDidMount() {
        this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})

        this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
    }

    initialState() {
        return {
            name: '',
            street_address: '',
            city: '',
            state: '',
            zip_code: '',
            googleMapLink: ''
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
        console.log(event)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.clearForm()
    }

    handlePlaceSelect() {
        let addressObject = this.autocomplete.getPlace()
        let address = addressObject.address_components
        console.log(address)
        let a_street_address, a_city, a_state, a_zip_code

        for (let i = 0; i < address.length; i++) {
            if (address[i].types.includes('street_number')) {
                a_street_address = address[i].long_name
            }
            else if (address[i].types.includes('route')) {
                a_street_address += " " + address[i].long_name
            }
            else if (address[i].types.includes('locality')) {
                a_city = address[i].long_name
            }
            else if (address[i].types.includes('administrative_area_level_1')) {
                a_state = address[i].short_name
            }
            else if (address[i].types.includes('postal_code')) {
                a_zip_code = address[i].short_name
            }
        }

        this.setState({
            name: addressObject.name,
            street_address: a_street_address,
            city: a_city,
            state: a_state,
            zip_code: a_zip_code,
            googleMapLink: addressObject.url
        })
    }

    render() {
        return(
            <div className="max-w-sm mx-auto mt-16">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        id="autocomplete"
                        name={"street_address"}
                        className= 'focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md mt-2'
                        value={this.state.street_address}
                        placeholder={"Street Address"}
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        type="text"
                    />
                    <input 
                        name={"city"}
                        className= 'focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md mt-2'
                        value={this.state.city}
                        placeholder={"City"}
                        onChange={this.handleChange}
                        type="text"
                    />
                    <input
                        name={"state"}
                        className= 'focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md mt-2'
                        value={this.state.state}
                        placeholder={"State"}
                        onChange={this.handleChange}
                        type="text"
                    />
                    <input 
                        name={"zip_code"}
                        className= 'focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md mt-2'
                        value={this.state.zip_code}
                        placeholder={"Zipcode"}
                        onChange={this.handleChange}
                        type="text"
                    />
                    <button onSubmit={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}    
