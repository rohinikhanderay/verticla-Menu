import { useState, useEffect } from 'react'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  adminSendOwnerShip,
  adminViewCompany,
} from '../../../../store/company/index'
import { useHistory } from 'react-router-dom'

const OwnerShip = (props) => {
  const dispatch = useDispatch()
  const [result, setResult] = useState('')
  const company = useSelector((state) => state.company)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const history = useHistory()
  useEffect(async () => {
    dispatch(adminViewCompany({ id: props.match.params.id })).then((res) => {
      setResult(res)
    })
  }, [])

  const dataSubmit = (data) => {
    dispatch(
      adminSendOwnerShip(
        {
          newemail: data.adminEmail,
          email: result && result?.data?.email,
          orgid: props.match.params.id,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        history,
      ),
    )
  }
  return (
    <Layout>
      <h3 class="text-gray-700 text-3xl font-medium container mx-auto px-6 py-8">
        {' '}
        OwnerShip
      </h3>

      <div className="container mx-auto px-6">
        {company?.error != '' ? (
          <div
            className="w-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative"
            role="alert"
          >
            {/* <strong className="font-bold">Holy smokes!</strong> */}
            <span className="block sm:inline">{company?.error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              {/* <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg> */}
            </span>
          </div>
        ) : (
          ''
        )}

        {/* {setTimeout(()=>{
       
     },110)} */}

        <form
          className="w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4"
          onSubmit={handleSubmit((data) => {
            dataSubmit(data)
          })}
          method="post"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-xl">
              <span className="font-bold"> Email:</span>{' '}
              {result && result?.data?.email}
            </label>
            {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" /> */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter first name
            </label>
            <input
              {...register('firstName', { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
            <p className="text-red-500 text-xs italic">
              {errors.firstName && <span>First name is required</span>}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter last name
            </label>
            <input
              {...register('lastName', { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
            <p className="text-red-500 text-xs italic">
              {errors.lastName && <span>Last name is required</span>}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter new email
            </label>
            <input
              {...register('adminEmail', { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
            />
            <p className="text-red-500 text-xs italic">
              {errors.adminEmail && <span>Email is required</span>}
            </p>
          </div>
          <div className="flex items-center justify-between">
            {/* <button type='submit' type="button">
             Send
            </button> */}
            <input
              className="cursor-pointer inline-flex justify-center px-4 py-2 font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm text-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              type="submit"
            />
          </div>
        </form>
      </div>
    </Layout>
  )
}
export default OwnerShip
