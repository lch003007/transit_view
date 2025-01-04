export default function Loading(){
    return <div style={{display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
        
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{position:'absolute',color:'white',fontSize:'30px',
fontWeight:'bold',
textShadow:'10px 10px 10px rgba(0, 0, 0, 5)'
            
        }}>Loading</div>
            <img src="/loading.svg" style={{height:'400px',width:'400px'}}/>
            
            </div>
    </div>
}