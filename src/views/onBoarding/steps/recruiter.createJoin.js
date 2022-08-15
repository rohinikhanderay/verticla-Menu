import React, { useState } from 'react';
import axios from 'axios';
import { Field } from 'react-final-form';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { Opts } from '../onBoardingUtil/Opts';
import { UserAddIcon, OfficeBuildingIcon } from '@heroicons/react/outline';
import { LocationSearchInputCities } from '../../test-locations/LocationSearchInputCities';
import { API_URL } from '../../../store/API_URL';
import { LocationSearchInputAddress } from '../../test-locations/LocationSearchInputAddress';

const required = (value) => (value ? undefined : 'Required');

const simpleMemoize = (fn) => {
    let lastArg;
    let lastResult;
    return (arg) => {
        if (arg !== lastArg) {
            lastArg = arg;
            lastResult = fn(arg);
        }
        return lastResult;
    };
};

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

const CreateJoin = ({ joinOrCreate, setJoinOrCreate }) => {
    const [isCodeValid, setIsCodeValid] = useState(false);
    const [city, setCity] = useState([]);
    const [street, setStreet] = useState('')
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
                    citiesArray.push(locationData.postcode_localities[i] + ", " + locationData.address_components[3].long_name)
                }
            } else if (locationData.address_components) {
                citiesArray.push(locationData.address_components[1].long_name + ", " + locationData.address_components[3].long_name)
            } 
            setCity(citiesArray)

            setShowCity(true)

            // if (!street) {
            //     setShowCity(true)
            // }
            
        }
    }


    const validateCode = simpleMemoize(async (orgCode) => {
        if (!orgCode) {
            return 'Required';
        }
        try {
            await axios.post(
                `${API_URL}/api/organizations/validate`,
                {
                    orgCode,
                }
            );
            setIsCodeValid(true);
            return null;
        } catch (error) {
            setIsCodeValid(false);
            return <p className="text-red-500">Organization Code Invalid</p>;
        }
    });
    return (
        <div>
            <p className="text-3xl font-bold text-gray-700 font-baskerville">
                Join or Create Organization
            </p>
            <p className="mt-2 text-gray-500">
                You can join an organization using a unique company code or
                register a new company.
            </p>
            <div className="flex gap-4 mt-8">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setJoinOrCreate('join');
                    }}
                    className={`w-1/2 rounded-lg py-3 px-4
                ${
                    joinOrCreate === 'join'
                        ? ` bg-teal-100 text-teal-700 border-4 border-teal-600`
                        : ` border border-gray-500 text-gray-500`
                }`}
                >
                    {' '}
                    <UserAddIcon className="w-8 h-8 mx-auto" />
                    <p className="mt-2">Join a Company</p>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setJoinOrCreate('create');
                    }}
                    className={`w-1/2 rounded-lg py-3 px-4
                ${
                    joinOrCreate === 'create'
                        ? ` bg-teal-100 text-teal-600 border-4 border-teal-600`
                        : ` border border-gray-500 text-gray-500`
                }`}
                >
                    <OfficeBuildingIcon className="w-8 h-8 mx-auto" />
                    <p className="mt-2">Create a Company</p>
                </button>
            </div>

            {/* Join Company */}
            {joinOrCreate === 'join' && (
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Company Code
                    </label>
                    <Field name="companyCode" validate={validateCode}>
                        {(props) => {
                            return (
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...props.input}
                                        placeholder="Enter Company Code (nuleep-xxxxxx...)"
                                        className="block w-full px-4 py-3 border-gray-300 rounded shadow-sm focus:ring-teal-600 focus:border-teal-600 sm:text-sm"
                                    />
                                </div>
                            );
                        }}
                    </Field>
                    {isCodeValid && (
                        <p className="mt-2 text-green-400">Code is Valid!</p>
                    )}
                    <Error name="companyCode" />
                </div>
            )}
            {/* / Join Company */}

            {/* Create Company */}
            {joinOrCreate === 'create' && (
                <div>
                    <div className="space-y-8 divide-y divide-gray-200">
                        <div>
                            <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="name"
                                        className="block font-medium text-gray-700 text-md"
                                    >
                                        Organization / Company Name
                                    </label>
                                    <div className="mt-1">
                                        <Field
                                            name="companyName"
                                            validate={required}
                                        >
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...props.input}
                                                            id="companyName"
                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                        />
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>
                                    <Error name="companyName" />
                                </div>
                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="about"
                                        className="block font-medium text-gray-700 text-md"
                                    >
                                        About
                                    </label>
                                    <div className="mt-1">
                                        <Field
                                            name="companyAbout"
                                        >
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <textarea
                                                            type="text"
                                                            {...props.input}
                                                            id="companyAbout"
                                                            rows={3}
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                                                        />
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>

                                    <p className="mt-2 text-gray-500 text-md">
                                        Write a few sentences about your
                                        company. Let people know what you're all
                                        about!
                                    </p>
                                </div>

                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="about"
                                        className="block font-medium text-gray-700 text-md"
                                    >
                                        Culture
                                    </label>
                                    <div className="mt-1">
                                        <Field
                                            name="companyCulture"
                                        >
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <textarea
                                                            type="text"
                                                            {...props.input}
                                                            id="companyCulture"
                                                            rows={3}
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                                                        />
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>

                                    <p className="mt-2 text-gray-500 text-md">
                                        Describe your company culture.
                                    </p>
                                </div>

                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="companyMission"
                                        className="block font-medium text-gray-700 text-md"
                                    >
                                        Mission
                                    </label>
                                    <div className="mt-1">
                                        <Field
                                            name="companyMission"
                                        >
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <textarea
                                                            type="text"
                                                            {...props.input}
                                                            id="companyMission"
                                                            rows={3}
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                                                        />
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>

                                    <p className="mt-2 text-gray-500 text-md">
                                        Describe your company mission.
                                    </p>
                                </div>

                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="companyBenefits"
                                        className="block font-medium text-gray-700 text-md"
                                    >
                                        Benefits
                                    </label>
                                    <div className="mt-1">
                                        <Field
                                            name="companyBenefits"
                                        >
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <textarea
                                                            type="text"
                                                            {...props.input}
                                                            id="companyBenefits"
                                                            rows={3}
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                                                        />
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>

                                    <p className="mt-2 text-gray-500 text-md">
                                        Describe your company benefits.
                                    </p>
                                </div>

                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="companyPerks"
                                        className="block font-medium text-gray-700 text-md"
                                    >
                                        Perks
                                    </label>
                                    <div className="mt-1">
                                        <Field
                                            name="companyPerks"
                                        >
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <textarea
                                                            type="text"
                                                            {...props.input}
                                                            id="companyPerks"
                                                            rows={3}
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                                                        />
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>

                                    <p className="mt-2 text-gray-500 text-md">
                                        Describe your company perks.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Contact Information
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="companyEmail"
                                        className="block font-medium text-gray-700 text-md"
                                    >
                                        Public Email address
                                    </label>
                                    <div className="mt-1">
                                        <Field
                                            name="companyEmail"
                                            validate={required}
                                        >
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <input
                                                            type="email"
                                                            {...props.input}
                                                            id="companyEmail"
                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                        />
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>
                                    <Error name="companyEmail" />
                                </div>

                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="companyStreet"
                                        className="block font-medium text-gray-700 text-md"
                                    >
                                        Street address
                                    </label>
                                    <div className="mt-1">
                                        <Field
                                            name="companyStreet"
                                        >
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <LocationSearchInputAddress
                                                        {...props.input}
                                                        id="companyStreet"
                                                        onChange={(place) => {props.input.onChange(place); setStreet(place)}}
                                                        />

                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>
                                    <Error name="companyStreet" />
                                </div>

                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="companyZip"
                                        className="block font-medium text-gray-700 text-md"
                                    >
                                        ZIP / Postal Code *
                                    </label>
                                    <div className="mt-1">
                                        <Field name="zipPostal" validate={required}>
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            id="companyZip"
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
                                        htmlFor="companyCity"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        City
                                    </label>
                                    <div className="mt-1">
                                        <Field name="companyCity" format={v => v}>
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
                                    <Error name="companyCity" />
                                </div> : 
                            null} 

                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* / Create Company */}
        </div>
    );
};

export default CreateJoin;
