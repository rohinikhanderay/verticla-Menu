import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ClockIcon, HomeIcon, MenuAlt1Icon, ViewListIcon, XIcon, DocumentSearchIcon, AcademicCapIcon, CogIcon, LogoutIcon, } from '@heroicons/react/outline'
import { ChevronRightIcon, DotsVerticalIcon, SearchIcon, SelectorIcon, HomeIcon as HomeSolid } from '@heroicons/react/solid'
import NuleepLogo from '../../assets/images/Nuleep-Logo.svg';
import NuleepText from '../../assets/images/Nuleep-Text.svg';
import CloseIcon from '../../assets/images/icons/close_icon.svg'
import hamburger from '../../assets/images/Hamburger.svg';
import * as actions from '../../store/profile'
import { useHistory, withRouter } from "react-router-dom";
import { connect, useSelector } from 'react-redux'
import recruiterDashboard from '../dashboard/recruiterDashboard';
import JobSeekerDashboard from '../dashboard/jobSeekerDashboard';
import Dashboard from '../dashboard/DashboardContainer'
import RecruiterDashboard from '../dashboard/recruiterDashboard';
import Jobs from '../jobs/Jobs';
import Skill from '../profile/Skill';

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: false, iconFilled: HomeSolid },
  { name: 'Job Search', href: '#', icon: DocumentSearchIcon, current: false, iconFilled: DocumentSearchIcon },
  { name: 'Career Development', href: '#', icon: AcademicCapIcon, current: false },
  { name: 'Settings', href: '#', icon: CogIcon, current: false },
  { name: 'Log out', href: '#', icon: LogoutIcon, current: false }
]




const projects = [
  {
    id: 1,
    title: 'GraphQL API',
    initials: 'GA',
    team: 'Engineering',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
    totalMembers: 12,
    lastUpdated: 'March 17, 2020',
    pinned: true,
    bgColorClass: 'bg-pink-600',
  },

]

const pinnedProjects = projects.filter((project) => project.pinned)

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardNew = ({ getProfile }) => {

  const state = useSelector(state => state)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(navigation[0])

  let history = useHistory();

  useEffect(() => {
    getProfile()
  }, [getProfile])

  const onSelectItem = (item) => {
    setSidebarOpen(false)
    setSelectedItem(item)
  }

  const userRender = (data) => {



    return (
      <div className='flex items-center'>
        <div className="w-7 h-7 bg-blue-100 rounded-full">
          {data?.profileImg[0] ? (
            <div
              style={{
                backgroundImage: `url(${data?.profileImg && data?.profileImg[0]?.fullUrl
                  ? data?.profileImg[0]?.fullUrl
                  : ''
                  })`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
              }}
            ></div>
          ) : (
            <p className="font-bold text-center text-blue-900 font-nunito">
              {data?.firstName[0]}
            </p>
          )}
        </div>

        <div className='ml-2'>
          <p className="text-sm text-blue-900 font-nunito">
            {data?.fullName}
          </p>

          <p className="text-sm text-blue-900 font-nunito">
            {data?.jobTitle}
          </p>
        </div>

      </div>
    )
  }

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={() => setSidebarOpen(false)}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col w-full pt-5 pb-4 bg-white">
                  <div className="border-b pb-3 flex-shrink-0 flex items-center px-4">
                    <span className="flex w-full justify-between items-center">
                      <span className="flex min-w-0 items-center justify-between">
                        <img
                          className="w-6 h-6 bg-gray-300 rounded flex-shrink-0"
                          src={NuleepLogo}
                          alt=""
                        />
                        <span className="flex-1 flex flex-col min-w-0">
                          <span className="text-gray-900 text-xs font-medium truncate">
                            <img src={NuleepText} className='w-9 h-9 rounded flex-shrink-0' />
                          </span>
                        </span>
                      </span>

                    </span>

                    <img src={CloseIcon} className='w-5 h-5' onClick={() => {
                      setSidebarOpen(false)
                    }} />


                  </div>

                  <div className='w-full'>
                    {/* {
                      state && userRender(state?.profile?.profile?.userRef.role === 'jobSeeker' && state?.profile?.selectedProfile != null
                        ? state?.profile && state?.profile?.selectedProfile
                        : state?.profile?.profile)
                    } */}

                    <div className='flex items-center px-4 py-3 bg-gray-100'>
                      <div className="w-5 h-5 bg-blue-100 rounded-full">
                        {state?.profile?.profile?.profileImg[0] ? (
                          <div
                            style={{
                              backgroundImage: `url(${state?.profile?.profile?.profileImg && state?.profile?.profile?.profileImg[0]?.fullUrl
                                ? state?.profile?.profile?.profileImg[0]?.fullUrl
                                : ''
                                })`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              width: '100%',
                              height: '100%',
                              borderRadius: '50%',
                            }}
                          ></div>
                        ) : (
                          <p className="font-bold text-center text-blue-900 font-nunito">
                            {state?.profile?.profile?.firstName[0]}
                          </p>
                        )}
                      </div>

                      <div className='ml-2'>
                        <p className="text-sm text-blue-900 font-nunito">
                          {state?.profile?.profile?.fullName}
                        </p>

                        <p className="text-sm text-blue-900 font-nunito">
                          {state?.profile?.profile?.jobTitle}
                        </p>
                      </div>
                    </div>


                  </div>
                  <div className="flex-1 h-0 overflow-y-auto">
                    <nav className="mt-5">
                      <div className="space-y-1">
                        {navigation.map((item) => (
                          <div
                            onClick={() => onSelectItem(item)}
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              selectedItem.name === item.name
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                              'group flex items-center leading-5 font-semibold rounded-md text-xs'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >

                            <div className='flex' >
                              <div className={classNames(item.current ? 'w-1 bg-black' : 'w-1 bg-gray-100')}></div>
                              <div className='flex px-2 py-3 text-bg_gray666 text-13px'>
                                {
                                  item.current ? <item.icon
                                    className={classNames(
                                      item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                      'mr-3 flex-shrink-0 h-5 w-5'
                                    )}
                                    aria-hidden="true"
                                  /> : <item.icon
                                    className={classNames(
                                      item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                      'mr-3 flex-shrink-0 h-5 w-5'
                                    )}
                                    aria-hidden="true"
                                  />
                                }

                                {item.name}
                              </div>

                            </div>

                          </div>
                        ))}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>

            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pb-4 lg:bg-gray-100">
          {/* <div className="flex items-center flex-shrink-0 px-6">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=purple&shade=500"
                alt="Workflow"
              />
            </div> */}
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            {/* User account dropdown */}
            <Menu as="div" className="py-2 relative flex text-left">
              <div className='w-full'>
                <Menu.Button className="mx-2 group w-full bg-gray-100 rounded-md px-3.5 py-4 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                  <span className="flex w-full justify-between items-center">
                    <span className="flex min-w-0 items-center justify-between">
                      <img
                        className="w-7 h-7 rounded flex-shrink-0"
                        src={NuleepLogo}
                        alt=""
                      />
                      <span className="flex-1 flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate"><img src={NuleepText} className='w-9 h-9 rounded flex-shrink-0' /></span>
                      </span>
                    </span>

                  </span>
                </Menu.Button>

                <div className='px-5 py-2 w-full bg-bg_white flex-row'>
                  {
                    state && userRender(state?.profile?.profile?.userRef.role === 'jobSeeker' && state?.profile?.selectedProfile != null
                      ? state?.profile && state?.profile?.selectedProfile
                      : state?.profile?.profile)
                  }
                </div>
              </div>

            </Menu>
            {/* Sidebar Search */}
            {/* <div className="px-3 mt-5">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    aria-hidden="true"
                  >
                    <SearchIcon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search"
                  />
                </div>
              </div> */}
            {/* Navigation */}
            <nav className="mt-1 pl-1px">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <a
                    onClick={() => onSelectItem(item)}
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      selectedItem.name === item.name ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                      'group flex items-center text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <div className='flex'>
                      {/* w-1 bg-black */}
                      <div className={classNames(item.current ? 'w-1 bg-black' : 'w-1 bg-gray-100')}></div>
                      <div className='flex px-2 py-4 text-bg_gray666 text-13px'>
                        <item.icon
                          className={classNames(
                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-5 w-5 mx-2'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

            </nav>
          </div>
        </div>
        {/* Main column */}
        <div className="lg:pl-64 flex flex-col">
          {/* Search header */}
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
            <button
              type="button"
              className="px-4 border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"

            >
              <span className="sr-only">Open sidebar</span>
              {/* Place the NUleep logo here for small devices */}
              <span className='flex flex-row items-center'>
                <img src={NuleepLogo} className='w-5 h-5' />
                <span className="">
                  <span className="text-sm font-medium truncate">
                    <img src={NuleepText} className='w-9 h-9 rounded flex-shrink-0' />
                  </span>
                </span>
              </span>
            </button>
            <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex-1 flex">

              </div>
              <div className="flex items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-5 w-5"
                        src={hamburger}
                        alt=""
                        onClick={() => {
                          setSidebarOpen(true)
                        }}
                      />
                    </Menu.Button>
                  </div>

                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1">
            {/* Page title & actions */}
            <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">{selectedItem.name}</h1>
              </div>
            </div>
            {/* Pinned projects */}


            {/* Projects list (only on smallest breakpoint) */}
            <div className="mt-10 sm:hidden">
              {
                selectedItem.name === 'Home' &&
                !state?.profile.loading &&
                state.profile &&
                state?.profile?.profile?.userRef.role === "jobSeeker" &&
                <JobSeekerDashboard profile={state.profile} />
              }   
              {
                selectedItem.name === 'Job Search' && 
                  <Jobs />
              }

            </div>

            {/* Projects table (small breakpoint and up) */}
            <div className="hidden mt-8 sm:block">
              {
                selectedItem.name === 'Home' && 
                !state?.profile.loading &&
                state.profile &&
                state?.profile?.profile?.userRef.role === "jobSeeker" &&
                <JobSeekerDashboard profile={state.profile} />

              }
              {
                selectedItem.name === 'Job Search' && 
                  <Jobs />
              }
              {/* {
                selectedItem.name === 'Career Development' &&
                  <Skill />
              } */}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  }
}



export default withRouter(connect(mapStateToProps, actions)(DashboardNew));