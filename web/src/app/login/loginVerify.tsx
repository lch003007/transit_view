'use client'
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";


export default function LoginVerify({child}:any){
    const accessToken = getCookie('jwt')
    const router = useRouter()
    if(!accessToken){
      router.push('/login')
    }
    return <>{accessToken?{child}:<></>}</>
}
