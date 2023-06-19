import React, { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

function Details() {
  let id=useParams();
  let [coinsdetails,setCoinsdetails]=useState(null);
  useEffect(()=>{
    const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bd2f912becmshc287c75fdeacdc7p1d15d5jsn97db6b6f5e12',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};
fetch(url,options)
.then(res=>res.json())
.then((data)=>{
    console.log(data.data.coins);
    let coindetails=data.data.coins;
    console.log(id.id);
    console.log(coindetails[id.id]);
    setCoinsdetails(coindetails[id.id]);
})
  },[])
  let date = finddate();
    function finddate() {
        let date = new Date();
        let day=date.getDay()
        let date1 = date.getDate();
        let month = date.getMonth()
        let year = date.getFullYear()
        let days=["mon","tues","wed","thurs","fri","sat","sun"]
        for (let i = 0; i < days.length; i++) {
           if(i+1===day){
            day=days[i]
           }  
        }
        let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        for (let i = 0; i < months.length; i++) {
            if(i+1===month){
             month=months[i]
            }  
         }
        return day + " "+date1 + "th " + month + " " + year
    }
  return (
    <div>
      <h4 className='text-white'>Market today :({date} )</h4>
        <h3>details:</h3>
        {coinsdetails && <table className='tabledetails'>
          <tr>
            <td>
              <span>Symbol:</span> <br />
              <span className='spanbold'>{coinsdetails.symbol}</span>
            </td>
            <td>
              <span>Name:</span> <br />
              <span className='spanbold'>{coinsdetails.name}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Price(USD):</span> <br />
              <span className='spanbold'>{Math.round(coinsdetails.price*100)/100}</span>
            </td>
            <td>
              <span>Change:</span> <br />
              <span className='spanbold'>{coinsdetails.change >= 0 ? <span style={{ color: "green" }}>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16" >
                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                        </svg>{coinsdetails.change}</span> : <span style={{ color: "red" }}>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16" >
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>{coinsdetails.change}</span>}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Market Cap (USD):</span> <br />
              <span className='spanbold'>{new Intl.NumberFormat('en-US').format(coinsdetails.marketCap)}</span>
            </td>
            <td>
              <span>Rank:</span> <br />
              <span className='spanbold'>{coinsdetails.rank}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>24 Hours Volume:</span> <br />
              <span className='spanbold' >{new Intl.NumberFormat('en-US').format(coinsdetails.listedAt)}</span>
            </td>
            <td>
              <span></span> <br />
              <span></span>
            </td>
          </tr>
        </table> }
        <div className='btnback'>
          <Link to="/"><button className='btn btn-primary'>Back to list</button></Link>
        </div>
    </div>
  )
}

export default Details