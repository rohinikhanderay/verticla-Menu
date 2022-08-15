import {useEffect,useState} from 'react'
import {useSelector,useDispatch}from 'react-redux'
import Navbar from './layouts/navbar';
import {stripePayament } from '../../src/store/profile/index'
import {useHistory}from 'react-router-dom'
const RecruiterSubscription = ()=>{
  const productIds = {
    plan1:process.env.REACT_APP_STRIPE_PRODUCT1_ID,
    plan2: process.env.REACT_APP_STRIPE_PRODUCT2_ID,
  };
  const [subPlan,setSubPlan]=useState(productIds.plan1);
   const profileData = useSelector((state) => state.profile);
   const dispatch=useDispatch()
   const history=useHistory()
   useEffect(()=>{
   
     if(profileData?.profile?.userRef?.subscription){
         history.push('/dashboard')
        }
    
   },[profileData])
  const purchasePan=async ()=>{
    
  dispatch(stripePayament({
        email:profileData?.profile?.email,
        productId: subPlan,
        approve:'SUB'
      })).then((data)=>{window.location.href = data.url
    });
   // window.location.href = data.url;
  }

  const subscriptionPlan = (e,data) => {
      setSubPlan(e.target.value)
  };
    return(<div><Navbar/>
    <div className="" style={{margin:'0px 30%'}}>
    <p className="text-3xl font-bold text-gray-700 font-baskerville mb-6 mt-10">
        Pick a plan
      </p>
      <div className="text-gray-70 border border-gray-700 p-4 rounded-lg mb-4 flex justify-between">
        <label for="html" className="flex items-center">
          <span className="flex">
            <span className="font-baskerville"> $</span>{" "}
            <span className="font-baskerville text-8xl sm:text-6xl align-top	">
              {" "}
              99
            </span>
          </span>
          <span className="text-gray-700 text-base px-10 sm:px-4">
           Per month/seat after the 14-day trial
          </span>
        </label>
        <input
          onChange={(e) => {
            subscriptionPlan(e,'$99, Per month/seat after the 14-day trial.');
          }}
          defaultChecked={true}
          type="radio"
          name="fav_language"
          value={productIds.plan1}
          className="text-teal-600 focus:outline-none focus:ring-2	focus:ring-gray-700 focus:bg-none checked:bg-none"
        />
      </div>
      <div className="text-gray-70 border border-gray-700 p-4 rounded-lg mb-4 flex justify-between">
        <label for="html" className="flex items-center">
          <span className="flex">
            <span className="font-baskerville"> $</span>{" "}
            <span className="font-baskerville text-8xl sm:text-6xl align-top	">
              {" "}
              89
            </span>
          </span>
          <span className="text-gray-700 text-base px-10 sm:px-4">
           Save 10% monthly/seat. Billed annually after the 14-day trial.
          </span>
        </label>
        <input
          type="radio"
          name="fav_language"
          onChange={(e) => {
            subscriptionPlan(e,'$89, Save 10% monthly/seat. Billed annually after the 14-day trial.');
          }}
          value={productIds.plan2}
          className="text-teal-600 focus:outline-none focus:ring-2	focus:ring-gray-700 focus:bg-none checked:bg-none"
        />
      </div>
      <button
                    className="flex px-14 py-3 text-white bg-teal-600 rounded-3xl flex-end"
                    type="button" onClick={purchasePan}
                  >
                    Subscribe
                  </button> </div>
    </div>)
}
export default RecruiterSubscription