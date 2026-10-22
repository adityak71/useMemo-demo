import "./index.css"
import products from "./data/products.js";
import Products from "./components/Products.jsx"
import { useMemo, useState } from "react";

const App = () => {

  const [count, setCount] = useState(0);

  const totalSum = useMemo(()=>{
    console.log("Memo is running");

    return products.reduce((sum,prod)=>{
      return sum + prod.price
    },0);

  },[]);

  // dependencies array may be [a,b] [a,b,c] [a,b,c,d] etc. 
  // if any of the value in the dependencies array changes then useMemo will run again and recalculate the value of totalSum. 
  // If the dependencies array is empty then useMemo will run only once 
  // when the component is mounted and will not run again on re-rendering of the component.
  // [] empty dependencies array means that memo runs only one time when component mount.
  

  return (
    <div className="min-h-screen w-full">
      <div>
        <h1 className="text-5xl w-full bg-blue-300 py-4 text-center">Product Sum Calculator</h1>
      </div>

      <div className="py-3 flex justify-center bg-amber-400 text-3xl">
        <h2>Total Products Sum : ${totalSum}</h2>
      </div>


      <div className="flex justify-center items-center mt-8 w-3/4 mx-auto gap-2">
        {
          products.map((prod)=>(
            <Products product={prod} key={prod.id} />
          ))
        }
      </div>

        {/* Count Incrementer for testing useMemo behavior */}
        {/* useState will be re render the webpage and useMemo will not run again because products array is not changing */}
      <div className="flex justify-center items-center mt-8 w-3/4 mx-auto gap-2">
        <button className="bg-blue-400 px-4 py-2 rounded-lg text-white text-xl" onClick={()=>setCount(count+1)}>Increment</button>
        <h2 className="text-3xl">Count : {count}</h2>
      </div>
    </div>
  )
}

export default App
