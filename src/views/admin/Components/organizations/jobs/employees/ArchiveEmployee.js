import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetAllEmployee } from '../../../../../../store/company/index'
import Pagination from 'react-js-pagination'
import Layout from '../../../Layout'
import { NavLink } from 'react-router-dom'
const EmployeeListing = (props) => {
  const dispatch = useDispatch()
  const companyData = useSelector((state) => state.company)
  const [pageNumber, setpageNumber] = useState(1)
  const [apiResponse, setApiREsponse] = useState()
  const getEmployeeAPI = (page) => {
    dispatch(
      adminGetAllEmployee({
        orgid: props.match.params.id,
        status: true,
        page: page,
      }),
    ).then((res) => {
      if (res) {
        setApiREsponse(res)
      }
    })
  }
  useEffect(() => {
    getEmployeeAPI(pageNumber)
  }, [])

  const pageChange = (num) => {
    setpageNumber(num)
    getEmployeeAPI(num)
  }

  return (
    <Layout>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-gray-700 text-3xl font-medium">
            Archive Employees
          </h3>

          {/* <div className="mt-8 flex justify-end">
            {' '}
            <NavLink
              to={`/admin/event/archive`}
              className="cursor-pointer inline-flex justify-center  items-center  px-4 py-2 ml-3 font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm text-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <svg
                height="18"
                viewBox="0 0 48 48"
                width="18"
                fill="#fff"
                className="mr-1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M41.09 10.45l-2.77-3.36c-.56-.66-1.39-1.09-2.32-1.09h-24c-.93 0-1.76.43-2.31 1.09l-2.77 3.36c-.58.7-.92 1.58-.92 2.55v25c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4v-25c0-.97-.34-1.85-.91-2.55zm-17.09 24.55l-11-11h7v-4h8v4h7l-11 11zm-13.75-25l1.63-2h24l1.87 2h-27.5z" />
                <path d="M0 0h48v48h-48z" fill="none" />
              </svg>
              Archive
            </NavLink>
          </div> */}
          <div className="flex flex-col mt-8">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        name
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        email
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        approved
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {apiResponse &&
                      apiResponse?.data?.map((item) => {
                        return (
                          <tr>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="flex items-center">
                                {/* <div className="flex-shrink-0 h-10 w-10">
                                  <img className="h-10 w-10 rounded-full" src={`${item.orgImage ?item.orgImage.fullUrl:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}`} alt="" />
                                </div> */}
                                <div className="ml-4">
                                  <div className="text-sm leading-5 font-medium text-gray-900">
                                    {item.firstName + ' ' + item.lastName}
                                  </div>
                                  {/* <div className="text-sm leading-5 text-gray-500">{item.positionTitle}</div> */}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-900">
                                {item.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {item.organizationApproved.toString() ===
                              'true' ? (
                                <div className="flex items-center">
                                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                                  <p className="ml-2">
                                    {item.organizationApproved.toString()}
                                  </p>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                                  <p className="ml-2">
                                    {item.organizationApproved.toString()}
                                  </p>
                                </div>
                              )}{' '}
                              {/* <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${item.verified ?'green':'red'}-100 text-${item.verified ?'green':'red'}-800`}>{item.verified ?'Yes':'No'}</span> */}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                              {item.organizationRole}
                            </td>
                            {/* <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                             
                                <a href="javascript:void(0)" className="text-teal-600 hover:text-teal-900">Edit </a> 
                               |  <a href="javascript:void(0)" className="text-teal-600 hover:text-teal-900"> Remove </a> 
                            
                            </td> */}
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
              {apiResponse && apiResponse?.data?.length != 0 ? (
                <Pagination
                  activePage={pageNumber}
                  itemsCountPerPage={10}
                  totalItemsCount={apiResponse && apiResponse?.total}
                  onChange={pageChange}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
export default EmployeeListing
