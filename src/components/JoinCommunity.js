import{useState,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import {useDispatch} from 'react-redux'
import {mailChimpApi} from '../store/auth/index'
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
const JoinCommunity=()=>{

  const dispatch=useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
     dispatch(mailChimpApi({email_address:data.emailAddress,
    status:"subscribed"})).then((res)=>{
      if(res.data.statusCode === 200){
        toast.success(res.data.success);
      }else toast.error(res.data.message);
    }).catch((res)=>{
      toast.error(res.message)});
  };
    return(<section className="mx-auto mt-12 text-center max-w-7xl md:mt-16 md:text-left">
           <ToastContainer />
          <div className="bg-white">
            <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
              <div className="px-6 py-10  rounded-3xl sm:py-16 sm:px-12 lg:p-20 lg:flex lg:items-center" style={{background:'rgba(15,118,110,var(--tw-bg-opacity))'}}>
                <div className="lg:w-0 lg:flex-1">
                  <h2 className="text-2xl font-extrabold tracking-tight tracking-wide font-baskerville text-indigo-50">
                    Join the Nuleep Partners Community!
                  </h2>
                  <p className="max-w-3xl mt-4 text-md text-indigo-50">
                    Get updates on upcoming events, workshops and more!
                  </p>
                </div>
                <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
                  <form className="sm:flex"onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="emailAddress" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="emailAddress"
                      name="emailAddress"
                      style={{border:`${errors.emailAddress?'red':'white'} solid 2px`}}
                      {...register("emailAddress", { required: true })}
                      type="email"
                      autoComplete="email"
                     
                      className="w-full px-5 py-3 text-center placeholder-gray-500 border-white rounded-md md:text-left  "
                      placeholder="Enter your email"
                    />
                    <button
                      type="submit" 
                      className="flex items-center justify-center w-full px-5 py-3 mt-3 text-base font-medium  border border-transparent rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0 " style={{background:'#14b8a6',color:'#fff'}}
                    >
                      Notify me
                    </button>
                  </form>
                  <p className="mt-3 text-sm text-indigo-100">
                    We care about the protection of your data. Read our{" "}
                    <Link
                      to="/privacypolicy"
                      className="font-medium underline text-indigo-50"
                    >
                      Privacy Policy.
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>)
}
export default JoinCommunity