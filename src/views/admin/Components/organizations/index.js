import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetallCompanies } from '../../../../store/company/index'
import Pagination from 'react-js-pagination'

import { useHistory, NavLink } from 'react-router-dom'
import defaultImage from '../../../../assets/images/de_images.png'
import Layout from '../Layout'
//require("bootstrap/less/bootstrap.less");
const CompanyList = (props) => {
  const dispatch = useDispatch()
  const companyData = useSelector((state) => state.company)
  const [pageNumber, setpageNumber] = useState(1)
  const [displayState, setDisaplyState] = useState(false)
  const history = useHistory()
  useEffect(() => {
    dispatch(adminGetallCompanies())
  }, [])
  const pageChange = (num) => {
    setpageNumber(num)
    dispatch(adminGetallCompanies({ page: num }))
  }

  return (
    <Layout>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center	">
            <h3 className="text-gray-700 text-3xl font-medium">Companies</h3>
            <NavLink
              to={`/admin/organization/add`}
              className="cursor-pointe items-center inline-flex justify-center px-4 py-2 ml-3 font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm text-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                fill="#fff"
                className="mr-1"
                height="18"
                viewBox="0 0 24 24"
              >
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
              </svg>
              Add Company
            </NavLink>
          </div>
          <div className="mt-8"></div>
          <div className="flex flex-col mt-8">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        orgcode
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        verified
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        city
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {companyData &&
                      companyData?.adminCompanies?.data?.map((item) => {
                        return (
                          <tr>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={`${
                                      item.orgImage
                                        ? item.orgImage.fullUrl
                                        : defaultImage
                                    }`}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm leading-5 font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                  <div className="text-sm leading-5 text-gray-500">
                                    {item.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-900">
                                {item.orgCode}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${
                                  item.verified ? 'green' : 'red'
                                }-100 text-${
                                  item.verified ? 'green' : 'red'
                                }-800`}
                              >
                                {item.verified ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                              {item.city ? item.city : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium">
                              <div className="text-sm leading-5 text-gray-900">
                                <NavLink
                                  to={`/admin/organization/${item._id}/edit`}
                                  className="text-teal-600 hover:text-teal-900"
                                >
                                  Edit{' '}
                                </NavLink>{' '}
                                |
                                <NavLink
                                  to={`/admin/organization/${item._id}/jobs`}
                                  className="text-teal-600 hover:text-teal-900"
                                >
                                  {' '}
                                  Jobs{' '}
                                </NavLink>
                                |{' '}
                                <NavLink
                                  to={`/admin/organization/${item._id}/employee`}
                                  className="text-teal-600 hover:text-teal-900"
                                >
                                  Employee{' '}
                                </NavLink>
                                |{' '}
                                <NavLink
                                  to={`/admin/organization/${item._id}/ownerShip`}
                                  className={`text-${
                                    item.sendOwenerShip ? 'gray' : 'teal'
                                  }-600 hover:text-${
                                    item.sendOwenerShip ? 'gray' : 'teal'
                                  }-900 ${
                                    item.sendOwenerShip
                                      ? 'pointer-events-none'
                                      : ''
                                  }`}
                                >
                                  {' '}
                                  OwnerShip
                                </NavLink>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
              {companyData && companyData?.adminCompanies?.data?.length != 0 ? (
                <Pagination
                  activePage={pageNumber}
                  itemsCountPerPage={10}
                  totalItemsCount={
                    companyData && companyData?.adminCompanies?.total
                  }
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
export default CompanyList
