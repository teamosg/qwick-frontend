import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyEarnings } from "@/hooks/earnings.hook";
import { ExternalLink, DollarSign, Calendar, TrendingUp, Hash, HelpCircle } from "lucide-react";
import { format } from "date-fns";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import { formatViewCount } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ProfileMyEarnings = () => {
    const { data: earnings, isLoading } = useGetMyEarnings();

    const getStatusBadge = (status) => {
        const statusType = status?.toLowerCase() || "pending";
        const variants = {
            pending: "bg-warning-bg text-warning border-warning/20",
            approved: "bg-success-bg text-success border-success/20",
            rejected: "bg-error-bg text-error border-error/20",
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
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const origin = baseUrl.replace(/\/api$/, "");
        return `${origin}${path}`;
    };

    const totalEarnings = earnings?.reduce((sum, item) => sum + parseFloat(item.payout || 0), 0).toFixed(2);

    if (isLoading) {
        return (
            <div className="p-4 md:p-6 space-y-6">
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
        <div className="p-0 md:p-6 space-y-6">
            {/* Header & Stats */}
            <div className="p-4 sm:p-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="flex items-center gap-2 text-xl font-bold text-foreground-strong dark:text-white">
                        My Earnings
                        <Popover>
                            <PopoverTrigger asChild>
                                <button type="button" tabIndex={-1} className="cursor-pointer">
                                    <HelpCircle className="w-4 h-4 text-foreground-muted hover:text-foreground" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 text-sm bg-card border border-border text-foreground">
                                Heads up, submissions take a bit to process. Views may take some time to appear on Qwick.
                            </PopoverContent>
                        </Popover>
                    </h1>
                    <p className="text-sm text-foreground-muted mt-1">
                        Track your campaign rewards and payout status.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-secondary border border-border px-4 py-3 rounded-xl w-full sm:w-auto">
                    <div className="p-2 bg-card border border-border rounded-lg">
                        <DollarSign className="h-5 w-5 text-foreground-strong dark:text-white" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-foreground-muted">Total</p>
                        <p className="text-lg font-bold text-foreground-strong dark:text-white leading-none">
                            ${totalEarnings}
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile View (Cards) - Hidden on desktop */}
            <div className="block lg:hidden space-y-4 px-4 sm:px-0">
                {!earnings || earnings.length === 0 ? (
                    <div className="py-12 text-center text-foreground-muted border border-dashed border-border rounded-xl bg-secondary/50">
                        No earnings recorded.
                    </div>
                ) : (
                    earnings.map((item) => (
                        <div key={item.id} className="bg-card border border-border rounded-xl p-4 shadow-sm space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-secondary border border-border shrink-0">
                                    <img
                                        src={getImageUrl(item.file)}
                                        className="h-full w-full object-cover"
                                        alt=""
                                        onError={(e) => { e.target.src = "/submission.png"; }}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-bold text-foreground-muted flex items-center gap-1">
                                            <Hash className="h-3 w-3" /> {item.campaign}
                                        </span>
                                        {getStatusBadge(item.status)}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-lg text-foreground-strong dark:text-white">${item.payout}</span>
                                        <div className="flex gap-2">
                                            {item.youtube_link && <a href={item.youtube_link} target="_blank" rel="noreferrer"><FaYoutube className="text-red-600 size-4" /></a>}
                                            {item.tiktok_link && <a href={item.tiktok_link} target="_blank" rel="noreferrer"><FaTiktok className="text-foreground size-4" /></a>}
                                            {item.instagram_link && <a href={item.instagram_link} target="_blank" rel="noreferrer"><FaInstagram className="text-pink-600 size-4" /></a>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-3.5 w-3.5 text-foreground-muted" />
                                    <span className="text-xs text-foreground-muted">{formatViewCount(item.views)} Views</span>
                                </div>
                                <div className="flex items-center gap-2 justify-end">
                                    <Calendar className="h-3.5 w-3.5 text-foreground-muted" />
                                    <span className="text-xs text-foreground-muted">{format(new Date(item.created_at), "MMM d, yyyy")}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Desktop View (Table) - Hidden on mobile */}
            <div className="hidden lg:block bg-card border border-border rounded-xl overflow-x-auto shadow-sm">
                <Table className="min-w-[800px] lg:min-w-full">
                    <TableHeader className="bg-secondary">
                        <TableRow>
                            <TableHead className="w-[80px]">Media</TableHead>
                            {/* <TableHead>Campaign ID</TableHead> */}
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
                                <TableCell colSpan={7} className="h-48 text-center text-foreground-muted">
                                    No earnings found
                                </TableCell>
                            </TableRow>
                        ) : (
                            earnings.map((item) => (
                                <TableRow key={item.id} className="group hover:bg-secondary/50 transition-colors">
                                    <TableCell>
                                        <div className="relative h-10 w-10 rounded-md overflow-hidden bg-secondary border border-border">
                                            <img
                                                src={getImageUrl(item.file)}
                                                className="h-full w-full object-cover"
                                                alt=""
                                                onError={(e) => { e.target.src = "/submission.png"; }}
                                            />
                                        </div>
                                    </TableCell>
                                    {/* <TableCell className="font-medium text-gray-900 dark:text-white">
                                        #{item.campaign}
                                    </TableCell> */}
                                    <TableCell>
                                        <div className="flex gap-1.5">
                                            {item.youtube_link && (
                                                <div className="p-1.5 bg-error-bg rounded-md">
                                                    <FaYoutube className="text-red-600 size-3.5" />
                                                </div>
                                            )}
                                            {item.tiktok_link && (
                                                <div className="p-1.5 bg-secondary rounded-md">
                                                    <FaTiktok className="text-foreground size-3.5" />
                                                </div>
                                            )}
                                            {item.instagram_link && (
                                                <div className="p-1.5 bg-pink-500/10 rounded-md">
                                                    <FaInstagram className="text-pink-600 size-3.5" />
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(item.status)}
                                    </TableCell>
                                    <TableCell className="text-foreground-muted">
                                        {formatViewCount(item.views)}
                                    </TableCell>
                                    <TableCell className="text-foreground-muted whitespace-nowrap">
                                        {format(new Date(item.created_at), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="font-bold text-foreground-strong dark:text-white">
                                                ${parseFloat(item.payout).toFixed(2)}
                                            </span>
                                            <div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {item.youtube_link && <a href={item.youtube_link} target="_blank" rel="noreferrer"><ExternalLink className="h-3 w-3 text-foreground-muted hover:text-primary" /></a>}
                                                {item.tiktok_link && <a href={item.tiktok_link} target="_blank" rel="noreferrer"><ExternalLink className="h-3 w-3 text-foreground-muted hover:text-primary" /></a>}
                                                {item.instagram_link && <a href={item.instagram_link} target="_blank" rel="noreferrer"><ExternalLink className="h-3 w-3 text-foreground-muted hover:text-primary" /></a>}
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
