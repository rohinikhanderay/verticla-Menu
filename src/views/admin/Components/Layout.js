import Header from '../Header'
import Sidebar from '../Sidebar'
const Layout = ({children}) => {
    return (
        <div className="flex h-screen bg-gray-200">
          <div  className="fixed z-20 inset-0 bg-black  transition-opacity flex">
         <Sidebar/>
          <div className="flex-1 flex flex-col overflow-hidden">
         <Header/>
         <div  className="bg-gray-200" style={{height:"calc(100vh - 80px)", overflowY:"auto"}}>
         {children}
          </div>  </div>
        </div> </div>
    )
}

export default Layout