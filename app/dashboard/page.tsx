import Chart from "@/components/chart/Chart"
import Rightbar from "@/components/rightbar/Rightbar"
import Cards from "@/components/shared/dashboard/card"
import Transactions from "@/components/transactions"
import { cards } from "@/lib/data"

export default function page () {
    return (
        <div className="flex  mt-10 gap-20   ">
                <div className="flex gap-10  w-full">      
                    <div className=" flex w-3/4 flex-col  ">
                           <div className="w-full flex justify-between gap-10">
                            {cards.map((item)=>(
                                    <p>
                                        <Cards item={item} key={item.id}/>
                                    </p>
                                ))}
                           </div>
                            <Transactions/>
                           <Chart/>
                    </div>
                       
                    <div className="w-1/4 ">
                        <Rightbar/>
                    </div>
                </div>
                
        </div>
    )
}