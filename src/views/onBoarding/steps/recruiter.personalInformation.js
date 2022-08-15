import React, { useState, useEffect } from 'react'
import { Field } from 'react-final-form'
import Progress from 'react-progressbar'
import AutoSuggest from 'react-autosuggest'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCompanies } from '../../../store/company/index'

const required = (value) => (value ? undefined : 'Required')

const Error = ({ name }) => {
  return (
    <Field
      name={name}
      subscription={{ touched: true, error: true }}
      render={({ meta: { touched, error } }) => {
        return touched && error ? (
          <span className="block my-2 text-red-500">{error}</span>
        ) : null
      }}
    />
  )
}

const PersonalInformation = () => {
  // getAllCompanies
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [compList, setCompList] = useState([])
  const dispatch = useDispatch()
  const companies = []

  useEffect(() => {
    dispatch(getAllCompanies()).then((res) => {
      setCompList([...res])
    })
    //  console.log(dispatch(getAllCompanies()))
    //   companies.push(dispatch(getAllCompanies()))
  }, [])

  const lowerCasedCompanies = compList.map((company) => {
    return {
      orgCode: company.orgCode,
      verified: company.verified,
      name: company.name.toLowerCase(),
      _id: company._id,
    }
  })
  const getSuggestions = (value) => {
    return lowerCasedCompanies.filter((company) =>
      company.name.includes(value.trim().toLowerCase()),
    )
  }

  return (
    <div>
      <div className="text-base text-gray-700 mb-2">Step 1 of 3</div>
      <Progress className="cm-progress" completed={75} />
      <p className="text-3xl font-bold text-gray-700 font-baskerville mt-10">
        Join or create employer account
      </p>
      {/* <p className="mt-2 text-gray-500">
        Let us know what your name is and the details of your job.
      </p> */}

      <div className="grid grid-cols-1 mt-6 gap-y-4 gap-x-4 sm:grid-cols-6">
        <div className="col-span-6">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <div className="mt-1">
            <Field name="firstName" validate={required}>
              {(props) => {
                return (
                  <div className="">
                    <input
                      type="text"
                      {...props.input}
                      required={true}
                      id="firstName"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="e.g. John"
                    />
                  </div>
                )
              }}
            </Field>
          </div>
          <Error name="firstName" />
        </div>
        <div className="col-span-6">
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
                  <div className="">
                    <input
                      type="text"
                      {...props.input}
                      required={true}
                      id="lastName"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="e.g. Smith"
                    />
                  </div>
                )
              }}
            </Field>
          </div>
          <Error name="lastName" />
        </div>

        <div className="col-span-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>
          <div className="mt-1">
            {/* <Field name="companyName">
              {(props) => {
                return (
                  <div className="">
                    <input
                      type="text"
                      {...props.input}
                      id="companyName"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="e.g. Comany Name"
                    />
                  </div>
                );
              }}
            </Field> */}
            <AutoSuggest
              suggestions={suggestions}
              onSuggestionsClearRequested={() => setSuggestions([])}
              onSuggestionsFetchRequested={({ value }) => {
                setValue(value)
                setSuggestions(getSuggestions(value))
              }}
              onSuggestionSelected={(_, { suggestion }) => {
                console.log(suggestion)
                localStorage.setItem('companyName', '')
                localStorage.setItem('orgcode', suggestion.orgCode)
                localStorage.setItem('orgname', suggestion.name)
                localStorage.setItem('orgId', suggestion._id)
                localStorage.setItem('compVerify', suggestion.verified)
              }}
              getSuggestionValue={(suggestion) => suggestion.name}
              renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
              inputProps={{
                placeholder: 'Enter company name',
                value: value,
                className:
                  'block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm',
                onChange: (_, { newValue, method }) => {
                  localStorage.setItem('companyName', newValue)
                  localStorage.setItem('orgcode', '')
                  localStorage.setItem('orgname', '')
                  localStorage.setItem('compVerify', '')

                  setValue(newValue)
                },
                required:true,
              }}
              highlightFirstSuggestion={true}
            />
          </div>
          <Error name="companyName" />
        </div>

        {/*  <div className="sm:col-span-6">
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
                                            id="phone"
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
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                    >
                        About
                    </label>
                    <div className="mt-1">
                        <Field name="about">
                            {(props) => {
                                return (
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                            {...props.input}
                                        />
                                    </div>
                                );
                            }}
                        </Field>
                    </div> */}
        {/* <p className="mt-2 text-sm text-gray-500">
                        Write a few sentences about yourself. You can always
                        update this later!
                    </p>
                </div> */}
      </div>
    </div>
  )
}

export default PersonalInformation
