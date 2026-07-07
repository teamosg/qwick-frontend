import { useState } from "react";
import ContentRewardNav from "./ContentRewardNav";
import ReviewSubmissionModal from "./ReviewSubmissionModal";
import { Button } from "@/components/ui/button";
import { Check, X, ExternalLink, TrendingUp, DollarSign } from "lucide-react";
import { useCommunityStore } from "@/store/communityStore";
import { useGetCommunitySubmissions } from "@/hooks/campaign.hook";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";

const AllSubmissions = () => {
  const { selectedBrandCommunity } = useCommunityStore();
  const { data, isLoading } = useGetCommunitySubmissions(selectedBrandCommunity?.id);

  const [reviewModal, setReviewModal] = useState({ isOpen: false, submission: null, action: null });

  const submissions = data?.submissions || [];
  const totalSubmissions = data?.total_submissions || submissions?.length;

  const openReviewModal = (submission, action) => {
    setReviewModal({ isOpen: true, submission, action });
  };

  const closeReviewModal = () => {
    setReviewModal({ isOpen: false, submission: null, action: null });
  };

  const getImageUrl = (path) => {
    if (!path) return "/communityBG.png";
    if (path.startsWith("http")) return path;
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const origin = baseUrl.replace(/\/api$/, "");
    return `${origin}${path}`;
  };

  const getStatusBadge = (status) => {
    const statusType = status?.toLowerCase() || "pending";
    const variants = {
      pending: "bg-warning-bg text-warning border-warning",
      accepted: "bg-success-bg text-success border-success",
      approved: "bg-success-bg text-success border-success",
      reject: "bg-error-bg text-error border-error",
      rejected: "bg-error-bg text-error border-error",
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
              className="p-0! overflow-hidden shadow-sm border border-border bg-card"
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
        <p className="border-b border-border max-w-max text-sm font-medium">Total {totalSubmissions} Submissions</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {submissions.length === 0 ? (
          <div className="text-center py-12 bg-secondary rounded-xl border border-dashed border-border text-foreground-muted">
            No submissions found.
          </div>
        ) : (
          submissions.map((submission) => (
            <Card
              key={submission.id}
              className="p-0! overflow-hidden shadow-sm border border-border bg-card"
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Image Section */}
                  <div className="w-full sm:w-48 h-48 sm:h-40 flex-shrink-0 bg-secondary rounded-xl overflow-hidden relative">
                    <img
                      src={getImageUrl(submission?.file)}
                      className="h-full w-full object-cover"
                      alt="Submission"
                      onError={(e) => {
                        e.target.src = "/submission.png";
                      }}
                    />
                    {/* <div className="absolute top-2 left-2">
                       <Badge className="bg-black/60 backdrop-blur-md text-white border-none text-[10px]">
                         #{submission?.id}
                       </Badge>
                    </div> */}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-4">
                      {/* User Info and Status */}
                      <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="text-sm font-bold text-foreground-strong leading-tight">
                              {submission?.campaign?.name || "Untitled Campaign"}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-medium text-foreground-muted">
                                Creator: {submission?.member?.username || "Anonymous"}
                              </span>
                            </div>
                            {submission?.created_at && (
                              <span className="text-[10px] text-foreground-subtle block">
                                Submitted {format(new Date(submission?.created_at), "PPP")}
                              </span>
                            )}
                          </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(submission?.status)}
                        </div>
                      </div>

                      {/* Stats & Breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-secondary p-4 rounded-xl border border-border">
                        {/* Core Stats */}
                        <div className="space-y-3">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-foreground-muted">Submission Stats</p>
                          <div className="flex flex-wrap gap-3">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-foreground-muted flex items-center gap-1"><TrendingUp className="size-3" /> Total Views</span>
                              <span className="text-sm font-bold text-foreground-strong">{submission?.views?.toLocaleString()}</span>
                            </div>
                            <div className="h-8 w-[1px] bg-border" />
                            <div className="flex flex-col">
                              <span className="text-[10px] text-foreground-muted flex items-center gap-1"><DollarSign className="size-3" /> Payout</span>
                              <span className="text-sm font-bold text-success">${submission?.payout?.total_earned?.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="pt-1">
                             <Badge variant="outline" className="text-[10px] font-normal border-border">
                               Campaign Budget: ${submission?.campaign?.budget_remaining?.toLocaleString()}
                             </Badge>
                          </div>
                        </div>

                        {/* Performance Breakdown */}
                        <div className="space-y-3 border-t md:border-t-0 md:border-l border-border pt-3 md:pt-0 md:pl-6">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-foreground-muted">Platform Breakdown</p>
                          <div className="grid grid-cols-1 gap-2.5">
                            {(submission?.platform_stats?.youtube?.link || submission?.platform_stats?.youtube?.baseline > 0) && (
                              <div className="flex items-center justify-between text-[11px]">
                                {submission?.platform_stats?.youtube?.link ? (
                                  <a
                                    href={submission.platform_stats.youtube.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-foreground-muted hover:text-foreground-strong dark:hover:text-emerald-400 transition-colors font-medium group cursor-pointer"
                                  >
                                    <FaYoutube className="text-error size-3.5" />
                                    <span>YouTube</span>
                                    <ExternalLink className="size-3 text-foreground-muted group-hover:text-current transition-colors" />
                                  </a>
                                ) : (
                                  <span className="flex items-center gap-1.5 text-foreground-muted font-medium">
                                    <FaYoutube className="text-error size-3.5" />
                                    <span>YouTube</span>
                                  </span>
                                )}
                                <span className="font-semibold text-foreground-strong">
                                  {submission?.platform_stats?.youtube?.baseline?.toLocaleString() || 0}
                                </span>
                              </div>
                            )}

                            {(submission?.platform_stats?.tiktok?.link || submission?.platform_stats?.tiktok?.baseline > 0) && (
                              <div className="flex items-center justify-between text-[11px]">
                                {submission?.platform_stats?.tiktok?.link ? (
                                  <a
                                    href={submission.platform_stats.tiktok.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-foreground-muted hover:text-foreground-strong dark:hover:text-success transition-colors font-medium group cursor-pointer"
                                  >
                                    <FaTiktok className="text-foreground-strong size-3.5" />
                                    <span>TikTok</span>
                                    <ExternalLink className="size-3 text-foreground-muted group-hover:text-current transition-colors" />
                                  </a>
                                ) : (
                                  <span className="flex items-center gap-1.5 text-foreground-muted font-medium">
                                    <FaTiktok className="text-foreground-strong size-3.5" />
                                    <span>TikTok</span>
                                  </span>
                                )}
                                <span className="font-semibold text-foreground-strong">
                                  {submission?.platform_stats?.tiktok?.baseline?.toLocaleString() || 0}
                                </span>
                              </div>
                            )}

                            {(submission?.platform_stats?.instagram?.link || submission?.platform_stats?.instagram?.baseline > 0) && (
                              <div className="flex items-center justify-between text-[11px]">
                                {submission?.platform_stats?.instagram?.link ? (
                                  <a
                                    href={submission.platform_stats.instagram.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-foreground-muted hover:text-foreground-strong dark:hover:text-emerald-400 transition-colors font-medium group cursor-pointer"
                                  >
                                    <FaInstagram className="text-pink-600 size-3.5" />
                                    <span>Instagram</span>
                                    <ExternalLink className="size-3 text-foreground-muted group-hover:text-current transition-colors" />
                                  </a>
                                ) : (
                                  <span className="flex items-center gap-1.5 text-foreground-muted font-medium">
                                    <FaInstagram className="text-pink-600 size-3.5" />
                                    <span>Instagram</span>
                                  </span>
                                )}
                                <span className="font-semibold text-foreground-strong">
                                  {submission?.platform_stats?.instagram?.baseline?.toLocaleString() || 0}
                                </span>
                              </div>
                            )}

                            {(!submission?.platform_stats || 
                              Object.values(submission?.platform_stats).every(v => !v?.link && (v?.baseline || 0) === 0)) && (
                              <span className="text-[10px] text-foreground-muted italic">No breakdown available</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {(submission?.status === 'pending' || submission?.status === 'reviewed') && (
                        <div className="flex gap-4 pt-2">
                          <Button
                            variant="ghost"
                            onClick={() => openReviewModal(submission, "approve")}
                            className="!px-0 hover:bg-transparent hover:underline-none cursor-pointer text-success hover:text-success/80 text-xs font-semibold flex items-center gap-1.5"
                          >
                            <Check className="size-4" />
                            Approve Submission
                          </Button>

                          <Button
                            variant="ghost"
                            onClick={() => openReviewModal(submission, "reject")}
                            className="!px-0 hover:bg-transparent hover:underline-none cursor-pointer text-error hover:text-error/80 text-xs font-semibold flex items-center gap-1.5"
                          >
                            <X className="size-4" />
                            Reject Submission
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
      {/* Review Modal */}
      <ReviewSubmissionModal
        isOpen={reviewModal.isOpen}
        onClose={closeReviewModal}
        submission={reviewModal.submission}
        action={reviewModal.action}
      />
    </div>
  );
};

export default AllSubmissions;
