import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";



const WaitListSkeleton = () => {
    const skeletonItems = Array.from({ length: 5 });

    return (
        <div className="p-0">
            <Tabs defaultValue="withdraw" className="w-full">
                {/* Withdraw Tab Skeleton */}
                <TabsContent value="withdraw" className="p-0">
                    {/* Mobile Card Skeleton */}
                    <div className="block sm:hidden space-y-3">
                        {skeletonItems.map((_, index) => (
                            <div
                                key={index}
                                className="bg-card border border-border rounded-lg p-4 shadow-sm space-y-2"
                            >
                                <Skeleton className="h-5 w-1/2" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-1/3" />
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table Skeleton */}
                    <div className="hidden sm:block">
                        <div className="p-1">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50 text-gray-900 dark:bg-zinc-800 dark:text-white">
                                        {["Name", "Email", "Status", "Actions"].map((head, i) => (
                                            <TableHead key={i} className="py-4 px-6 font-medium">
                                                {head}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {skeletonItems.map((_, index) => (
                                        <TableRow key={index} className="hover:bg-white dark:hover:bg-zinc-800">
                                            {Array.from({ length: 4 }).map((_, i) => (
                                                <TableCell key={i} className="py-4 px-6">
                                                    <Skeleton className="h-4 w-24" />
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
                    <div className="text-center py-8 text-muted-foreground animate-pulse">
                        Loading deposit transactions...
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default WaitListSkeleton;
