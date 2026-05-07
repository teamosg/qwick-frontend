import { Link } from "react-router";
import ContentRewardNav from "./ContentRewardNav";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2, ExternalLink } from "lucide-react";
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
  const totalSubmissions = data?.total_submissions || 0;

  const handleReview = (submissionId, action) => {
    reviewSubmission({ submissionId, action });
  };

  const getImageUrl = (path) => {
    if (!path) return "/submission.png";
    if (path.startsWith("http")) return path;
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    // Remove /api from end if present to get root
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
        <p className="border-b border-gray-400 max-w-max">Total {totalSubmissions}</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {submissions.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No submissions found.
          </div>
        ) : (
          submissions.map((submission) => (
            <Card
              key={submission.id}
              className="p-0! overflow-hidden shadow-sm border border-gray-200 dark:bg-[#2E2E2E] dark:border-[#444444]"
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image Section */}
                  <div className="w-full sm:w-48 h-48 sm:h-40 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                    <img
                      src={getImageUrl(submission.file)}
                      className="h-full w-full object-cover"
                      alt="Submission"
                      onError={(e) => {
                        e.target.src = "/submission.png";
                      }}
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-4">
                      {/* User Info and Status */}
                      <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="text-sm font-bold text-[#15161E] dark:text-white">
                              {submission.campaign?.name || "Untitled Campaign"}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                                Creator: {submission.member?.username}
                              </span>
                              <span className="text-[10px] text-gray-500 dark:text-gray-400">
                                {submission.member?.email}
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-400 dark:text-gray-500 block pt-1">
                              ID: #{submission.id} • Submitted on{" "}
                              {submission.created_at
                                ? format(new Date(submission.created_at), "PPP p")
                                : "N/A"}
                            </span>
                          </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(submission.status)}
                        </div>
                      </div>

                      {/* Campaign Stats & Links */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/50 dark:bg-zinc-800/50 p-3 rounded-lg border border-gray-100 dark:border-zinc-700">
                        {/* Important Info */}
                        <div className="space-y-1.5">
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 dark:text-zinc-500">Campaign Details</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-none">
                              Rate: {submission.campaign?.reward_rate} {submission.campaign?.currency}
                            </Badge>
                            <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-none">
                              Budget: {submission.campaign?.budget_remaining} {submission.campaign?.currency}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">Min Payout: {submission.campaign?.min_payout}</span>
                            <span className="text-gray-300 dark:text-zinc-700">•</span>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">Max Payout: {submission.campaign?.max_payout}</span>
                          </div>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-2 border-t md:border-t-0 md:border-l border-gray-200 dark:border-zinc-700 pt-2 md:pt-0 md:pl-4">
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 dark:text-zinc-500">Submission Links</p>
                          <div className="space-y-1.5">
                            {submission.links?.youtube && (
                              <a
                                href={submission.links.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[11px] text-[#15161E] dark:text-white hover:text-blue-600 transition-colors"
                              >
                                <FaYoutube className="text-red-600 size-3.5" />
                                <span className="truncate max-w-[120px]">YouTube</span>
                                <ExternalLink className="size-2.5 opacity-50" />
                              </a>
                            )}
                            {submission.links?.tiktok && (
                              <a
                                href={submission.links.tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[11px] text-[#15161E] dark:text-white hover:text-blue-600 transition-colors"
                              >
                                <FaTiktok className="text-black dark:text-white size-3.5" />
                                <span className="truncate max-w-[120px]">TikTok</span>
                                <ExternalLink className="size-2.5 opacity-50" />
                              </a>
                            )}
                            {submission.links?.instagram && (
                              <a
                                href={submission.links.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[11px] text-[#15161E] dark:text-white hover:text-blue-600 transition-colors"
                              >
                                <FaInstagram className="text-pink-600 size-3.5" />
                                <span className="truncate max-w-[120px]">Instagram</span>
                                <ExternalLink className="size-2.5 opacity-50" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {(submission.status === 'pending' || submission.status === 'reviewed') && (
                        <div className="flex gap-4 pt-2">
                          <Button
                            variant="ghost"
                            onClick={() => handleReview(submission.id, "approve")}
                            disabled={isReviewing}
                            className="!px-0 hover:bg-transparent hover:underline-none cursor-pointer text-[#15803D] hover:text-[#15803D]/80 text-xs font-medium flex items-center gap-1"
                          >
                            <Check className="size-4" />
                            Accept
                          </Button>

                          <Button
                            variant="ghost"
                            onClick={() => handleReview(submission.id, "reject")}
                            disabled={isReviewing}
                            className="!px-0 hover:bg-transparent hover:underline-none cursor-pointer text-[#DC2626] hover:text-[#DC2626]/80 text-xs font-medium flex items-center gap-1"
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
