import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { LocationMarkerIcon} from '@heroicons/react/solid'


export class LocationSearchInputAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = (address) => {
    this.props.onChange(address)
    this.setState({
      address: address
    })
  }

  handleSelect = (address) => {
    this.props.onChange(address)
    this.setState({ 
      address: address 
    });
  };

  render() {
    const searchOptions = {
      types: ['address'],
      offset: 3,
      componentRestrictions: {
        country: "US"
      }
    }
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          searchOptions={searchOptions}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>

              <div className="mt-1 relative rounded-md shadow-sm"> 
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LocationMarkerIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>

                <input
                  {...getInputProps({
                    placeholder: '123 Main Street...',
                    className: 'focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md',
                    autoComplete:"None",
                    id: 'searchTextField',
                  })}
                />
              </div>

              <div className="autocomplete-dropdown-container">
                {loading && <div class="p-4">Loading...</div>}
                {suggestions.map((suggestion, i) => {
                  const className = suggestion.active
                    ? 'bg-gray-300 px-4'
                    : 'bg-white px-4';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      key={i}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        //style,
                      })}
                    >
                        <div className="flex">
                          <span>{suggestion.formattedSuggestion.mainText}</span>
                          <span className="text-gray-500 ml-2 truncate" disabled>{suggestion.formattedSuggestion.secondaryText}</span>
                        </div>
                    </div>

                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}