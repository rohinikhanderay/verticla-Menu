import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { signoutUser } from '../../store/auth/index'
import { useHistory } from 'react-router-dom'
import defaultImage from '../../assets/images/de_images.png'
const Header = () => {
  const [toggle, setToggle] = useState(false)
  const dispathch = useDispatch()
  const history = useHistory()
  const toggleData = () => {
    setToggle(!toggle)
  }
  const signOut = () => {
    dispathch(signoutUser())
    setTimeout(() => {
      history.push('/')
    }, 100)
  }
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-teal-600">
      <h1 className="text-3xl font-bold leading-tight tracking-wide text-teal-700">
        Admin Dashboard
      </h1>
      <div className="flex items-center">
        <button className="text-gray-500 focus:outline-none lg:hidden">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="relative mx-4 lg:mx-0" style={{ visibility: 'hidden' }}>
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>
          <input
            className="form-input w-32 sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-600"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <div onClick={toggleData}>
            <button
              style={{ zIndex: '9999' }}
              className="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
            >
              {/* <img
                className="h-full w-full object-cover"
                src={defaultImage}
                alt="Your avatar"
              /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
                fill="teal"
                width="22"
                height="22"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
              </svg>
            </button>
          </div>
          <div
            className="fixed inset-0 h-full w-full z-10"
            style={{ display: toggle ? 'block' : 'none' }}
          />
          <div
            className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
            style={{ display: toggle ? 'block' : 'none' }}
          >
            {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Products</a> */}
            <p
              className="block px-4 py-2 text-sm text-white bg-teal-600 hover:bg-teal-600 hover:text-white cursor-pointer"
              onClick={signOut}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
