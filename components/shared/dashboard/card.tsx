import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "@/components/ui/card"
import { MdSupervisedUserCircle } from "react-icons/md";

interface CardItem {
    id: number;
    title: string;
    number: number;
    change: number;
  }

interface CardsProps {
    item: CardItem;
}
  
const Cards:React.FC<CardsProps> = ({item}) =>{
    return (
        <>
             <div className="p-6 bg-slate-800 rounded-lg shadow  w-full   ">
                <div className="w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white flex gap-2 "> <MdSupervisedUserCircle className="mt-2 h-f"/> {item.title} </h5>
                </div>
                <p className="font-normal  dark:text-gray-400 text-white ml-8 mb-2">{item.number} </p>
              
                <span className="text-white  ml-8 flex pr-20  "> 
                        <span className= {` mr-3 ${item.change > 0 ? 'text-green-500' : 'text-red-500'} ` }>
                        {item.change}%
                        </span>{" "}
                        { item.change > 0 ? "más" : "menos" } que la semana anterior
                </span>
            </div>
            

           
        </>
    )
}

export default Cards