import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const Transactions = () => {
    return (
        <>
               <Table className="mt-10 w-full bg-slate-800  rounded ">
                 
                <TableHeader className="">
                    <TableRow>
                        <TableHead className="text-2xl">
                            Ultimas transacciones
                        </TableHead>
                    </TableRow>
                    <TableRow className="">
                        <TableHead className="text-white">Name</TableHead>
                        <TableHead className="text-white">Status</TableHead>
                        <TableHead className="text-white">Date</TableHead>
                        <TableHead className="text-white">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    <TableRow className="border-b-0">
                        <TableCell className="text-white">
                            Nicolas Rojas
                        </TableCell>
                        <TableCell className="text-white flex">
                            <p className="bg-yellow-600 p-2 rounded-xl">
                                pending
                            </p>
                        </TableCell>

                        <TableCell className="text-white">
                            14.01.21
                        </TableCell>

                        <TableCell className="text-white">
                            $1.000.000
                        </TableCell>
                    </TableRow>

                    <TableRow className="border-b-0">
                        <TableCell className="text-white">
                            John
                        </TableCell>

                        <TableCell className="text-white flex">
                            <p className="bg-gray-500 p-2 rounded-xl">
                                done
                            </p>
                        </TableCell>

                        <TableCell className="text-white">
                            14.01.21
                        </TableCell>

                        <TableCell className="text-white">
                            $1.000.000
                        </TableCell>
                    </TableRow>

                    <TableRow className="">
                        <TableCell className="text-white">
                            John
                        </TableCell>

                        <TableCell className="text-white flex">
                            <p className="bg-gray-500 p-2 rounded-xl">
                                done
                            </p>
                        </TableCell>

                        <TableCell className="text-white">
                            14.01.21
                        </TableCell>

                        <TableCell className="text-white">
                            $1.000.000
                        </TableCell>
                    </TableRow>
                  
                </TableBody>
               
                </Table>
        </>
    )
}

export default Transactions