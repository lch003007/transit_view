'use client'
import { MyButton, MyText } from "@/components/MyInput";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import useApi from "@/hooks/useApi";
import { setCookie } from "cookies-next";
export default function Login() {
    const {post} = useApi()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [buttonBackground,setButtonBackground] = useState('linear-gradient(135deg, #1e90ff, #6495ed)')

    // if(getCookie('jwt'))
    //     router.push('/liveVideo')
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            
            }}
        >
            {/* 登入表單容器 */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '400px',
                    height: '500px',
                    background: 'rgba(255, 255, 255, 0.9)', // 半透明白色背景
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // 陰影效果
                    borderRadius: '15px',
                    alignItems: 'center',
                    padding: '20px',
                }}
            >
                {/* 標題 */}
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '20px',
                        color: '#333',
                    }}
                >
                    歡迎登入
                </Typography>

                {/* 帳號輸入 */}
                <Box
                    sx={{
                        width: '100%',
                        marginBottom: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                >
                    <Typography variant="body1" sx={{ color: '#555', marginBottom: '5px' }}>
                        帳號：
                    </Typography>
                    <MyText value={username} onChange={(e)=>{
                        setUsername(e.target.value)
                    }} />
                </Box>

                {/* 密碼輸入 */}
                <Box
                    sx={{
                        width: '100%',
                        marginBottom: '25px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                >
                    <Typography variant="body1" sx={{ color: '#555', marginBottom: '5px' }}>
                        密碼：
                    </Typography>
                    <MyText type="password" value={password} onChange={(e)=>{
                        setPassword(e.target.value)
                    }} />
                </Box>
                    <Box sx={{color:'red'}}>{error}</Box>
                {/* 登入按鈕 */}
                <MyButton
                    style={{
                        width: '50%',
                        padding: '10px 0',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        background:buttonBackground, // 按鈕漸層
                        color: '#fff',
                        borderRadius: '10px',
                        transition: 'all 0.3s',
                    }}
                    onMouseEnter={()=>{
                        setButtonBackground('linear-gradient(135deg, #6495ed, #1e90ff)')
                    }}
                    onMouseLeave={()=>{
                        setButtonBackground('linear-gradient(135deg, #1e90ff, #6495ed)')
                    }}
                    onClick={()=>{

                        post('auth/login',{username:username,password:password}).then(data=>{
                            if(data.success)
                            {
                                
                                setCookie('jwt',data.access_token)
                                setCookie('auth',data.auth)
                                setError('')
                                window.location.reload()
                                // router.push('/liveVideo')
                            }
                            else
                                setError(data.message)
                        })
                    }}
                >
                    登入
                </MyButton>
            </Box>
        </Box>
    );
}