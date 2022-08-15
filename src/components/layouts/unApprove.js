import Footer from './Footer'
import Navbar from './navbar'

const Unapproved = () => {
  return (
    <div>
      <Navbar />
      <p className="mt-24 text-2xl text-center text-gray-500 h-80 flex items-center justify-center">
        Awaiting Organization Approval.
      </p>
      <Footer />
    </div>
  )
}
export default Unapproved
