import axios from 'axios'
import React,{useState} from 'react'
// import firebaseDB from './firebase'
import './index.css'

const Home = () => {
    const [data,setData] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        confirmPassword : ''
    })
    const array = []
    const {firstName,lastName,email,password,confirmPassword} = {...data}
    var changeHandler = e =>{
        setData({...data,[e.target.name]: e.target.value})
    }

    React.useEffect(() => {
        localStorage.setItem('form',JSON.stringify(data))
    }, [data])

    const submitHandler = async e =>{
        e.preventDefault()
        console.log(localStorage.getItem('form'))
        const record = await fetch('https://srinivasa-suppliers.herokuapp.com/user/signup',{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "firstName" : firstName,
                "lastName" : lastName,
                "email" : email,
                "password" : password,
                "confirmPassword" : confirmPassword
            })
        })
        console.log(record)

    }

    return (
        <div >
            <div style={{ float : 'left', maxWidth : '750px', color : 'white' }}>
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
                <div  style={{ float : 'left', margin : '50px' }}>
                    <img src='./images/1.png' width={600} height={400} ></img>
                </div>
            </div>
            
            
            <div className='container' className='col-sm-11' style={
            {   
                maxWidth : 500, 
                height : '620px',
                float: 'right',
                marginRight : '50px',
                marginTop : '2px',
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
            }}>Registration Form</h3>
            <form method='POST' className='form-vertical' onSubmit={submitHandler} autoComplete='off'>
                <div className='form-group'>
                    <label style={{
                        padding : '5px'
                    }} className='control-label col-sm-4'>First Name : </label>
                    <div className='col-sm-11'>
                        <input type='text' placeholder='First Name' name='firstName' 
                         className='form-control' onChange={changeHandler} value={firstName}></input><br/>
                    </div>
                </div>

                <div className='form-group'>
                    <label style={{
                        padding : '5px'
                    }} className='control-label col-sm-4'>Last Name : </label>
                    <div className='col-sm-11'>
                        <input type='text' placeholder='Last Name' name='lastName' value={lastName}
                         className='form-control' onChange={changeHandler}></input><br/>
                    </div>
                </div>

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

                <div className='form-group'>
                    <label style={{
                        padding : '5px'
                    }} className='control-label col-sm-8'>Confirm Password : </label>
                    <div className='col-sm-11'>
                        <input type='password' placeholder='Confirm Password' name='confirmPassword' value={confirmPassword}
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

export default Home
