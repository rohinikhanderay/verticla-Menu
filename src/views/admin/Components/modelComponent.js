import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AutoSuggest from 'react-autosuggest'
import { TrasnferJobs } from '../../../store/job/index'
import { adminGetAllEmployee } from '../../../store/company/index'
import { viewOrganization } from '../../../store/company'
import { useHistory } from 'react-router-dom'
const ModelComponent = (props) => {
  const dispatch = useDispatch()
  const [suggestions, setSuggestions] = useState(props?.employee?.data || [])
  const [value, setValue] = useState('')
  const [selectUser, setSelectuser] = useState('')
  const [isValidate, setIsvalidate] = useState(false)
  const [isValidateMessage, setIsvalidateMessage] = useState('')
  const history = useHistory()
  const lowerCasedEmployees =
    props &&
    props?.employee?.map((emp) => {
      if (props?.removeEmployee.rId != emp._id) {
        return {
          name: emp.fullName
            ? emp.fullName.toLowerCase()
            : emp.firstName.toLowerCase() + ' ' + emp.lastName.toLowerCase(),
          _id: emp._id,
          isApprove: emp.organizationApproved,
        }
      }
    })

  const getSuggestions = (value) => {
    return lowerCasedEmployees?.filter((emp) =>
      emp?.name?.includes(value.trim().toLowerCase()),
    )
  }
  const traspherData = () => {
    if (selectUser != '') {
      if (!selectUser.isApprove) {
        setIsvalidate(true)
        setIsvalidateMessage('Selected user not approved.')
      } else {
        setIsvalidate(false)
        dispatch(
          TrasnferJobs({
            recId: props.removeEmployee.rId,
            newRecId: selectUser._id,
            uId: props.removeEmployee.uId,
          }),
        ).then((res) => {
          if (res) {
            props.hideModel()
            if (props.type === 'ADMIN') {
              props.updateModel()
              // dispatch(
              //   adminGetAllEmployee({
              //     orgid: props.orgId,
              //     page: props.activePage,
              //     status: false,
              //   }),
              // )
            } else {
              props.devMeth()
            }
            setValue('')
            setSuggestions('')
            setSelectuser('')
            setIsvalidateMessage('')
          }
        })
      }
    } else {
      setIsvalidateMessage('Please select user.')
      setIsvalidate(true)
    }
  }
  return (
    <div>
      <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          props.isShow ? '' : 'hidden'
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto custome-model">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                Remove employee and transfer job and applications.
              </h3>
              <button
                type="button"
                onClick={() => {
                  props.hideModel()
                  setValue('')
                  setSuggestions('')
                  setSelectuser('')
                  setIsvalidate(false)
                  setIsvalidateMessage('')
                }}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6 space-y-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                To remove this employee, enter the name of an employee to
                transfer the removed employees posted jobs, applicants, and
                history.
              </label>
              <AutoSuggest
                suggestions={suggestions}
                onSuggestionsClearRequested={() => setSuggestions([])}
                onSuggestionsFetchRequested={({ value }) => {
                  setValue(value)
                  setSuggestions(getSuggestions(value))
                }}
                onSuggestionSelected={(_, { suggestion }) => {
                  setSelectuser(suggestion)
                }}
                getSuggestionValue={(suggestion) => suggestion.name}
                renderSuggestion={(suggestion) => (
                  <span>{suggestion.name}</span>
                )}
                inputProps={{
                  placeholder: 'Enter user name',
                  value: value,
                  className: `block w-full border-${
                    isValidate ? 'red' : 'gray'
                  }-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm`,
                  onChange: (_, { newValue, method }) => {
                    setValue(newValue)
                  },
                }}
                highlightFirstSuggestion={true}
              />{' '}
              <label
                htmlFor="title"
                className="block text-sm font-small text-red-700"
              >
                {isValidateMessage && isValidateMessage}
              </label>
            </div>

            {/* Modal footer */}
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={traspherData}
                data-modal-toggle="defaultModal"
                type="button"
                className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Transfer & Archive
              </button>
              <button
                onClick={() => {
                  props.hideModel()
                  setValue('')
                  setSuggestions('')
                  setSelectuser('')
                  setIsvalidate(false)
                  setIsvalidateMessage('')
                }}
                data-modal-toggle="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModelComponent
