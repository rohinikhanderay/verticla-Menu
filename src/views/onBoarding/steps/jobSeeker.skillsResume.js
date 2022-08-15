import React from "react";
import { Field } from "react-final-form";

/*

const required = (value) => (value ? undefined : 'Required');

const Error = ({ name }) => {
    return (
        <Field
            name={name}
            subscription={{ touched: true, error: true }}
            render={({ meta: { touched, error } }) => {
                return touched && error ? (
                    <span className="block my-2 ml-2 text-red-500">
                        {error}
                    </span>
                ) : null;
            }}
        />
    );
};

*/

const SkillsResume = () => {
  return (
    <div>
      <div>
        <p className="text-3xl text-gray-700 font-baskerville">
          Skills and Resume
        </p>
        <p className="mt-2 text-gray-500">
          List your skills and upload your resume.
        </p>
      </div>
      <label
        htmlFor="skills"
        className="block mt-8 text-sm font-medium text-gray-700"
      >
        Skills
      </label>
      <p className="mt-1 text-xs leading-relaxed text-gray-600">
        Enter in your personal and professional skills and use commas to
        separate them (Marketing,Budgeting,Scrum,etc).
      </p>
      <Field name="skills">
        {(props) => {
          return (
            <div className="mt-2">
              <input
                autoComplete="off"
                type="text"
                {...props.input}
                onChange={(e) =>
                  props.input.onChange(
                    e.target.value.split(",").map((skill) => skill.trimStart())
                  )
                }
                placeholder="Leadership, Project Management, ..."
                className="block w-full px-4 py-3 border-gray-300 rounded shadow-sm focus:ring-teal-600 focus:border-teal-600 sm:text-sm"
              />
              <div className="mt-4">
                {props.input.value &&
                  props.input.value.map((skill, index) => (
                    <p
                      key={index}
                      className="inline-block p-2 mr-2 bg-teal-100 rounded"
                    >
                      {skill}
                    </p>
                  ))}
              </div>
            </div>
          );
        }}
      </Field>

      {/* File Upload */}
      <label
        htmlFor="skills"
        className="block mt-8 text-sm font-medium text-gray-700"
      >
        Upload Your Resume
      </label>
      <div className="flex justify-center px-6 pt-5 pb-6 mt-4 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="w-12 h-12 mx-auto text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-sm text-gray-600">
            {/* <span>Choose a pdf file</span> */}
            <Field name="resume">
              {(props) => {
                return (
                  <div className="mt-2">
                    <input
                      accept="application/pdf, application/vnd.ms-excel"
                      type="file"
                      id="resume"
                      // className="sr-only"
                      // {...props.input}
                      onChange={({ target }) => {
                        return props.input.onChange(target.files);
                      }}
                    />
                  </div>
                );
              }}
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsResume;
