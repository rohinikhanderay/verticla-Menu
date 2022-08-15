import React from 'react'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { PlusSmIcon } from '@heroicons/react/outline'
import createDecorator from 'final-form-calculate'
import { useHistory } from 'react-router-dom'

const calculator = createDecorator(
  {
    field: 'address', // when minimum changes...
    updates: () =>
      // ...update maximum to the result of this function
      console.log(),
  },
  {
    field: 'maximum', // when maximum changes...
    updates: {
      // update minimum to the result of this function
      minimum: (maximumValue, allValues) =>
        Math.min(maximumValue || 0, allValues.minimum || 0),
    },
  },
  {
    field: /day\[\d\]/, // when a field matching this pattern changes...
    updates: {
      // ...update the total to the result of this function
      total: (ignoredValue, allValues) =>
        (allValues.day || []).reduce(
          (sum, value) => sum + Number(value || 0),
          0,
        ),
    },
  },
)

export default class Wizard extends React.Component {
  static Page = ({ children }) => children

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      values: props.initialValues || {},
    }
  }

  next = (values) => {
    this.setState((state) => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }))
  }

  previous = () =>
    this.setState((state) => ({
      page: Math.max(state.page - 1, 0),
    }))

  validate = (values) => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = (values) => {
    const { children, onSubmit, history } = this.props
    const { page } = this.state

    let isLastPage = page === React.Children.count(children) - 1
    if (
      localStorage.getItem('orgcode') !== '' &&
      localStorage.getItem('orgcode') !== null
    ) {
      console.log('inside')
      localStorage.setItem(
        'formData',
        JSON.stringify({
          formData: {
            firstName: values.firstName,
            lastName: values.lastName,
            role: values.role,
          },
        }),
      )
      isLastPage = true
      // window.location.href = '/onboarding?success=true'
      // history.push('/onboarding?success=true')
      // let limit = 2
      // this.next(values, limit)
    }

    if (isLastPage) {
      return onSubmit(values)
    } else {
      this.next(values)
    }
  }

  handleForm = (formData) => {
    const results = new FormData()
    results.append('file', formData[0])
    return results
  }

  render() {
    const { children } = this.props
    const { page, values } = this.state
    const activePage = React.Children.toArray(children)[page]
    console.log(activePage)
    const isLastPage = page === React.Children.count(children) - 1
    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        mutators={{ ...arrayMutators }}
        decorators={[calculator]}
      >
        {({
          handleSubmit,
          submitting,
          values,
          form: {
            mutators: { push },
          },
        }) => {
          return (
            <form
              className="max-w-xl p-8 mx-auto mt-12 bg-white rounded"
              onSubmit={handleSubmit}
              values={values}
            >
              {activePage}
              {page === 1 && values.education && (
                <div className="relative mt-8">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center">
                    <button
                      onClick={() =>
                        push('education', {
                          schoolOrOrganization: '',
                        })
                      }
                      type="button"
                      className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      <PlusSmIcon
                        className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Add Education</span>
                    </button>
                  </div>
                </div>
              )}
              {page === 2 && values.experience && (
                <div className="relative mt-8">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center">
                    <button
                      onClick={() =>
                        push('experience', {
                          title: '',
                          description: [''],
                        })
                      }
                      type="button"
                      className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      <PlusSmIcon
                        className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Add Experience</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-between max-w-xl mx-auto mt-4">
                {page > 0 && (
                  <button
                    className="mr-2 text-teal-600 text-base"
                    type="button"
                    onClick={this.previous}
                  >
                    « Previous
                  </button>
                )}
                {!isLastPage && (
                  <button
                    className="flex px-14 py-3 text-white bg-teal-600 rounded-3xl flex-end"
                    type="submit"
                  >
                    Continue
                  </button>
                )}
                {isLastPage && (
                  <button
                    className="px-14 py-3 text-white bg-teal-600 rounded-3xl"
                    type="submit"
                    disabled={submitting}
                  >
                    {this.props.initialValues.role === 'recruiter'
                      ? 'Continue'
                      : 'Submit'}
                  </button>
                )}
              </div>
              {/* 
                            <pre className="max-w-xl p-8 mx-auto mt-8 shadow">
                                <p>Values</p>
                                {JSON.stringify(values, 0, 2)}
                            </pre> */}
            </form>
          )
        }}
      </Form>
    )
  }
}
