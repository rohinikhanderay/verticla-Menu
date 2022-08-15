import React from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SchoolAutocomplete } from "../../test-locations/SchoolAutocomplete";

/*

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

*/

const Education = () => {
    return (
        <div>
            <p className="text-3xl font-bold text-gray-700 font-baskerville">
                Education and Training
            </p>
            <p className="mt-2 text-gray-500">
                List your education and training
            </p>
            <FieldArray name="education">
                {({ fields }) =>
                    fields.map((name, index) => (
                        <div key={name}>
                            <p className="mt-8 text-lg font-bold text-teal-600 font-baskerville">
                                School/Organization {index + 1}
                            </p>
                            <div className="w-full mt-2 border-t border-gray-300" />
                                <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div className="sm:col-span-6">
                                        <label className="block text-sm font-medium text-gray-700">
                                            School or Organization
                                        </label>
                                        <Field
                                            name={`${name}.schoolOrOrganization`}
                                        >
                                            {(props) => {
                                                return (
                                                    <div className="">
                                                        {/* <input
                                                            type="text"
                                                            {...props.input}
                                                            placeholder="UCLA, General Assembly, etc"
                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                        /> */}
                                                        <SchoolAutocomplete {...props.input}/>
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label className="block mt-2 text-sm font-medium text-gray-700">
                                            Degree or Certification
                                        </label>
                                        <Field
                                            name={`${name}.degreeCertification`}>
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...props.input}
                                                            placeholder="B.S, B.A, etc"
                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                        />
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label className="block mt-2 text-sm font-medium text-gray-700">
                                            Field of Study
                                        </label>
                                        <Field
                                            name={`${name}.fieldOfStudy`}>
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...props.input}
                                                            placeholder="Computer Science"
                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                        />
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <label className="block text-sm font-medium text-gray-700">
                                            About your time there
                                        </label>
                                        <Field
                                            name={`${name}.description`}>
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <textarea
                                                            rows={3}
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                            {...props.input}
                                                        />
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            From
                                        </label>
                                        <Field
                                            name={`${name}.from`}>
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <DatePicker
                                                            {...props.input}
                                                            selected={
                                                                props.input.value
                                                            }
                                                            onChange={(date) =>
                                                                props.input.onChange(
                                                                    date
                                                                )
                                                            }
                                                            className="block w-full px-4 py-3 border-gray-300 rounded shadow-sm focus:ring-teal-600 focus:border-teal-600 sm:text-sm"
                                                        />
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            To
                                        </label>
                                        <Field name={`${name}.to`}>
                                            {(props) => {
                                                return (
                                                    <div className="mt-2">
                                                        <DatePicker
                                                            {...props.input}
                                                            selected={
                                                                props.input.value
                                                            }
                                                            onChange={(date) =>
                                                                props.input.onChange(
                                                                    date
                                                                )
                                                            }
                                                            className="block w-full px-4 py-3 border-gray-300 rounded shadow-sm focus:ring-teal-600 focus:border-teal-600 sm:text-sm"
                                                        />
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>
                                    <Field name={`${name}.present`} type="checkbox">
                                        {(props) => {
                                            return (
                                                <div className="relative flex items-start sm:col-span-6">
                                                    <div className="flex items-center h-5">
                                                        <input
                                                            id={`present${index}`}
                                                            name={`present${index}`}
                                                            {...props.input}
                                                            type="checkbox"
                                                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label
                                                            htmlFor={`present${index}`}
                                                            className="text-gray-700"
                                                        >
                                                            I am currently studying
                                                            here
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    </Field>

                                    <button
                                        type="button"
                                        onClick={() => fields.remove(index)}
                                        className="inline-block col-span-2 px-4 py-2 text-sm text-red-900 bg-red-100 rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                    ))
                }
            </FieldArray>
        </div>
    );
};

export default Education;
