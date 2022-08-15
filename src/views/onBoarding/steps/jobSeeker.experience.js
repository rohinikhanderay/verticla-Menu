import React from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { XIcon, PlusSmIcon } from "@heroicons/react/outline";

const required = (value) => (value ? undefined : "Required");

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

const Experience = () => {
  return (
    <div>
      <p className="text-3xl font-bold text-gray-700 font-baskerville">
        Experience
      </p>
      <p className="mt-2 text-gray-500">List out your previous experiences</p>
      <FieldArray name="experience">
        {({ fields }) =>
          fields.map((name, index) => (
            <div key={name}>
              <p className="mt-8 text-lg font-bold text-teal-600 font-baskerville">
                Experience {index + 1}
              </p>
              <div className="w-full mt-2 border-t border-gray-300" />
              <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Position Title
                  </label>
                  <Field name={`${name}.title`} validate={required}>
                    {(props) => {
                      return (
                        <div className="mt-2">
                          <input
                            type="text"
                            {...props.input}
                            placeholder="Project Manager, Social Media Manager, etc..."
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          />
                        </div>
                      );
                    }}
                  </Field>
                  <Error name={`${name}.title`} />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <Field name={`${name}.company`} validate={required}>
                    {(props) => {
                      return (
                        <div className="mt-2">
                          <input
                            type="text"
                            {...props.input}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          />
                        </div>
                      );
                    }}
                  </Field>
                  <Error name={`${name}.company`} />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <Field name={`${name}.location`} validate={required}>
                    {(props) => {
                      return (
                        <div className="mt-2">
                          <input
                            type="text"
                            {...props.input}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          />
                        </div>
                      );
                    }}
                  </Field>
                  <Error name={`${name}.location`} />
                </div>

                <label className="block col-span-6 mt-2 text-sm font-medium text-gray-700">
                  Position Description
                </label>
                <FieldArray name={`${name}.description`}>
                  {({ fields }) => {
                    return fields.map((name, index) => {
                      return (
                        <div key={index} className="col-span-6">
                          <Field name={`${name}`}>
                            {(props) => {
                              return (
                                <div className="flex items-center group">
                                  <input
                                    onKeyDown={(e) => {
                                      e.key === "Enter" && e.preventDefault();
                                    }}
                                    type="text"
                                    {...props.input}
                                    placeholder="Increased efficiency by xx%..."
                                    className="block w-full px-4 py-3 border-gray-300 rounded shadow-sm focus:ring-teal-600 focus:border-teal-600 sm:text-sm"
                                  />
                                  <XIcon
                                    onClick={() => fields.remove(index)}
                                    className="w-5 h-5 mx-2 text-red-400 group-hover:text-red-700"
                                  />
                                </div>
                              );
                            }}
                          </Field>
                          {fields.length - 1 === index && (
                            <div
                              onClick={() => fields.push("")}
                              className="relative mt-4 group"
                            >
                              <div
                                className="absolute inset-0 flex items-center"
                                aria-hidden="true"
                              >
                                <div className="w-full border-t border-gray-300 group-hover:border-teal-600" />
                              </div>
                              <div className="relative flex justify-center group-hover:text-teal-600">
                                <div className="px-2 bg-white">
                                  <PlusSmIcon className="w-8 h-8 " />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    });
                  }}
                </FieldArray>

                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    From
                  </label>
                  <Field name={`${name}.from`} validate={required}>
                    {(props) => {
                      return (
                        <div className="mt-2">
                          <DatePicker
                            {...props.input}
                            selected={props.input.value}
                            onChange={(date) => props.input.onChange(date)}
                            className="block w-full px-4 py-3 border-gray-300 rounded shadow-sm focus:ring-teal-600 focus:border-teal-600 sm:text-sm"
                          />
                        </div>
                      );
                    }}
                  </Field>
                  <Error name={`${name}.from`} />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    To
                  </label>
                  <Field name={`${name}.to`} validate={required}>
                    {(props) => {
                      return (
                        <div className="mt-2">
                          <DatePicker
                            {...props.input}
                            selected={props.input.value}
                            onChange={(date) => props.input.onChange(date)}
                            className="block w-full px-4 py-3 border-gray-300 rounded shadow-sm focus:ring-teal-600 focus:border-teal-600 sm:text-sm"
                          />
                        </div>
                      );
                    }}
                  </Field>
                  <Error name={`${name}.to`} />
                </div>
                <Field name={`${name}.current`} type="checkbox">
                  {(props) => {
                    return (
                      <div className="relative flex items-start col-span-6">
                        <div className="flex items-center h-5">
                          <input
                            id={`current${index}`}
                            name={`current${index}`}
                            {...props.input}
                            type="checkbox"
                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor={`current${index}`}
                            className="text-gray-700"
                          >
                            I am currently working here
                          </label>
                        </div>
                      </div>
                    );
                  }}
                </Field>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    fields.remove(index);
                  }}
                  className="inline-block col-span-3 sm:col-span-6 px-4 py-2 text-sm text-red-900 bg-red-100 rounded"
                >
                  Remove Experience {index + 1}
                </button>
              </div>
            </div>
          ))
        }
      </FieldArray>
    </div>
  );
};

export default Experience;
