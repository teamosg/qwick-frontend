import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";



const WaitListSkeleton = () => {
    const skeletonItems = Array.from({ length: 5 });

    return (
        <div className="p-0">
            <Tabs defaultValue="withdraw" className="w-full">
                {/* Withdraw Tab Skeleton */}
                <TabsContent value="withdraw" className="p-0">
                    {/* Mobile Card Skeleton */} <div className="block sm:hidden space-y-3">
                        {skeletonItems.map((_, index) => (<div
                            key={index}
                            className="bg-gray-200 dark:bg-[#3A3A3A] animate-pulse border rounded-lg p-4 shadow-sm"
                        > <div className="h-5 w-1/2 bg-gray-300 dark:bg-[#555] rounded mb-2"></div>
                            <div className="h-4 w-3/4 bg-gray-300 dark:bg-[#555] rounded mb-1"></div>
                            <div className="h-4 w-1/2 bg-gray-300 dark:bg-[#555] rounded mb-1"></div>
                            <div className="h-4 w-2/3 bg-gray-300 dark:bg-[#555] rounded mb-1"></div>
                            <div className="h-4 w-1/3 bg-gray-300 dark:bg-[#555] rounded"></div>
                        </div>
                        ))} </div>

                    {/* Desktop Table Skeleton */}
                    <div className="hidden sm:block">
                        <div className="p-1">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-[#f5f5f5] text-gray-900 dark:bg-[#2E2E2E] dark:text-[#fff]">
                                        {["Name", "Email", "Status", "Actions"].map((head, i) => (
                                            <TableHead key={i} className="py-4 px-6 font-medium">
                                                {head}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {skeletonItems.map((_, index) => (
                                        <TableRow key={index} className="hover:bg-white dark:hover:bg-[#2E2E2E]">
                                            {Array.from({ length: 4 }).map((_, i) => (
                                                <TableCell key={i} className="py-4 px-6">
                                                    <div className="h-4 w-24 bg-gray-300 dark:bg-[#555] rounded animate-pulse"></div>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </TabsContent>

                {/* Deposit Tab Skeleton */}
                <TabsContent value="deposit" className="mt-6">
                    <div className="text-center py-8 text-gray-400 dark:text-[#888] animate-pulse">
                        Loading deposit transactions...
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default WaitListSkeleton;
