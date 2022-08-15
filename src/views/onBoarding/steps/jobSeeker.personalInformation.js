import React, { useState, useCallback, useRef } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
  } from 'react-places-autocomplete';
import { Field } from 'react-final-form';
import { Opts } from '../onBoardingUtil/Opts';

const required = (value) => (value ? undefined : 'Required');
const Error = ({ name }) => {
    return (
        <Field
            name={name}
            subscription={{ touched: true, error: true }}
            render={({ meta: { touched, error } }) => {
                return touched && error ? (
                    <span className="block my-2 text-red-500">{error}</span>
                ) : null;
            }}
        />
    );
};


const PersonalInformation = () => {

    const [city, setCity] = useState([]);
    const [showCity, setShowCity] = useState(false);
    const [locationData, setLocationData] = useState([])

    const handleZipSelect = (zip) => {
        var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);

        if (isValidZip) {
            setShowCity(false)
            geocodeByAddress(zip)
            .then((results) =>  setLocationData(results[0]))
            .catch((error) => console.error('Error', error));
    
            let citiesArray = []
    
            if (locationData.postcode_localities) {
                for (let i = 0; i < locationData.postcode_localities.length; i++) {
                    citiesArray.push(locationData.postcode_localities[i] + ", " + locationData.address_components[3].long_name )
                }
            } else if (locationData.address_components) {
                citiesArray.push(locationData.address_components[1].long_name + ", " + locationData.address_components[3].long_name)
            } 
            setCity(citiesArray)
            setShowCity(true)
        }
    };

    return (
        <div>
            <div>
                <p className="text-3xl font-bold text-gray-700 font-baskerville">
                    Personal Information
                </p>
                <p className="mt-2 text-gray-500">
                    Let us know more about you to get started.
                </p>
                <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            First Name
                        </label>
                        <div className="mt-1">
                            <Field name="firstName" validate={required}>
                                {(props) => {
                                    return (
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...props.input}
                                                placeholder="First Name"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                            />
                                        </div>
                                    );
                                }}
                            </Field>
                        </div>
                        <Error name="firstName" />
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Last Name
                        </label>
                        <div className="mt-1">
                            <Field name="lastName" validate={required}>
                                {(props) => {
                                    return (
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...props.input}
                                                placeholder="Last Name"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                            />
                                        </div>
                                    );
                                }}
                            </Field>
                        </div>
                        <Error name="lastName" />
                    </div>

                    <div className="sm:col-span-6">
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Career Path
                        </label>
                        <div className="mt-1">
                            <Field name="careerPath">
                                {(props) => {
                                    return (
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...props.input}
                                                placeholder="e.g. Software Developer"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                            />
                                        </div>
                                    );
                                }}
                            </Field>
                        </div>
                    </div>

                    <div className="sm:col-span-6">
                        <label
                            htmlFor="bio"
                            className="block text-sm font-medium text-gray-700"
                        >
                            About
                        </label>
                        <div className="mt-1">
                            <Field name="bio">
                                {(props) => {
                                    return (
                                        <div className="mt-2">
                                            <textarea
                                                id="bio"
                                                name="bio"
                                                rows={3}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                {...props.input}
                                            />
                                        </div>
                                    );
                                }}
                            </Field>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            Write a few sentences about yourself. You can always
                            update this later!
                        </p>
                    </div>
                    <div className="sm:col-span-6">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone Number
                        </label>
                        <div className="mt-1">
                            <Field name="phone">
                                {(props) => {
                                    return (
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...props.input}
                                                placeholder="(123)456-7890"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                            />
                                        </div>
                                    );
                                }}
                            </Field>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="mt-8">
 
                        <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">

                            <div className="sm:col-span-6">
                                    <label
                                        htmlFor="zip"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        ZIP / Postal *
                                    </label>
                                    <div className="mt-1">
                                        <Field name="zipPostal" validate={required}>
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            id="zip"
                                                            autoComplete="none"
                                                            {...props.input}
                                                            placeholder="91107"
                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                            onChange={(e) => {props.input.onChange(e.target.value); handleZipSelect(e.target.value); setShowCity(false)}}
                                                            onBlur={(e) => {handleZipSelect(e.target.value); props.input.onBlur(e.target.value)}}
                                                            
                                                        />
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>
                                    <Error name="zipPostal" />
                                </div>

                            {showCity? 
                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="city"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        City
                                    </label>
                                    <div className="mt-1">
                                        <Field name="city" format={v => v}>
                                            {(props) => {
                                                return (
                                                    <Opts
                                                        options={city}
                                                        name={props.input.name}
                                                        onChange={ (value) => props.input.onChange(value)}
                                                        onBlur={ (value) => props.input.onChange(value)}
                                                    />
                                                )
                                            }}
                                        </Field>
                                    </div>
                                    <Error name="city" />
                                </div> : null} 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInformation;
