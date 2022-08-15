import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {emailVerifyUpdate} from './../../src/store/profile/index'
const VerifyEmail = () =>{
    const history = useHistory();
    const dispatch=useDispatch();
    useEffect(()=>{
        let id =  atob(history.location.pathname.split('/')[1])
        dispatch(emailVerifyUpdate({id:id,data:{validateEmail:true}})).then((res)=>{
          
            if(res?.data?.data?.role==='recruiter'){
                history.push('/partnersSignin')
            }else{
                history.push('/signin')
            }
        })
    },[])
    return(<div></div>)
} 
export default VerifyEmail