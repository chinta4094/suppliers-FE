import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Login = () => {

    const navigate = useNavigate()

    const [data,setData] = useState({
        email : '',
        password : ''
    })
    const [user,setUser] = useState([])
    const [logout,setLogout] = useState([])
    const {email,password} = {...data}
    var changeHandler = e =>{
        setData({...data,[e.target.name]: e.target.value})
    }

    React.useEffect( async() => {
        localStorage.setItem('form',JSON.stringify(data))
        const name = await fetch('http://localhost:8000/user/userDetails')
        
        const findName = await name.json()
        if(findName.message == "success"){
            // setData(findName.details)
            setUser(findName.details)
        }else{
            console.log("Unable To Fetch Data")
        }
    }, [])

    

    const submitHandler = async e =>{
        e.preventDefault()
        const record = await fetch(`http://localhost:8000/user/login/${email}`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "email" : email,
                "password" : password
            })
        })

        const rec = await record.json()
        if(rec.details === 'success'){
            await window.alert('Login Success')
            navigate('/addToCart')
            console.log(rec)
        }
        else if(rec.status == 204){
            await window.alert('Logout First ... ')
            navigate('/login')
        }
        else{
            window.alert('Pls SignUp First...')
            navigate('/')
        }

    }

    const logoutUser = async () => {
        const dele = await fetch('http://localhost:8000/user/logout', { method: 'DELETE' })
        console.log("LOGOUT")
        const del = await dele.json()
        if(del.details == "success"){
            window.alert("Succesfully Logged Out...!")
            navigate('/')
        }else{
            window.alert("Login Available")
        }
    }

    

    return (
        <div >
            
            <div style={{ float : 'left',  maxWidth : '750px', color : 'white' }}>
                <div style={{ float : 'left' }}>
                    <img src='./images/tent.png' height={100} width={100}></img>
                </div>
                <div style={{
                    float : 'left',
                    width : '200px',
                    marginTop : '50px',
                    fontFamily : 'cursive',
                    fontWeight : 'bold'
                }}>
                <p style={{ fontSize : '15px', color : 'black' }}>Srinivasa Suppliers</p>
                </div>
                <div  style={{ float : 'left', margin : '50px',fontSize : '15px' }}>
                    <img src='./images/1.png' width={600} height={400} ></img>
                </div>
            </div>
            <div style={{ overflow : 'hidden'}}>
            <div style={{margin: '40px',float : 'left'}}>
                <h3 style={{ color : 'black',width : '200px',fontSize : '15px',
                fontFamily : 'cursive',textAlign : 'center',
                fontWeight : 'bold'}}>{user.map(item => <p key={item}>Hi {item.firstName}{item.lastName}</p>)}</h3>
            </div>
            <div style={{ float : 'right', overflow : 'hidden'}}>
            <button type='submit' style={{
                        padding : '10px 15px 10px 15px',
                        margin : '20px 50px',
                        backgroundColor : 'rgba(0,100,20,0.7)',
                        color : 'white',
                        borderRadius : '10px',
                        maxWidth : '100px',
                        fontFamily : 'cursive',
                    }} value='submit' onClick={logoutUser}>LOGOUT</button>
                </div>
            </div>
            <div className='container' className='col-sm-11' style={
            {   
                maxWidth : 500, 
                maxHeight : 500,
                float: 'right',
                marginRight : '50px',
                marginTop : '50px',
                padding : '20px 50px 20px 50px', 
                backgroundColor : 'rgba(0,100,20,0.7)',
                color : 'orange',
                borderRadius : '10px',
                // marginTop : '100px',
                fontFamily : 'cursive'
            }}>
            <h3 style={{
                textAlign : 'center',
                padding : '10px'
            }}>Login Form</h3>
            <form method='POST' className='form-vertical' onSubmit={submitHandler} autoComplete='off'>

                <div className='form-group'>
                    <label style={{
                        padding : '5px'
                    }} className='control-label col-sm-4'>Email : </label>
                    <div className='col-sm-11'>
                        <input type='text' placeholder='Email' name='email' value={email}
                         className='form-control' onChange={changeHandler}></input><br/>
                    </div>
                </div>

                <div className='form-group'>
                    <label style={{
                        padding : '5px'
                    }} className='control-label col-sm-4'>Password : </label>
                    <div className='col-sm-11'>
                        <input type='password' placeholder='Password' name='password' value={password}
                         className='form-control' onChange={changeHandler}></input><br/>
                    </div>
                </div>

                <center>
                <div>
                    <button type='submit' style={{
                        padding : '10px 15px 10px 15px',
                        backgroundColor : 'green',
                        color : 'white',
                        borderRadius : '10px',
                        fontFamily : 'cursive'
                    }} className='control-label col-sm-4' value='submit'>SUBMIT</button>
                </div>
                </center>
            </form>
        </div>
        </div>
    )
}

export default Login
