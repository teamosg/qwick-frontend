import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyEarnings } from "@/hooks/earnings.hook";
import { ExternalLink, DollarSign, Calendar, TrendingUp, Hash } from "lucide-react";
import { format } from "date-fns";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const ProfileMyEarnings = () => {
    const { data: earnings, isLoading } = useGetMyEarnings();

    const getStatusBadge = (status) => {
        const statusType = status?.toLowerCase() || "pending";
        const variants = {
            pending: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
            approved: "bg-[#002822]/10 text-[#002822] border-[#002822]/20 dark:bg-[#002822]/20 dark:text-[#002822] dark:border-[#002822]/30",
            rejected: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
        };

        return (
            <Badge
                variant="outline"
                className={`${variants[statusType] || variants.pending} rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize`}
            >
                {status}
            </Badge>
        );
    };

    const getImageUrl = (path) => {
        if (!path) return "/submission.png";
        if (path.startsWith("http")) return path;
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://darrenchua.softvencealpha.com/api";
        const origin = baseUrl.replace(/\/api$/, "");
        return `${origin}${path}`;
    };

    const totalEarnings = earnings?.reduce((sum, item) => sum + parseFloat(item.payout || 0), 0).toFixed(2);

    if (isLoading) {
        return (
            <div className="p-4 sm:p-6 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-16 w-full sm:w-40 rounded-xl" />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-20 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-0 sm:p-6 space-y-6">
            {/* Header & Stats */}
            <div className="p-4 sm:p-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        My Earnings
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                        Track your campaign rewards and payout status.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-[#002822]/5 dark:bg-[#002822]/10 px-4 py-3 rounded-xl border border-[#002822]/10 dark:border-[#002822]/20 w-full sm:w-auto">
                    <div className="p-2 bg-[#002822]/10 dark:bg-[#002822]/20 rounded-lg">
                        <DollarSign className="h-5 w-5 text-[#002822]" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-[#002822]/70">Total Balance</p>
                        <p className="text-lg font-bold text-[#002822] dark:text-[#002822] leading-none">
                            ${totalEarnings}
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile View (Cards) - Hidden on desktop */}
            <div className="block lg:hidden space-y-4 px-4 sm:px-0">
                {!earnings || earnings.length === 0 ? (
                    <div className="py-12 text-center text-gray-500 border-2 border-dashed rounded-xl">
                        No earnings recorded.
                    </div>
                ) : (
                    earnings.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800 border dark:border-zinc-700 shrink-0">
                                    <img
                                        src={getImageUrl(item.file)}
                                        className="h-full w-full object-cover"
                                        alt=""
                                        onError={(e) => { e.target.src = "/submission.png"; }}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                                            <Hash className="h-3 w-3" /> {item.campaign}
                                        </span>
                                        {getStatusBadge(item.status)}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-lg text-[#002822] dark:text-[#002822]">${item.payout}</span>
                                        <div className="flex gap-2">
                                            {item.youtube_link && <a href={item.youtube_link} target="_blank" rel="noreferrer"><FaYoutube className="text-red-600 size-4" /></a>}
                                            {item.tiktok_link && <a href={item.tiktok_link} target="_blank" rel="noreferrer"><FaTiktok className="text-black dark:text-white size-4" /></a>}
                                            {item.instagram_link && <a href={item.instagram_link} target="_blank" rel="noreferrer"><FaInstagram className="text-pink-600 size-4" /></a>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100 dark:border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-3.5 w-3.5 text-gray-400" />
                                    <span className="text-xs text-gray-600 dark:text-zinc-400">{item.views.toLocaleString()} Views</span>
                                </div>
                                <div className="flex items-center gap-2 justify-end">
                                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                    <span className="text-xs text-gray-600 dark:text-zinc-400">{format(new Date(item.created_at), "MMM d, yyyy")}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Desktop View (Table) - Hidden on mobile */}
            <div className="hidden lg:block bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-x-auto shadow-sm">
                <Table className="min-w-[800px] lg:min-w-full">
                    <TableHeader className="bg-gray-50 dark:bg-zinc-800/50">
                        <TableRow>
                            <TableHead className="w-[80px]">Media</TableHead>
                            <TableHead>Campaign ID</TableHead>
                            <TableHead>Platform</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>
                                <div className="flex items-center gap-1">
                                    <TrendingUp className="h-3.5 w-3.5" />
                                    Views
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5" />
                                    Date
                                </div>
                            </TableHead>
                            <TableHead className="text-right">Payout</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!earnings || earnings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-48 text-center text-gray-500">
                                    No earnings found
                                </TableCell>
                            </TableRow>
                        ) : (
                            earnings.map((item) => (
                                <TableRow key={item.id} className="group hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                    <TableCell>
                                        <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-100 dark:bg-zinc-800 border dark:border-zinc-700">
                                            <img
                                                src={getImageUrl(item.file)}
                                                className="h-full w-full object-cover"
                                                alt=""
                                                onError={(e) => { e.target.src = "/submission.png"; }}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-900 dark:text-white">
                                        #{item.campaign}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1.5">
                                            {item.youtube_link && (
                                                <div className="p-1.5 bg-red-50 dark:bg-red-900/20 rounded-md">
                                                    <FaYoutube className="text-red-600 size-3.5" />
                                                </div>
                                            )}
                                            {item.tiktok_link && (
                                                <div className="p-1.5 bg-gray-100 dark:bg-zinc-800 rounded-md">
                                                    <FaTiktok className="text-black dark:text-white size-3.5" />
                                                </div>
                                            )}
                                            {item.instagram_link && (
                                                <div className="p-1.5 bg-pink-50 dark:bg-pink-900/20 rounded-md">
                                                    <FaInstagram className="text-pink-600 size-3.5" />
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(item.status)}
                                    </TableCell>
                                    <TableCell className="text-gray-600 dark:text-zinc-400">
                                        {item.views.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-gray-600 dark:text-zinc-400 whitespace-nowrap">
                                        {format(new Date(item.created_at), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="font-bold text-[#002822] dark:text-[#002822]">
                                                ${parseFloat(item.payout).toFixed(2)}
                                            </span>
                                            <div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {item.youtube_link && <a href={item.youtube_link} target="_blank" rel="noreferrer"><ExternalLink className="h-3 w-3 text-gray-400 hover:text-blue-500" /></a>}
                                                {item.tiktok_link && <a href={item.tiktok_link} target="_blank" rel="noreferrer"><ExternalLink className="h-3 w-3 text-gray-400 hover:text-blue-500" /></a>}
                                                {item.instagram_link && <a href={item.instagram_link} target="_blank" rel="noreferrer"><ExternalLink className="h-3 w-3 text-gray-400 hover:text-blue-500" /></a>}
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ProfileMyEarnings;
