import React, { useEffect, useState } from "react";
import { Field } from "react-final-form";
import Progress from "react-progressbar";
import Spinner from "../../../components/spinner";
/*

const required = (value) => (value ? undefined : 'Required');

const Error = ({ name }) => {
    return (
        <Field
            name={name}
            subscription={{ touched: true, error: true }}
            render={({ meta: { touched, error } }) => {
                return touched && error ? (
                    <span className="block my-2 ml-2 text-red-500">
                        {error}
                    </span>
                ) : null;
            }}
        />
    );
};

*/

const Subscription = () => {
   const [loading, setLoading] = useState(true);
   const productIds = {
    plan1:process.env.REACT_APP_STRIPE_PRODUCT1_ID,
    plan2: process.env.REACT_APP_STRIPE_PRODUCT2_ID,
  };
  useEffect(() => {
    localStorage.setItem("productId", productIds.plan1);
     localStorage.setItem("productLabel", '$99, Per month/seat after the 14-day trial.')
     setTimeout(()=>{
       setLoading(false)
     },1500)
  }, []);
  const subscriptionPlan = (e,data) => {
    localStorage.setItem("productId", e.target.value);
    localStorage.setItem("productLabel", data)
  };
  return (
    <div >
      <div style={{ display: loading ? "block" : "none" }}>
        <Spinner />
      </div>
      <div className="text-base text-gray-700 mb-2">Step 2 of 3</div>
      <Progress className="cm-progress" completed={75} />
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

      {/* <div
        className="w-4/6 cus-box my-16 m-auto flex flex-col justify-center rounded duration-75	delay-75 ease-in-out transition-all"
        style={{ backgroundColor: "rgb(56 172 182 / 8%)" }}
      >
        <div className="text-center">
          <h5 className="text-xl text-gray-500">Professional</h5>
          <h1 className="text-4xl font-bold my-3 ">$99</h1>
          <p className="text-gray-500">Per month</p>
          
          <div className="sub-box m-auto mt-8">
            <div className="flex items-center mb-2">
              <div className="bg-teal-500 w-5 h-5 rounded-full circle relative"></div>
              <p className="pl-2">Unlimited job postings</p>
            </div>
            <div className="flex items-center mb-2">
              <div className="bg-teal-500 w-5 h-5 rounded-full circle relative"></div>
              <p className="pl-2">A pool of fantastic candidates</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Subscription;
