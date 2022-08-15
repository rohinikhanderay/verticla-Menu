import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminAllEvent, eventDelete } from '../../../../store/event/index'
import Pagination from 'react-js-pagination'
import Layout from '../Layout'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import defaultImage from '../../../../assets/images/de_images.png'
//require("bootstrap/less/bootstrap.less");
const CompanyList = (props) => {
  const dispatch = useDispatch()
  const blogData = useSelector((state) => state.event)
  const [pageNumber, setpageNumber] = useState(1)

  useEffect(() => {
    dispatch(getAdminAllEvent({ isDelete: false, page: pageNumber }))
  }, [])
  const pageChange = (num) => {
    setpageNumber(num)
    dispatch(getAdminAllEvent({ isDelete: false, page: num }))
  }
  // const stringToHTML = function (str, id) {
  //   if (str != undefined) {
  //     setTimeout(() => {
  //       document.getElementById(id).innerHTML = str
  //     }, 0)
  //   }
  // }
  const handleDelete = (id) => {
    dispatch(eventDelete({ _id: id })).then((res) => {
      if (res) {
        dispatch(getAdminAllEvent({ isDelete: false, page: pageNumber }))
      }
    })
  }
  return (
    <Layout>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center	">
            <h3 className="text-gray-700 text-3xl font-medium">Events</h3>
            <div>
              <NavLink
                to={`/admin/event/add`}
                className="cursor-pointer inline-flex justify-center items-center px-4 py-2 ml-3 font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm text-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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
                </svg>{' '}
                Add Event
              </NavLink>
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
            </div>
          </div>
          <div className="mt-8"></div>
          <div className="flex flex-col mt-8">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>

                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Summary
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Register Users
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        End Date
                      </th>

                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {blogData &&
                      blogData?.event?.data?.map((item, index) => {
                        return (
                          <tr>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={`${
                                      item.eventImg &&
                                      item.eventImg?.length != 0
                                        ? item.eventImg?.fullUrl
                                        : defaultImage
                                    }`}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item.title}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item.summary}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item.location}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item.registerUsers?.length}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {new Date(item.endDate).toDateString()}
                              </span>
                            </td>

                            <td className="px-6 py-4 whitespace-no-wrap  border-b border-gray-200 text-sm leading-5 font-medium">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                <NavLink
                                  strict
                                  to={`/admin/event/${item._id}/users`}
                                  className="text-teal-600 hover:text-teal-900 cursor-pointer pr-1"
                                >
                                  Users
                                </NavLink>
                                |
                                <NavLink
                                  to={`/admin/event/${item._id}/edit`}
                                  className="text-teal-600 hover:text-teal-900 cursor-pointer px-1"
                                >
                                  Edit
                                </NavLink>
                                |
                                <a
                                  to="javascript:void(0)"
                                  className="text-teal-600 hover:text-teal-900 cursor-pointer pl-1"
                                  onClick={() => handleDelete(item._id)}
                                >
                                  Delete
                                </a>{' '}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
              {blogData && blogData?.event?.data?.length != 0 ? (
                <Pagination
                  activePage={pageNumber}
                  itemsCountPerPage={10}
                  totalItemsCount={blogData && blogData?.event?.total}
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
