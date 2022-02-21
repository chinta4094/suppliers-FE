import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading'

const Item = () => {
    const [data,setData] = useState([])
    const [user,setUser] = useState([])
    const [loading,setLoading] = useState(false)
    const [val,setVal] = useState({
        quantity : ''
    })
    const {quantity} = {...val}
    var changeHandler = e =>{
        setVal({...val,[e.target.name]: e.target.value})
    }

    const navi = useNavigate()
    React.useEffect( async() => {
        localStorage.setItem('form',JSON.stringify(data))
        const name = await fetch('https://srinivasa-suppliers.herokuapp.com/user/userDetails')
        
        const findName = await name.json()
        if(findName.message == "success"){
            setUser(findName.details)
        }else{
            window.alert("LOGIN FIRST")
            navi('/login')
        }

        await fetch('https://srinivasa-suppliers.herokuapp.com/user/getItems')
        .then(response => response.json())
        .then(json => setData(json));
        setLoading(true)
    }, [])

    const addItems = async (itemId,value) => {
        const record = await fetch(`https://srinivasa-suppliers.herokuapp.com/user/addToCart/${itemId}/${value}`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "email" : user[0].email,
                "itemName" : data[0].itemName,
                "itemCost" : data[0].itemCost,
                "quantity" : parseInt(quantity),
                "total" : data[0].itemCost * parseInt(quantity)
            })
        })

        const rec = await record.json()
        if(rec.details === 'success'){
            toast.success("Item Add To Cart Successful",{
                autoClose: 1000
            });
        }
    }

    const submitHere = async () => {
        const record = await fetch(`https://srinivasa-suppliers.herokuapp.com/user/totalAmount`,{
            method : "POST",
        })

        const rec = await record.json()
        if(rec.details === 'success'){
            window.alert("Successfully Add To Cart")
            navi('/cartDetails')
        }
    }
    
    return(
        <div>
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
            <div style={{margin: '40px 40px 0px 200px',float : 'right'}}>
                <h3 style={{ color : 'black',width : '200px',fontSize : '15px',
                fontFamily : 'cursive',textAlign : 'center',
                fontWeight : 'bold'}}>{user.map(item => <p key={item}>Hi {item.firstName}{item.lastName}</p>)}</h3>
            </div>
                <div>
                { data.map(item => 
                <div key={item.id} style={{overflow : 'hidden', float : 'left', borderRadius : '10px', margin : '15px 0px 0px 15px',border : '2px solid black',padding : '10px'}}>
                    <div style={{ overflow: 'hidden'}}>
                        <img src={require(`./images/${item.image}`)} height={150} width={150}></img>
                    </div>
                    <div style={{maxWidth : '100px',
                        fontFamily : 'cursive', marginLeft : '25px' ,textAlign : 'center'}}>{item.itemName}</div>
                    <input style={{maxWidth : '50px',borderBottom : '2px solid black'}} name='quantity' onChange={changeHandler} ></input>
                    <button type='submit' style={{
                        backgroundColor : 'green',
                        color : 'white',
                        borderRadius : '10px',
                        fontFamily : 'cursive',
                        margin : '10px 0px 0px 50px'
                    }} className='control-label col-sm-4' value='submit' onClick={() => addItems(item.id,quantity)}>ADD</button>
                    
                    <ToastContainer />
                </div>)}
                </div>
            <div>
            <button type='submit' style={{
                        float : 'right',
                        backgroundColor : 'green',
                        color : 'white',
                        borderRadius : '10px',
                        fontFamily : 'cursive',
                        margin : '10px 250px 10px 0px',
                        padding : '5px'
                    }} className='control-label ' value='submit' onClick={submitHere} >SUBMIT</button>
            </div>
        </div>
    )
}

export default Item