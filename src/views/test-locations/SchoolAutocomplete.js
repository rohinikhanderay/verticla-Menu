import React from 'react';
import Autocomplete from 'react-autocomplete';
import schools from './schools';
import {matchSchoolToTerm, sortSchools} from './locationsUtil/util'

export class SchoolAutocomplete extends React.Component {
  state = { value: '' }

  handleChange = (event) => {
    this.props.onChange(event.target.value)
    this.setState({ value: event.target.value})
  }

  handleSelect = (event) => {
    console.log(event)
    this.props.onChange(event)
    this.setState({ value: event})
  }

  render() {
    
    return (
      <div className="mt-2">
        <Autocomplete
          value={this.state.value}
          inputProps={{className:"block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-2 px-4", placeholder:"UCLA, General Assembly, etc"}}
          wrapperStyle={{className:"block w-full border 2border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-2 px-4" }}
          items={schools}
          getItemValue={(item) => item}
          shouldItemRender={matchSchoolToTerm}
          sortItems={sortSchools}
          onChange={(event) => this.handleChange(event)}
          onSelect={(event) => this.handleSelect(event)}
          renderMenu=
          
          {children => {
              return children.length !== 0 ?
              <div className="menu">
                {children.slice(0,5)}
              </div> :
              <div className="py-2 px-4 bg-white text-center text-gray-300">
               Nothing Found
              </div>
              
            }
          }
          
          renderItem={(item, isHighlighted) => {
            return (
              <div
              className={`py-2 px-4 ${isHighlighted ? 'bg-gray-300': 'bg-white'}`}
              key={item}
              >{item}</div> 
            )
            }}
        />
      </div>
    );
  }
}