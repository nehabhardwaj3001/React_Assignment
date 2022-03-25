import axios from "axios";
import { useState, useEffect } from "react";
import "./home.css"

function Home() {
    const bestMatches = []
    // let stockWallet = ["IBM", "IBMM"];
    const [wallet, setWallet] = useState([{Symbol: "neha"}, {Symbol: "kunal"}]);
    const [term, setTerm] = useState('');
    const [info, setInfo] = useState({ bestMatches: [] });
    const [info1, setInfo1] = useState({});
    const [stock, setStock] = useState([]);
    const [display, setDisplay] = useState("none");
    const [sellQuantity, setSellQuantity] = useState(0);
    const [buyQuantity, setBuyQuantity] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [amount, setAmount] = useState(1000);
    const [price, setPrice] = useState(0.00) ;

    const handleSubmit = () => {
        axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${term}&apikey=0SL0DBPBVUIXHD42`)
            .then(res => {
                setInfo(res.data);
                console.log(res.data);
                console.log("infor", info.bestMatches.length);
            }
            )
    }
    const handleDetail = (data) => {
        // axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${data}&apikey=demo`)
        axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${data}&apikey=0SL0DBPBVUIXHD42`)
        .then(res => {
            setInfo1(res.data);
            console.log(res.data);
        }
        )

        console.log("handle detail",data);
    }

    const stockPrice = (symbol) => {
        axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=0SL0DBPBVUIXHD42`)
        .then(res => {
            // return res["Global Quote"].["05. price"];
            console.log("welcome", res.data["Global Quote"]["05. price"]);
            setPrice(res.data["Global Quote"]["05. price"]) ;
        }
        )

        console.log("stock price",price);
    }

    const storeData = (symbolName) => {
        axios.post( 'http://localhost:5000/api/stockList',  {Symbol: symbolName},
        {
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
          }).then((response) => { 
              getData();
            console.log(response)
        })
    }

    const getData = () => {
        axios.get( 'http://localhost:5000/api/stockList',
        {
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
          }).then((response) => {
            setWallet(response.data);
            console.log(response)
            console.log("data in stock ", wallet);
        })
    }

    // getData();  //to fetch data in database of stock bought previously on loading of page

    const deleteSellQuantity = (symbolName) =>{
        axios.delete( 'http://localhost:5000/api/stockList',  {Symbol: symbolName},
        {
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
          }).then((response) => { 
              getData();
            console.log(response)
        })   
    }


    return (
        <div>
            <input type='text' placeholder="IBM" onChange={(e) => setTerm(e.target.value)} />
            <button className="button" onClick={handleSubmit}>submit</button>
            {
            info.bestMatches.length > 0 ? <div>
                <h2 className="left">Search Results &#8595;</h2>
                <div className="details"  style={{"display":display}}>
                 <h2>Company Details</h2>
                   <p><span>Symbol : </span> {info1.Symbol}</p>
                   <p><span>Name : </span>{info1.Name}</p>
                   <p><span>Description : </span> {info1.Description}</p>
                </div>
                <div className="wallet">
                   
                    <h2>Stock List</h2>
                    <div className="balanceBox">
                    <h3>wallet Balance :<span className="red">{amount}</span>  </h3>
                    <h3>Stock Quantity :<span className="red"> {totalQuantity} </span></h3>
                    {/* <h3>Buy Quantity : <span className="red"> {buyQuantity} </span></h3> */}
                    {/* <h3>Sell Quantity : <span className="red"> {sellQuantity} </span></h3> */}
                    </div>
                    <input type="number"  onChange={(e) => setSellQuantity(e.target.value)
                        } placeholder="Enter quantity..." />
               <div>
               {wallet.map((element, index) => <li>
                   {element.Symbol }
                    {<button className="green" onClick={() =>{
                        stockPrice(element["1. symbol"]);         
                        setTotalQuantity(parseInt(totalQuantity) - parseInt(sellQuantity));
                        setAmount(amount + price*sellQuantity);
                     deleteSellQuantity(element.Symbol);
                        alert(`${element} sold, ${price} amount credited to wallet...`)
                        setPrice(0);
                    }}>Sell stock</button>}
                     </li> 
               
               )
                 
               }
               {/* <li> WIPRO {<button className="green" onClick={() =>{
                        setTotalQuantity(parseInt(totalQuantity) - parseInt(sellQuantity));
                        setAmount(amount + 10*sellQuantity);
                        alert('${element} sold, amount credited to wallet...')
                    }}>Sell stock</button>} </li>
              
               <li> TCS{<button className="green" onClick={() =>{
                        setTotalQuantity(parseInt(totalQuantity) - parseInt(sellQuantity));
                        setAmount(amount + 10*sellQuantity);
                        alert('${element} sold, amount credited to wallet...')
                    }}>Sell stock</button>} </li> */}
               </div>
                </div>
                {info.bestMatches.map((infos, index) => (
                    <div className="box" key={index}>
                        <div className="name" onClick={() => {
                            handleDetail(infos["1. symbol"]);
                            setDisplay("block") }
                            }>{infos["1. symbol"]}</div>
                            <div>{infos["2. name"]}</div>
                        <div>{infos["3. type"]}</div>
                        <div>{infos["4. region"]}</div>
                        <div>{infos["5. marketOpen"]}</div>
                        <div>{infos["6. marketClose"]}</div>
                        <div>{infos["7. timezone"]}</div>
                        <div>{infos["8. currency"]}</div>
                        <div>{infos["9. matchScore"]}</div>
                        <input type="number" style={{"display":display}} onChange={(e) => setBuyQuantity(e.target.value)
                        } placeholder="Enter quantity..." />
                        <button className="blue button" style={{"display":display}} onClick={() =>{
                            setStock([...stock, infos["1. symbol"]]);
                            stockPrice(infos["1. symbol"]);
                            setTotalQuantity(parseInt(totalQuantity) + parseInt(buyQuantity));
                            setAmount(amount - price*buyQuantity);

                        console.log(stock);
                        storeData(infos["1. symbol"])
                        alert( `${infos["1. symbol"]} bought,  ${price} deducted to wallet...`)
                        setPrice(0);
                        }}>add to stock</button>
                    </div>
                    
                ))}

            </div> :
                <h3>please search any term</h3>
                }
        </div>
    )
}

export default Home;