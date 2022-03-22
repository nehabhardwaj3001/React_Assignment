import axios from "axios";
import { useState, useEffect } from "react";
import "./home.css"

function Home() {
    const bestMatches = []
    // const name="2. name"
    const [term, setTerm] = useState('');
    const [info, setInfo] = useState({ bestMatches: [] });
    const [info1, setInfo1] = useState({});
    const [stock, setStock] = useState([]);
    const [display, setDisplay] = useState("none");

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

    return (
        <div>
            <input type='text' placeholder="IBM" onChange={(e) => setTerm(e.target.value)} />
            <button onClick={handleSubmit}>submit</button>
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
               {/* {stock.forEach(element => <p>{element} </p>)} */}
               <p>stock1</p>
               <p>stock2</p>
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
                        <button className="blue" style={{"display":display}} onClick={() =>{setStock([...stock, infos["1. symbol"]]);console.log(stock);
                        alert( `${infos["1. symbol"]} added to Stock wallet...`)}}>add to stock</button>
                    </div>
                    
                ))}

            </div> :
                <h3>please search any term</h3>
                }
        </div>
    )
}

export default Home;