import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import * as action from '../../store/profile/'
import { connect } from 'react-redux'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import io from 'socket.io-client'
import { connection } from '../../views/chat/conncetion'
import {
  readNotification,
  getOrgNotification,
  getNotification,
  addNotification,
} from '../../store/notifications/index'
import {
  // BellIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import NuleepLogo from '../../assets/landingPages/nuleepLogo.png'
import DefaultNavbar from './defaultNavbar'
import { useSelector, useDispatch } from 'react-redux'
import { API_URL } from '../../../src/store/API_URL'
import { socketEstablish } from '../../store/chat/index'
var socket
var noti = []
const Navbar = ({ getProfile, profile, history, auth: { authenticated } }) => {
  const sockets = useSelector((state) => state.chat)
  useEffect(() => {
    getProfile()
  }, [getProfile])
  useEffect(() => {
    // socket = io(API_URL, {
    //   transports: ['websocket'],
    // })
    socket = sockets && sockets?.socket
    if (socket.length != 0) {
      localStorage.setItem('chatId', '')
      socket?.emit('setup', localStorage.getItem('uuid'))
      socket?.on('connected', () => console.log('cpnnect'))
    }
  }, [])

  useEffect(() => {
    socket.length != 0 &&
      socket?.on('push', (message) => {
        if (message) {
          if (
            localStorage.getItem('chatId') == '' ||
            localStorage.getItem('chatId') !== message?.room
          ) {
            //Notify

            if (!noti.some((person) => person.msgId === message.msgId)) {
              noti = [message, ...noti]

              dispatch(
                addNotification({
                  title: `<span class='menuList'>New message from <b>${message.name}</b></span><span class='menuList'>${message.message}</span>`,
                  userId: message.recId,
                  roomId: message.room,
                }),
              )
            }
          }
        }
      }) // scrollToBottom()
  })
  const uProfile = useSelector((state) => state.profile)
  useEffect(() => {
    if (uProfile.profile?._id) {
      dispatch(
        getNotification({
          userId: profile.profile?._id,
          isRead: false,
          notificationType: ['CHAT'],
        }),
      )

      if (uProfile.profile?._id) {
        dispatch(
          getOrgNotification({
            userId: profile.profile?._id,
            isRead: false,
            notificationType: ['ORGJOIN', 'EVENT'],
          }),
        )
      }
    }
  }, [uProfile.profile?._id])

  const userRender = (data) => {
    return (
      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
        {data?.profileImg[0] ? (
          <div
            style={{
              backgroundImage: `url(${
                data?.profileImg && data?.profileImg[0]?.fullUrl
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
    )
  }
  // useEffect(() => {
  //   if (uProfile?.selectedProfile && uProfile.type == 'jobSeeker') {
  //     userRender(uProfile?.selectedProfile)
  //   }
  // }, [uProfile])

  const notifications = useSelector((state) => state.notifications)

  const dispatch = useDispatch()

  if (!profile.profile || !authenticated) {
    return <DefaultNavbar />
  }

  let navigation = []

  if (profile?.profile.userRef.role === 'jobSeeker') {
    navigation = [
      { name: 'Home', href: '/dashboard' },
      { name: 'Jobs', href: '/jobs' },
      // { name: 'My Applications', href: '/applications' },
      {
        name: 'Courses',
        href: `/skill/${profile.profile._id}`,
      },
      // { name: 'My Profile', href: `/profiles/${profile.profile._id}` },
      // { name: 'Events', href: '/events' }, // 1149 - Non admins are able to access Admin Dashboard - commented the route as per the story
      { name: 'Blog', href: '/blogs' },
      //{ name: 'Messages', href: '/conversations' },
      { name: "Leaderboard", href: `/leaderboard/` },
    ]
  }

  if (
    profile.profile.userRef.role === 'recruiter' &&
    profile.profile.organizationApproved
  ) {
    navigation = [
      { name: 'Home', href: '/dashboard' },
      { name: 'Post a Job', href: '/jobs/new' },
      { name: 'My Applicants', href: '/applications' },

      { name: 'Search Candidates', href: '/candidates' },
      {
        name: 'Company Dashboard',
        href: `/company`,
      },

      //{ name: 'Blogs', href: '/blogs' },
     // { name: 'Messages', href: '/conversations' },
    ]
  }

  // const userNavigation = [{ name: 'Sign out', href: '/signout' }];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Disclosure as="header" className="">
      {({ open }) => (
        <>
          <div className="container m-auto sm:px-6 px-6">
            <div className="flex justify-between h-16 items-center">
              <div className="flex">
                <Link to="/" className="flex items-center flex-shrink-0">
                  <img
                    className="block w-auto h-8 lg:hidden"
                    src={NuleepLogo}
                    alt="Workflow"
                  />
                  <img
                    className="hidden w-auto h-8 lg:block"
                    src={NuleepLogo}
                    alt="Workflow"
                  />
                </Link>
                <div
                  className={`sm:hidden relative sm:ml-6 flex ml-5 md:ml-3 md:space-x-1 lg:space-x-8 text-gray-600`}
                >
                  {navigation.map((item, index) => {
                    return (
                      <>
                        <Link
                          key={index}
                          to={item.href}
                          className="inline-flex items-center px-1 pt-1 text-sm tracking-wide "
                        >
                          {item.name}
                        </Link>
                        {navigation?.length - 1 === index &&
                        notifications &&
                        notifications?.notifications.length != 0 ? (
                          <>
                            <Menu
                              as="div"
                              className="relative inline-block text-left cust-msg"
                            >
                              <div className="">
                                <Menu.Button className="inline-flex justify-center w-full rounded-md py-2 bg-white text-sm font-medium text-gray-700 ">
                                  <span class="relative inline-block cursor-pointer cust-message">
                                    <svg
                                      fill="teal"
                                      class="w-6 h-6 text-gray-700"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                        clip-rule="evenodd"
                                        fill-rule="evenodd"
                                      ></path>
                                    </svg>
                                    <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                      {notifications?.notifications?.length}
                                    </span>
                                  </span>
                                </Menu.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="cust-menu border-b border-gray-300">
                                  {notifications &&
                                    notifications?.notifications?.map((i, index) => {
                                      return (
                                        <div key={index}>
                                          <Menu.Item>
                                            {({ active }) => (
                                              <Link
                                                to={`/conversations/${i.roomId}`}
                                                className="inline-flex items-center text-sm tracking-wide "
                                                onClick={() => {
                                                  dispatch(
                                                    readNotification({
                                                      roomId: i.roomId,
                                                      userId:
                                                        profile.profile?._id,
                                                      notificationType: 'CHAT',
                                                    }),
                                                  )
                                                }}
                                              >
                                                <div
                                                  className="submenuItem"
                                                  dangerouslySetInnerHTML={{
                                                    __html: i.title,
                                                  }}
                                                ></div>
                                              </Link>
                                            )}
                                          </Menu.Item>
                                        </div>
                                      )
                                    })}
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </>
                        ) : (
                          ''
                        )}
                      </>
                    )
                  })}
                </div>
              </div>

              <div className="sm:ml-6 sm:flex sm:items-center sm:hidden flex items-center">
                {/* Profile dropdown */}
                <>
                  {profile.profile.organizationRole == 'admin' ||
                  profile?.profile.userRef.role === 'jobSeeker' ? (
                    <div className="relative cursor-pointer">
                      <Menu
                        as="div"
                        className="relative inline-block text-left "
                      >
                        <div className="">
                          <Menu.Button className="inline-flex justify-center w-full rounded-md py-2 bg-white text-sm font-medium text-gray-700 ">
                            {notifications?.orgNotifications?.length != 0 ? (
                              <span
                                class="inline-block absolute w-3 h-3 right-0 mr-0 ml-auto bg-amber-500 rounded-full"
                                style={{ backgroundColor: '#f59e0b' }}
                              ></span>
                            ) : (
                              ''
                            )}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="teal"
                            >
                              <path d="M15.137 3.945c-.644-.374-1.041-1.07-1.04-1.82v-.003c0-1.172-.939-2.122-2.097-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-6.728 12.055h-1.882c1.245-2.741.879-9.012 3.873-10.655-1.761 2.067-.95 7.504-1.991 10.655zm3.591-13c-.552 0-1-.448-1-1 0-.551.448-1 1-1s1 .449 1 1c0 .552-.448 1-1 1zm-3 18h6c0 1.598-1.393 3-2.971 3-1.579 0-3.029-1.402-3.029-3z" />
                            </svg>
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="cust-menu border-b border-gray-300">
                            {notifications &&
                            notifications?.orgNotifications.length != 0 ? (
                              notifications?.orgNotifications?.map((i, orgNotificationsindex) => {
                                return (
                                  <div key={orgNotificationsindex}>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link
                                          to={`${
                                            i.notificationType == 'EVENT'
                                              ? `event/${i.eventId}`
                                              : '/company/employees'
                                          }`}
                                          className="inline-flex items-center text-sm tracking-wide "
                                          onClick={() => {
                                            dispatch(
                                              readNotification({
                                                userId: profile.profile?._id,
                                                _id: i._id,
                                                notificationType: [
                                                  'ORGJOIN',
                                                  'EVENT',
                                                ],
                                              }),
                                            )
                                          }}
                                        >
                                          <div
                                            className="submenuItem"
                                            dangerouslySetInnerHTML={{
                                              __html: i.title,
                                            }}
                                          ></div>
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  </div>
                                )
                              })
                            ) : (
                              <div>
                                <Menu.Item>
                                  <div className="inline-flex items-center text-sm tracking-wide ">
                                    You’re all caught up! Check back later for
                                    new notifications
                                  </div>
                                </Menu.Item>
                              </div>
                            )}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  ) : (
                    ''
                  )}
                </>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                      <span className="sr-only">Open user menu</span>

                      {userRender(
                        profile?.profile.userRef.role === 'jobSeeker' &&
                          uProfile?.selectedProfile != null
                          ? uProfile && uProfile?.selectedProfile
                          : uProfile?.profile,
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      style={{ zIndex: 99 }}
                      className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/signout"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="flex items-center -mr-2 sm:block hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:block hidden  hi">
            <div className="pt-2 pb-3 space-y-1 mob-menu">
              {navigation.map((item, index) => (
                <>
                  <Link
                    key={index}
                    to={item.href}
                    className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700"
                  >
                    {item.name}
                  </Link>
                  {navigation?.length - 1 === index &&
                  notifications &&
                  notifications?.notifications.length != 0 ? (
                    <>
                      {/* <span class="relative inline-block cursor-pointer cust-message"> */}
                      {/* <svg
                          fill="teal"
                          class="w-6 h-6 text-gray-700"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                          {notifications?.notifications?.length}
                        </span> */}
                      <Menu
                        as="div"
                        className="relative inline-block cursor-pointer cust-message"
                      >
                        <div className="">
                          <Menu.Button className="inline-flex justify-center w-full rounded-md py-2 bg-white text-sm font-medium text-gray-700 ">
                            <span class="relative inline-block cursor-pointer cust-message">
                              <svg
                                fill="teal"
                                class="w-6 h-6 text-gray-700"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                  clip-rule="evenodd"
                                  fill-rule="evenodd"
                                ></path>
                              </svg>
                              <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                {notifications?.notifications?.length}
                              </span>
                            </span>
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="cust-menu nav-noti-menu border-b border-gray-300">
                            {notifications &&
                              notifications?.notifications?.map((i, notificationsindex) => {
                                return (
                                  <div key={notificationsindex}>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link
                                          to={`/conversations/${i.roomId}`}
                                          className="inline-flex items-center text-sm tracking-wide "
                                          onClick={() => {
                                            dispatch(
                                              readNotification({
                                                roomId: i.roomId,
                                                userId: profile.profile?._id,
                                                notificationType: 'CHAT',
                                              }),
                                            )
                                          }}
                                        >
                                          <div
                                            className="submenuItem"
                                            dangerouslySetInnerHTML={{
                                              __html: i.title,
                                            }}
                                          ></div>
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  </div>
                                )
                              })}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      {/* </span> */}
                    </>
                  ) : (
                    ''
                  )}
                </>
              ))}
              {profile.profile.organizationRole == 'admin' ||
              profile?.profile.userRef.role === 'jobSeeker' ? (
                <div className="relative block top-1 ml-3">
                  <div className="relative inline-block cursor-pointer">
                    {/* <span
                    className="inline-block absolute w-3 h-3 right-0 mr-0 ml-auto bg-amber-500 rounded-full"
                    style={{ backgroundColor: 'rgb(245, 158, 11)' }}
                  ></span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="teal"
                  >
                    <path d="M15.137 3.945c-.644-.374-1.041-1.07-1.04-1.82v-.003c0-1.172-.939-2.122-2.097-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-6.728 12.055h-1.882c1.245-2.741.879-9.012 3.873-10.655-1.761 2.067-.95 7.504-1.991 10.655zm3.591-13c-.552 0-1-.448-1-1 0-.551.448-1 1-1s1 .449 1 1c0 .552-.448 1-1 1zm-3 18h6c0 1.598-1.393 3-2.971 3-1.579 0-3.029-1.402-3.029-3z"></path>
                  </svg> */}
                  </div>
                  <Menu as="div" className="relative inline-block text-left ">
                    <div className="">
                      <Menu.Button className="inline-flex justify-center w-full rounded-md py-2 bg-white text-sm font-medium text-gray-700 ">
                        {notifications?.orgNotifications?.length != 0 ? (
                          <span
                            class="inline-block absolute w-3 h-3 right-0 mr-0 ml-auto bg-amber-500 rounded-full"
                            style={{ backgroundColor: '#f59e0b' }}
                          ></span>
                        ) : (
                          ''
                        )}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="teal"
                        >
                          <path d="M15.137 3.945c-.644-.374-1.041-1.07-1.04-1.82v-.003c0-1.172-.939-2.122-2.097-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-6.728 12.055h-1.882c1.245-2.741.879-9.012 3.873-10.655-1.761 2.067-.95 7.504-1.991 10.655zm3.591-13c-.552 0-1-.448-1-1 0-.551.448-1 1-1s1 .449 1 1c0 .552-.448 1-1 1zm-3 18h6c0 1.598-1.393 3-2.971 3-1.579 0-3.029-1.402-3.029-3z" />
                        </svg>
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="cust-menu nav-noti-menu  border-b border-gray-300">
                        {notifications &&
                        notifications?.orgNotifications?.length != 0 ? (
                          notifications?.orgNotifications.map((i, orgNotificationsindex) => {
                            return (
                              <div key={orgNotificationsindex}>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to={`${
                                        i.notificationType == 'EVENT'
                                          ? `event/${i.eventId}`
                                          : '/company/employees'
                                      }`}
                                      className="inline-flex items-center text-sm tracking-wide "
                                      onClick={() => {
                                        dispatch(
                                          readNotification({
                                            userId: profile.profile?._id,
                                            _id: i._id,
                                            notificationType: [
                                              'ORGJOIN',
                                              'EVENT',
                                            ],
                                          }),
                                        )
                                      }}
                                    >
                                      <div
                                        className="submenuItem"
                                        dangerouslySetInnerHTML={{
                                          __html: i.title,
                                        }}
                                      ></div>
                                    </Link>
                                  )}
                                </Menu.Item>
                              </div>
                            )
                          })
                        ) : (
                          <div>
                            <Menu.Item>
                              <div className="inline-flex items-center text-sm tracking-wide ">
                                You’re all caught up! Check back later for new
                                notifications
                              </div>
                            </Menu.Item>
                          </div>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full">
                  <p className="p-2 font-bold text-center text-blue-900 font-nunito">
                    {profile?.profile.firstName[0]}
                  </p>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {profile.profile.firstName} {profile.profile.lastName}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {profile.profile.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to="/signout"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </Link>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default withRouter(connect(mapStateToProps, action)(Navbar))
