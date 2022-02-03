import React,{useState, useEffect} from 'react'
// import firebaseDB from './firebase'
import './index.css'

const AddItem = () => {
    const [data,setData] = useState({
        itemName : '',
        itemCost : '',
        image : ''
    })
    const {itemName,itemCost,image} = {...data}
    var changeHandler = e =>{
        setData({...data,[e.target.name]: e.target.value})
    }

    useEffect(() => {
        localStorage.setItem('form',JSON.stringify(data))
    }, [data])

    const submitHandler = async e =>{
        e.preventDefault()
        console.log(localStorage.getItem('form'))
        const record = await fetch('http://localhost:8000/admin/addItem',{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "itemName" : itemName,
                "itemCost" : itemCost,
                "image" : image
            })
        })
        console.log(record)
        console.log(data)

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
            }}>Add Items </h3>
            <form method='POST' className='form-vertical' onSubmit={submitHandler} autoComplete='off'>
                <div className='form-group'>
                    <label style={{
                        padding : '5px'
                    }} className='control-label col-sm-4'>itemName : </label>
                    <div className='col-sm-11'>
                        <input type='text' placeholder='itemName' name='itemName' 
                         className='form-control' onChange={changeHandler} value={itemName}></input><br/>
                    </div>
                </div>

                <div className='form-group'>
                    <label style={{
                        padding : '5px'
                    }} className='control-label col-sm-4'>itemCost : </label>
                    <div className='col-sm-11'>
                        <input type='text' placeholder='itemCost' name='itemCost' value={itemCost}
                         className='form-control' onChange={changeHandler}></input><br/>
                    </div>
                </div>

                <div className='form-group'>
                    <label style={{
                        padding : '5px'
                    }} className='control-label col-sm-4'>image : </label>
                    <div className='col-sm-11'>
                        <input type='text' placeholder='image' name='image' value={image}
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

export default AddItem
