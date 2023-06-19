import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";



function Pricelisting() {
    let [coins, setCoins] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerpage = 6;
    const lastIndex = currentPage * recordsPerpage;
    const firstIndex = lastIndex - recordsPerpage;
    const records = coins != null ? coins.slice(firstIndex, lastIndex) : "";
    const npage = coins != null ? Math.ceil(coins.length / recordsPerpage) : " ";
    useEffect(() => {
        const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'bd2f912becmshc287c75fdeacdc7p1d15d5jsn97db6b6f5e12',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
        };
        fetch(url, options)
            .then(res => res.json())
            .then((data) => {
                console.log(data.data.coins);
                setCoins(data.data.coins);

            })
    }, [])
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
             month=months[i+1]
            }  
         }

        return day + " "+date1 + "th " + month + " " + year
    }
    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }


    return (
        <div>

            <h4 className='text-white'>Market today :({date} )</h4>
            <h3>Price Listing</h3>
            {records && <table className='listtable' >
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th className='align' >Price(USD)</th>
                        <th className='align' >Change(%)</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((c, i) => (<tr key={i}>
                        <td ><Link to={`/details/${c.rank-1}`}>{c.symbol}</Link></td>
                        <td>{c.name}</td>
                        <td className='spanbold align'>{Math.round(c.price * 100) / 100}</td>
                        <td className='align'>{c.change >= 0 ? <span style={{ color: "green" }}>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16" >
                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                        </svg>{c.change}</span> : <span style={{ color: "red" }}>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16" >
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>{c.change}</span>}</td>
                    </tr>))}
                </tbody>
            </table>}

            <nav className='navbtns'>
                <ul className='pagination'>
                    <button className='btn btn-outline-primary' onClick={nextPage}> Next</button>
                    <button className='btn btn-outline-primary' onClick={prePage}> Prev</button>
                </ul>
            </nav>

        </div>
    )
}

export default Pricelisting