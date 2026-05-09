import { Link } from "react-router";
import ContentRewardNav from "./ContentRewardNav";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2, ExternalLink, TrendingUp, DollarSign } from "lucide-react";
import { useCommunityStore } from "@/store/communityStore";
import { useGetCommunitySubmissions, useReviewSubmission } from "@/hooks/campaign.hook";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";

const AllSubmissions = () => {
  const { selectedBrandCommunity } = useCommunityStore();
  const { data, isLoading } = useGetCommunitySubmissions(selectedBrandCommunity?.id);
  const { mutate: reviewSubmission, isPending: isReviewing } = useReviewSubmission();

  const submissions = data?.submissions || [];
  const totalSubmissions = data?.total_submissions || submissions?.length;

  const handleReview = (submissionId, action) => {
    reviewSubmission({ submissionId, action });
  };

  const getImageUrl = (path) => {
    if (!path) return "/submission.png";
    if (path.startsWith("http")) return path;
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const origin = baseUrl.replace(/\/api$/, "");
    return `${origin}${path}`;
  };

  const getStatusBadge = (status) => {
    const statusType = status?.toLowerCase() || "pending";
    const variants = {
      pending: "bg-[#FEF9C3] text-[#A16207] border-[#A16207]",
      accepted: "bg-[#F0FDF4] text-[#15803D] border-[#15803D]",
      approved: "bg-[#F0FDF4] text-[#15803D] border-[#15803D]",
      reject: "bg-[#FEE2E2] text-[#CA6377] border-[#CA6377]",
      rejected: "bg-[#FEE2E2] text-[#CA6377] border-[#CA6377]",
    };

    return (
      <Badge
        variant="outline"
        className={`${variants[statusType] || variants.pending
          } rounded-full px-3 py-1 text-xs font-medium capitalize`}
      >
        {status}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div>
        <ContentRewardNav />
        <div className="mb-4">
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="space-y-4 sm:space-y-6">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="p-0! overflow-hidden shadow-sm border border-gray-200 dark:bg-[#2E2E2E] dark:border-[#444444]"
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Skeleton className="w-full sm:w-48 h-48 sm:h-40 flex-shrink-0 rounded-xl" />
                  <div className="flex-1 flex flex-col justify-between py-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full sm:w-3/4" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <ContentRewardNav />

      {/* post number */}
      <div className="mb-4">
        <p className="border-b border-gray-400 max-w-max text-sm font-medium">Total {totalSubmissions} Submissions</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {submissions.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-gray-300 dark:border-zinc-700 text-gray-500 dark:text-gray-400">
            No submissions found.
          </div>
        ) : (
          submissions.map((submission) => (
            <Card
              key={submission.id}
              className="p-0! overflow-hidden shadow-sm border border-gray-200 dark:bg-[#2E2E2E] dark:border-[#444444]"
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Image Section */}
                  <div className="w-full sm:w-48 h-48 sm:h-40 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative">
                    <img
                      src={getImageUrl(submission?.file)}
                      className="h-full w-full object-cover"
                      alt="Submission"
                      onError={(e) => {
                        e.target.src = "/submission.png";
                      }}
                    />
                    <div className="absolute top-2 left-2">
                       <Badge className="bg-black/60 backdrop-blur-md text-white border-none text-[10px]">
                         #{submission?.id}
                       </Badge>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-4">
                      {/* User Info and Status */}
                      <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="text-sm font-bold text-[#15161E] dark:text-white leading-tight">
                              {submission?.campaign?.name || "Untitled Campaign"}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                Creator: {submission?.member?.username || "Anonymous"}
                              </span>
                            </div>
                            {submission?.created_at && (
                              <span className="text-[10px] text-gray-400 dark:text-gray-500 block">
                                Submitted {format(new Date(submission?.created_at), "PPP")}
                              </span>
                            )}
                          </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(submission?.status)}
                        </div>
                      </div>

                      {/* Stats & Breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/50 dark:bg-zinc-800/50 p-4 rounded-xl border border-gray-100 dark:border-zinc-700/50">
                        {/* Core Stats */}
                        <div className="space-y-3">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-zinc-500">Submission Stats</p>
                          <div className="flex flex-wrap gap-3">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-gray-500 flex items-center gap-1"><TrendingUp className="size-3" /> Total Views</span>
                              <span className="text-sm font-bold text-[#15161E] dark:text-white">{submission?.views?.toLocaleString()}</span>
                            </div>
                            <div className="h-8 w-[1px] bg-gray-200 dark:bg-zinc-700" />
                            <div className="flex flex-col">
                              <span className="text-[10px] text-gray-500 flex items-center gap-1"><DollarSign className="size-3" /> Payout</span>
                              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">${submission?.payout?.total_earned?.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="pt-1">
                             <Badge variant="outline" className="text-[10px] font-normal border-gray-200 dark:border-zinc-700">
                               Campaign Budget: ${submission?.campaign?.budget_remaining?.toLocaleString()}
                             </Badge>
                          </div>
                        </div>

                        {/* Performance Breakdown */}
                        <div className="space-y-3 border-t md:border-t-0 md:border-l border-gray-200 dark:border-zinc-700 pt-3 md:pt-0 md:pl-6">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-zinc-500">Platform Breakdown</p>
                          <div className="grid grid-cols-1 gap-2">
                            {submission?.platform_stats?.youtube?.baseline > 0 && (
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                  <FaYoutube className="text-red-600 size-3" /> YouTube
                                </span>
                                <span className="font-semibold">{submission?.platform_stats?.youtube?.baseline?.toLocaleString()}</span>
                              </div>
                            )}
                            {submission?.platform_stats?.tiktok?.baseline > 0 && (
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                  <FaTiktok className="text-black dark:text-white size-3" /> TikTok
                                </span>
                                <span className="font-semibold">{submission?.platform_stats?.tiktok?.baseline?.toLocaleString()}</span>
                              </div>
                            )}
                            {submission?.platform_stats?.instagram?.baseline > 0 && (
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                  <FaInstagram className="text-pink-600 size-3" /> Instagram
                                </span>
                                <span className="font-semibold">{submission?.platform_stats?.instagram?.baseline?.toLocaleString()}</span>
                              </div>
                            )}
                            {(!submission?.platform_stats || Object.values(submission?.platform_stats).every(v => (v?.baseline || 0) === 0)) && (
                              <span className="text-[10px] text-gray-400 italic">No breakdown available</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {(submission?.status === 'pending' || submission?.status === 'reviewed') && (
                        <div className="flex gap-4 pt-2">
                          <Button
                            variant="ghost"
                            onClick={() => handleReview(submission?.id, "approve")}
                            disabled={isReviewing}
                            className="!px-0 hover:bg-transparent hover:underline-none cursor-pointer text-[#15803D] hover:text-[#15803D]/80 text-xs font-semibold flex items-center gap-1.5"
                          >
                            <Check className="size-4" />
                            Approve Payout
                          </Button>

                          <Button
                            variant="ghost"
                            onClick={() => handleReview(submission?.id, "reject")}
                            disabled={isReviewing}
                            className="!px-0 hover:bg-transparent hover:underline-none cursor-pointer text-[#DC2626] hover:text-[#DC2626]/80 text-xs font-semibold flex items-center gap-1.5"
                          >
                            <X className="size-4" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AllSubmissions;
