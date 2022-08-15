import logo from '../../assets/images/footer-logo.png'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-teal-700 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0">
      <div className="flex items-center justify-center mt-8">
        <div className="flex items-center">
          <img className="h-12 w-30" src={logo} />
        </div>
      </div>
      <nav className="mt-10">
        <NavLink
          to="/admin/organization"
          activeClassName="sideBarActiveClass"
          className="flex items-center mt-2 py-2 px-6  text-gray-100 sidebarHover"
        >
          <svg
            width="24"
            height="24"
            fill="#fff"
            className="w-5"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M6 7v-7h13v10h5v14h-23v-17h5zm0 16v-4h-1v4h1zm8-4h-3v4h3v-4zm6 0h-1v4h1v-4zm2-7h-3v6h2v4h1v-10zm-5-10h-9v20h1v-5h7v5h1v-20zm-13 20v-4h2v-9h-3v13h1zm17-6h-1v-2h1v2zm-17-2h1v2h-1v-2zm8 1h-2v-2h2v2zm3 0h-2v-2h2v2zm-10-4v2h-1v-2h1zm7 1h-2v-2h2v2zm3 0h-2v-2h2v2zm-3-3h-2v-2h2v2zm3 0h-2v-2h2v2zm-3-3h-2v-2h2v2zm3 0h-2v-2h2v2z" />
          </svg>
          <span className="mx-3">Company</span>
        </NavLink>
        <NavLink
          to="/admin/blog"
          activeClassName="sideBarActiveClass"
          className="flex items-center mt-2 py-2 px-6  text-gray-100 sidebarHover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            width="24"
            height="24"
            className="w-5"
            viewBox="0 0 24 24"
          >
            <path d="M6 22v-16h16v7.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-10.386h-20v20h10.189c3.163 0 9.811-7.223 9.811-9.614zm-10 1.614h-5v-1h5v1zm5-4h-10v1h10v-1zm0-3h-10v1h10v-1zm2-7h-19v19h-2v-21h21v2z" />
          </svg>
          <span className="mx-3">Blogs</span>
        </NavLink>
        
        { // 1151- events removed for admin
        /* <NavLink
          to="/admin/event"
          activeClassName="sideBarActiveClass"
          className="flex items-center mt-2 py-2 px-6  text-gray-100 sidebarHover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            width="24"
            height="24"
            className="w-5"
            viewBox="0 0 24 24"
          >
            <path d="M24 2v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2zm1 11.729l.855-.791c1 .484 1.635.852 2.76 1.654 2.113-2.399 3.511-3.616 6.106-5.231l.279.64c-2.141 1.869-3.709 3.949-5.967 7.999-1.393-1.64-2.322-2.686-4.033-4.271z" />
          </svg>
          <span className="mx-3">Events</span>

        </NavLink> */}

        <NavLink
          to="/admin/leaderboard"
          activeClassName="sideBarActiveClass"
          className="flex items-center mt-2 py-2 px-6  text-gray-100 sidebarHover"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="mx-3">Leaderboard</span>
        </NavLink>

      </nav>
    </div>
  )
}
export default Sidebar
