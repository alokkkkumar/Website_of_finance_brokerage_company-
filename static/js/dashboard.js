'use strict';

const o = React.createElement;

class LikeButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          newdata:"AAT",
          tsdata:[],
          query:"AAT",
          loaded:false,
          err:null,
          quantity:0,
          stocktosell:"",
        };
        this.fetchdata=this.fetchdata.bind(this)
        // this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
      }
      

      // handleChange(e){
      //   this.setState({
      //     ...this.state,
      //     query:e,
      //   }
      //   )

      
      // }


      handleSubmit(p){

        this.setState({
          ...this.state,
          query:this.state.newdata,
        }
        )
        this.fetchdata();
        


        
      }
      
      
      //`https://api.twelvedata.com/time_series?symbol=${this.state.query_symbol}&interval=1min&apikey=4e444c14174747a9a3817ddcd5b050f6`
      componentWillMount() {
        this.fetchdata();
      }


      fetchdata(){
        fetch(`https://api.twelvedata.com/time_series?symbol=${this.state.newdata}&interval=1min&apikey=4e444c14174747a9a3817ddcd5b050f6`)
          .then(response => response.json())
          .then(data => {
            
            console.log(data);
            this.setState({
                ...this.state,loaded:true,
                tsdata:data,
            }
            
              
              
            )
            if(this.state.tsdata.status!=='ok'){
              this.setState({ ...this.state,error:error,loaded:false});
            console.log("LATEST ERROR!!",error);
            }
            
            

          })
          .catch(error => {
            this.setState({ ...this.state,error:error,loaded:false});
            console.log(error);
          });

          

          // let stockname= this.state.tsdata.meta.symbol;
          // console.log(stockname)

         

      } 

  render() {
    if(!this.state.loaded){
      return(
        <div>
        <h1>LOADING!!</h1>

      </div>
      )
    }

    
    if(this.state.err){
      return(
        <div>
          <h1>THERE IS AN ERROR TRY TO SEARCH CORRECT SYMBOL!!</h1>
        </div>
      )
    }
    if (this.state.loaded) {
      return (
        <div className="bg-neutral-900 flex pt-[5px]">
                    <h1 className="sm:text-[26px] text-[20px] font-poppins  text-white"> Search : </h1>
                        <input type="text" className="search-box ml-[3%] border-spacing-1 " placeholder="STOCK SYMBOL.." onChange={e => this.setState({...this.state,newdata:e.target.value,loaded:true}) }></input>

                        <button className="bg-white  ml-[7%] pr-[1%] pl-[1%] rounded-xl" onClick={this.handleSubmit} > Submit</button>

                         


                            <h1>STOCK DETAILS:</h1>
                            <h3>
                              SYMBOL:{this.state.tsdata.meta.symbol}
                            </h3>
                            <h3>
                              CURRENCY:{this.state.tsdata.meta.currency}
                            </h3>
                            <h3>
                              EXCHANGE:{this.state.tsdata.meta.exchange}
                            </h3>
                            <h3>
                              MIC CODE:{this.state.tsdata.meta.mic_code}
                            </h3>
                            <h3>
                              TYPE:{this.state.tsdata.meta.type}
                            </h3>
                        <input type="text" className="search-box ml-[3%] border-spacing-1 " placeholder="Quantity to be bought" onChange={e => this.setState({...this.state,quantity:e.target.value,loaded:true}) }></input>

                            <a href={`/buy/${this.state.quantity}/${this.state.tsdata.meta.symbol}/${Math.ceil(100000*(this.state.tsdata.values[0].high))}`}><button>BUY</button></a>
                            {/* <a href="./buy"+"" */}
                            <br></br>
                            <input type="text" className="search-box ml-[3%] border-spacing-1 " placeholder="STOCK TO BE SOLD" onChange={e => this.setState({...this.state,stocktosell:e.target.value,loaded:true})}></input>
                            <a href={`/sell/${this.state.stocktosell}`}><button >SELL</button></a>

                            <div id="userdashboarddata">
                                    <h4 id="userdashboarditems2">DATE & TIME:</h4>
                                    <h4 id="userdashboarditems">OPEN:</h4>
                                    <h4 id="userdashboarditems">CLOSE:</h4>
                                    <h4 id="userdashboarditems">HIGH:</h4>
                                    <h4 id="userdashboarditems">LOW:</h4>
                                    <h4 id="userdashboarditems"> VOLUME:</h4>
                                    </div>
                            <ul >
                                {this.state.tsdata.values.map((nav,index) => (
                                  
                                    

                                    <div id="userdashboarddata" key={index}>
                                    <h4 >{nav.datetime}</h4>
                                    <h4 id="userdashboarditems">{nav.open}</h4>
                                    <h4 id="userdashboarditems">{nav.close}</h4>
                                    <h4 id="userdashboarditems">{nav.high}</h4>
                                    <h4 id="userdashboarditems">{nav.low}</h4>
                                    <h4 id="userdashboarditems">{nav.volume}</h4>
                                    </div>

                                  
                                ))}
                              </ul>

                    </div>
      )
    }

    
  }
}
 
const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<LikeButton/>, domContainer);




// class MyComponent extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         data: null,
//         loading: true,
//         error: null
//       };
//     }
  
//     componentDidMount() {
//       fetch('https://api.example.com/data')
//         .then(response => response.json())
//         .then(data => {
//           this.setState({ data, loading: false });
//         })
//         .catch(error => {
//           this.setState({ error, loading: false });
//         });
//     }
  
//     render() {
//       const { data, loading, error } = this.state;
  
//       if (loading) {
//         return <div>Loading...</div>;
//       }
  
//       if (error) {
//         return <div>Error: {error.message}</div>;
//       }
  
//       return (
//         <div>
//           <h1>My Component</h1>
//           {data && (
//             <ul>
//               {data.map(item => (
//                 <li key={item.id}>{item.name}</li>
//               ))}
//             </ul>
//           )}
//         </div>
//       );
//     }
//   }
  