import React, { useState } from 'react'

const Cart = () => {

    const [data,setData] = useState([])
    const [item,setItem] = useState([])
    React.useEffect( async() => {
        
        const record = await fetch('http://localhost:8000/user/totalBill')
        
        const rec = await record.json()
        if(rec.details === "success"){
            setData([rec])
        }else{
            console.log("Failed")
        }

        const itemRecord = await fetch('http://localhost:8000/user/cartDetails')

        const rec1 = await itemRecord.json()
        setItem(rec1)
        // console.log(rec1)

    },[])
    var itemStyle = {maxWidth : '200px',padding : '10px',margin: '20px',border : '2px solid black',borderRadius : '10px',textAlign : 'center',fontWeight : 'bold'}
    var itemDiv = {maxwidth : '800px',margin: '20px',float : 'left'}
    var itemPara = {textAlign : 'center',border : '2px solid black',padding : '12px',fontSize : '18px',fontWeight : 'bold',borderRadius : '10px'}
    return(
        <div>
            <div style={{ float : 'left',  maxWidth : '590px', color : 'white',border : '2px solid black' }}>
                <div style={{ float : 'left' }}>
                    <img src='./images/tent.png' height={100} width={100}></img>
                </div>
                <div style={{
                    float : 'left',
                    width : '200px',
                    marginTop : '50px',
                    fontFamily : 'cursive',
                    fontWeight : 'bold',
                    border : '2px solid black'
                }}>
                <p style={{ fontSize : '15px', color : 'black' }}>Srinivasa Suppliers</p>
                </div>
                <div  style={{ float : 'left',fontSize : '15px',border : '2px solid black' }}>
                    <img src='./images/1.png' width={400} height={400} ></img>
                </div>
            </div>
            <div style={{border : '2px solid black',margin: '20px',overflow : 'hidden'}}>
                <div style={itemDiv}>
                    <p style={itemPara}>NAME</p>
                    {item.map(items => <p style={itemStyle} key={items.id}>{items.itemName}</p>)}
                </div>
                <div style={itemDiv}>
                    <p style={itemPara}>COST</p>
                    {item.map(items => <p style={itemStyle} key={items.id}>{items.itemCost}</p>)}
                </div>
                <div style={itemDiv}>
                    <p style={itemPara}>QUANTITY</p>
                    {item.map(items => <p style={itemStyle} key={items.id}>{items.quantity}</p>)}
                    <p style={itemPara}>Final Amount : </p>
                </div>
                <div style={itemDiv}>
                    <p style={itemPara}>TOTAL</p>
                    {item.map(items => <p style={itemStyle} key={items.id}>{items.total}</p>)}
                    {data.map(items => <p style={itemStyle} key={items.id}>{items.finalAmount}</p>)}
                </div>
                
            </div>
        </div>
    )
}

export default Cart