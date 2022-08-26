import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ClockIcon, HomeIcon, MenuAlt1Icon, ViewListIcon, XIcon, DocumentSearchIcon, AcademicCapIcon, CogIcon, LogoutIcon, } from '@heroicons/react/outline'
import { ChevronRightIcon, DotsVerticalIcon, SearchIcon, SelectorIcon } from '@heroicons/react/solid'
import NuleepLogo from '../../assets/images/Nuleep-Logo.svg';
import NuleepText from '../../assets/images/Nuleep-Text.svg';
import CloseIcon from '../../assets/images/icons/close_icon.svg';
import HomeFilled from '../../assets/images/Home-Filled.svg';
import hamburger from '../../assets/images/Hamburger.svg';
import JobSearchFilled from '../../assets/images/Job-Search-Filled.svg';
import CarrerDevelopmentFilled from '../../assets/images/CarrerDevelopment.svg';
import SettingsFilled from '../../assets/images/Settings.svg';
import Logo from '../../assets/images/Logo.svg';
import * as actions from '../../store/profile'
import { useHistory, withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from 'react-redux'
import recruiterDashboard from '../dashboard/recruiterDashboard';
import JobSeekerDashboard from '../dashboard/jobSeekerDashboard';
import Dashboard from '../dashboard/DashboardContainer'
import RecruiterDashboard from '../dashboard/recruiterDashboard';
import Applications from '../applications/ApplicationsContainer'
import Profile from '../NewProfile/profile';
import Blogs from '../blogs/index'
import NewApplication from '../applications/NewApplication'
import { signoutUser } from '../../store/auth/index'
// import Applica÷
import Jobs from '../jobs/Jobs';
import Skill from '../profile/Skill';
import Application from '../applications/Application';
import PrivacyPolicy from '../landingPages/PrivacyPolicy';
import TermsOfUse from '../landingPages/TermsOfUse';
import Job from '../jobs/Job';
import BlogDetails from '../blogs/blog';

// { name: 'Settings', href: '#', icon: CogIcon, current: false, iconFilled: SettingsFilled },
const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: false, iconFilled: HomeFilled },
  { name: 'Job Search', href: '#', icon: DocumentSearchIcon, current: false, iconFilled: JobSearchFilled },
  { name: 'Career Development', href: '#', icon: AcademicCapIcon, current: false, iconFilled: CarrerDevelopmentFilled },

  { name: 'Log out', href: '#', icon: LogoutIcon, current: false, iconFilled: LogoutIcon }
]

const navigationJobPartner = [
  { name: 'Home', href: '#', icon: HomeIcon, current: false, iconFilled: HomeFilled },
  { name: 'Post a Job', href: '#', icon: DocumentSearchIcon, current: false, iconFilled: JobSearchFilled },
  { name: 'My Applicants', href: '#', icon: AcademicCapIcon, current: false, iconFilled: CarrerDevelopmentFilled },
  { name: 'Search Candidates', href: '#', icon: DocumentSearchIcon, current: false, iconFilled: JobSearchFilled },
  { name: 'Company Dashboard', href: '#', icon: AcademicCapIcon, current: false, iconFilled: CarrerDevelopmentFilled },
  { name: 'Log out', href: '#', icon: LogoutIcon, current: false, iconFilled: LogoutIcon }
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

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const component = useSelector(state => state.component)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(navigation[0])
  const [subLinks, setSubLinks] = useState()

  let history = useHistory();

  const signOut = () => {
    dispatch(signoutUser())
    setTimeout(() => {
      history.push('/')
    }, 100)
  }


  useEffect(() => {
    getProfile()
  }, [getProfile])



  useEffect(() => {
    dispatch({ type: 'title', title: 'Home' })
    dispatch({ type: 'Home' })
  }, [])

  const onSelectItem = (item) => {
    setSidebarOpen(false)
    setSelectedItem(item)
  }

  const updateSublink = (componentName) => {

    setSubLinks(componentName)
  }

  const userRender = (data) => {



    return (
      <div className='pt-3 pb-3 px-4 flex items-center cursor-pointer' onClick={() => {
        setSidebarOpen(false)
        dispatch({ type: 'title', title: 'My Profile' })
        dispatch({ type: 'Profile' })
      }}>
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
            <p className="font-bold text-center text-black font-nunito">
              {data?.firstName[0]}
            </p>
          )}
        </div>

        <div className='ml-2'>
          <p className={classNames(component.componentName === 'Profile' ? "text-13px text-gray333 font-nunito font-bold" : "text-13px text-bg_gray666 font-nunito font-bold")}>
            {data?.fullName}
          </p>

          <p className="text-sm text-bg_gray666 font-nunito">
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
                          onClick={() => {
                            dispatch({ type: 'title', title: 'Home' })
                            dispatch({ type: 'Home' })
                          }}
                          className="h-6 rounded flex-shrink-0"
                          src={Logo}
                          alt=""
                        />
                        {/* <span className="flex-1 flex flex-col min-w-0">
                          <span className="text-gray-900 text-xs font-medium truncate">
                            <img src={NuleepText} className='w-9 h-9 rounded flex-shrink-0' />
                          </span>
                        </span> */}
                      </span>

                    </span>

                    <img src={CloseIcon} className='w-5 h-5' onClick={() => {
                      setSidebarOpen(false)
                    }} />


                  </div>

                  <div className='w-full flex flex-row'>
                    {/* {
                      state && userRender(state?.profile?.profile?.userRef.role === 'jobSeeker' && state?.profile?.selectedProfile != null
                        ? state?.profile && state?.profile?.selectedProfile
                        : state?.profile?.profile)
                    } */}

                    <div className={classNames(component.componentName === 'Profile' ? 'w-1 bg-black h-full' : 'w-1 bg-gray-100 h-full')}></div>
                    <div className={classNames(component.componentName === 'Profile' ? 'flex items-center cursor-pointer bg-gray-100 py-3 w-full' : 'flex items-center cursor-pointer bg-white py-3 w-full')} onClick={() => {
                      setSidebarOpen(false)
                      dispatch({ type: 'title', title: 'My Profile' })
                      dispatch({ type: 'Profile' })
                    }}>

                      <div className='flex flex-row px-3 items-center'>
                        <div className="w-6 h-6 bg-blue-100 rounded-full">
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
                        {/* for small screen */}
                        <div className='ml-2'>
                          <p className={classNames(component.componentName === 'Profile' ? "text-13px text-gray333 font-nunito font-bold" : "text-13px text-bg_gray666 font-nunito font-bold")}>
                            {state?.profile?.profile?.fullName}
                          </p>

                          <p className={classNames(component.componentName === 'Profile' ? "text-sm text-gray333 font-nunito font-bold" : "text-sm text-bg_gray666 font-nunito font-bold")}>
                            {state?.profile?.profile?.jobTitle}
                          </p>
                        </div>
                      </div>

                    </div>


                  </div>
                  <div className="flex flex-col justify-between flex-1 h-0 overflow-y-auto">
                    <nav className="">
                      <div className="space-y-1">
                        {/* Side navigation for mobile screens */}
                        {navigation.map((item) => (
                          <div
                            onClick={() => {
                              dispatch({ type: item.name })
                              switch (item.name) {
                                case 'Home':
                                  dispatch({ type: 'title', title: 'Home' })
                                  break;
                                case 'Job Search':
                                  dispatch({ type: 'title', title: 'Jobs & Internships' })
                                  break;
                                case 'Career Development':
                                  dispatch({ type: 'title', title: 'Skills & Certifications' })
                                  break;
                                case 'Log out':
                                  signOut()
                                  break;
                              }
                              onSelectItem(item)
                            }
                            }
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              component.componentName === item.name
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                              'group flex items-center leading-5 font-semibold rounded-md text-xs'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >

                            <div className='flex' >
                              <div className={classNames(component.componentName === item.name ? 'w-1 bg-black' : 'w-1 bg-gray-100')}></div>
                              <div className={classNames(component.componentName === item.name ? 'flex px-4 py-3 text-bg_gray333 text-13px ' : 'flex px-4 py-3 text-bg_gray666 text-13px')}>
                                {
                                  component.componentName === item.name ? <img src={item.iconFilled}
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

                    <div>
                      <hr />
                      <div className='flex-col flex mt-5 px-2 py-4 ml-4'>
                        <label className='text-xs text-bg_gray666 font-normal font-nunito cursor-pointer hover:underline decoration-1' onClick={() => {
                          dispatch({ type: 'title', title: 'Privacy Policy' })
                          dispatch({ type: 'Privacy' })
                          setSidebarOpen(false)
                        }}>Privacy Policy</label>
                        <label className='text-xs text-bg_gray666 font-normal mt-4 font-nunito cursor-pointer hover:underline decoration-1' onClick={() => {
                          dispatch({ type: 'title', title: 'Terms of Use' })
                          dispatch({ type: 'Terms of Use' })
                          setSidebarOpen(false)
                        }}>Terms and Conditions</label>
                        <label className='text-xs text-bg_gray666 font-normal mt-4 font-nunito cursor-pointer hover:underline decoration-1'>&copy;2022 Nuleep</label>
                      </div>

                    </div>
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
          <div className="h-0 flex-1 flex flex-col">
            {/* User account dropdown */}
            <Menu as="div" className="relative flex text-left">
              <div className='w-full'>
                <Menu.Button className="py-4 group w-full bg-gray-100 rounded-md px-1.3rem text-sm text-left font-medium text-gray-700 focus:outline-none focus:ring-offset-gray-100">
                  <span className="flex w-full justify-between items-center">
                    <span className="flex min-w-0 items-center justify-between">
                      <img
                        onClick={() => {
                          dispatch({ type: 'title', title: 'Home' })
                          dispatch({ type: 'Home' })
                        }}
                        className="h-6 rounded flex-shrink-0"
                        src={Logo}
                        alt=""
                      />
                      {/* <span className="flex-1 flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate"><img src={NuleepText} className='w-9 h-9 rounded flex-shrink-0' /></span>
                      </span> */}
                    </span>

                  </span>
                </Menu.Button>

                <div className={classNames(component.componentName === 'Profile' ? 'flex w-full bg-bg_white flex-row' : 'flex w-full flex-row')}>

                  <div className={classNames(component.componentName === 'Profile' ? 'h-auto w-1 bg-black' : 'h-auto w-1 bg-white')}></div>
                  {/* <div className='h-auto w-1 bg-black'></div> */}
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
            <nav className="">
              <div className="">
                {navigation.map((item) => (
                  <a
                    onClick={() => {
                      switch (item.name) {
                        case 'Home':
                          dispatch({ type: 'title', title: 'Home' })
                          break;
                        case 'Job Search':
                          dispatch({ type: 'title', title: 'Jobs & Internships' })
                          break;
                        case 'Career Development':
                          dispatch({ type: 'title', title: 'Skills & Certifications' })
                          break;
                        case 'Log out':
                          signOut()
                          break;
                      }

                      dispatch({ type: item.name })
                      onSelectItem(item)
                    }}
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      component.componentName === item.name ? 'bg-bg_white text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200',
                      'group flex items-center text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <div className='flex'>
                      {/* w-1 bg-black */}
                      <div className={classNames(component.componentName === item.name ? 'w-1 bg-black' : 'w-1 bg-gray-100')}></div>
                      <div className={classNames(component.componentName === item.name ? 'flex px-4 py-4 text-gray333 text-13px font-nunito font-bold' : 'flex px-4 py-4 text-bg_gray666 text-13px font-nunito font-bold')}>
                        {
                          component.componentName === item.name ? <img src={item.iconFilled}
                            className={classNames(
                              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-3 flex-shrink-0 h-4 w-4 ml-2'
                            )}
                            aria-hidden="true"
                          /> : <item.icon
                            className={classNames(
                              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-3 flex-shrink-0 h-5 w-5 mx-2'
                            )}
                            aria-hidden="true"
                          />
                        }

                        {item.name}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

            </nav>

          </div>

          <div>
            <hr />
            <div className='flex-col flex mt-5 px-2 py-4 ml-4'>
              <label className='text-xs text-bg_gray666 font-normal font-nunito cursor-pointer hover:underline decoration-1' onClick={() => {
                dispatch({ type: 'title', title: 'Privacy Policy' })
                dispatch({ type: 'Privacy' })
              }}>Privacy Policy</label>
              <label className='text-xs text-bg_gray666 font-normal mt-5 font-nunito cursor-pointer hover:underline decoration-1' onClick={() => {
                dispatch({ type: 'title', title: 'Terms of Use' })
                dispatch({ type: 'Terms of Use' })
              }}>Terms and Conditions</label>
              <label className='text-xs text-bg_gray666 font-normal mt-5 font-nunito cursor-pointer hover:underline decoration-1'>&copy;2022 Nuleep</label>
            </div>

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
                <img src={Logo} className='h-6' />
                {/* <span className="">
                  <span className="text-sm font-medium truncate">
                    <img src={NuleepText} className='w-9 h-9 rounded flex-shrink-0' />
                  </span>
                </span> */}
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
              <div className="flex-1 min-w-0 flex justify-between">
                <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">{component.title}</h1>

                {
                  component.componentName === 'Profile' && <div className='flex flex-row sm:hidden'>
                    <div className='flex items-center  pl-7 pr-7 py-1 border-1px rounded-full border-black'>
                      <label className='text-sm font-normal text-black cursor-pointer'>Print Resume</label>
                    </div>
                    <div className='flex items-center ml-2 pl-7 pr-7 py-1 border-1px rounded-full bg-black cursor-pointer' onClick={() => {
                      dispatch({ type: 'preview_public', publicProfile: true })
                    }}>
                      <label className='text-sm font-normal decoration-black cursor-pointer text-bg_skyblue'>Preview Public</label>
                    </div>

                  </div>
                }

              </div>


            </div>
            {/* Pinned projects */}


            {/* Projects list (only on smallest breakpoint) */}
            <div className="mt-10 sm:hidden">
              {
                component.componentName === 'Home' &&
                !state?.profile.loading &&
                state.profile &&
                state?.profile?.profile?.userRef.role === "jobSeeker" &&
                <JobSeekerDashboard profile={state.profile} updateSublink={updateSublink} />
              }
              {
                component.componentName === 'Job Search' &&
                <Jobs />
              }

              {
                component.componentName === 'Career Development' &&
                <Skill profileId={state.profile.profile._id} />
              }

              {
                component.componentName === 'My Applications' &&
                <Applications />
              }

              {
                component.componentName === 'Profile' &&
                <Profile profile_Id={state.profile.profile._id} />
              }
              {
                component.componentName === 'Blogs' &&
                <Blogs />
              }
              {
                component.componentName === 'Application' &&
                <Application profile_Id={state.profile.profile._id} />
              }

              {
                component.componentName === 'Privacy' &&
                <PrivacyPolicy appId={component.appId} />
              }

              {
                component.componentName === 'Terms of Use' &&
                <TermsOfUse appId={component.appId} />
              }
              {
                component.componentName === 'JobDesc' &&
                <Job jobId={component.jobId} />
              }

              {
                component.componentName === 'New Application' &&
                <NewApplication jobId={component.jobId} />
              }

              {
                component.componentName === 'Blog Details' &&
                <BlogDetails blogId={component.blogId} />
              }

            </div>

            {/* Projects table (small breakpoint and up) */}
            <div className="hidden mt-8 sm:block">
              {
                component.componentName === 'Home' &&
                !state?.profile.loading &&
                state.profile &&
                state?.profile?.profile?.userRef.role === "jobSeeker" &&
                <JobSeekerDashboard profile={state.profile} />

              }
              {
                component.componentName === 'Job Search' &&
                <Jobs />
              }
              {
                component.componentName === 'Career Development' &&
                <Skill profileId={state.profile.profile._id} />
              }
              {
                component.componentName === 'My Applications' &&
                <Applications />
              }
              {
                component.componentName === 'Profile' &&
                <Profile profile_Id={state.profile.profile._id} />
              }
              {
                component.componentName === 'Blogs' &&
                <Blogs />
              }

              {
                component.componentName === 'Application' &&
                <Application appId={component.appId} />
              }

              {
                component.componentName === 'Privacy' &&
                <PrivacyPolicy />
              }

              {
                component.componentName === 'Terms of Use' &&
                <TermsOfUse />
              }

              {
                component.componentName === 'JobDesc' &&
                <Job jobId={component.jobId} />
              }

              {
                component.componentName === 'New Application' &&
                <NewApplication jobId={component.jobId} />
              }
              {
                component.componentName === 'Blog Details' &&
                <BlogDetails blogId={component.blogId} />
              }
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