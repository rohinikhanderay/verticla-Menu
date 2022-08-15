import React, { useRef } from 'react';

export const Opts = (props) => {
    return (
        <select onChange={props.onChange} onBlur={props.onBlur} ref={props.ref} class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option value="" selected disabled hidden>Select City</option>
            {props.options ? 
                props.options.map((x) => {
                    return (
                        <option class="text-gray-700 block px-4 py-2 text-sm" key={x} value={x}>{x}</option>
                    )
                })
                : null}
            
        </select>
    )
};