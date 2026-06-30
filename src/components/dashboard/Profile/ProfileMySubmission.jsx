import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMySubmissions } from "@/hooks/campaign.hook";
import { ExternalLink, TrendingUp, DollarSign, Calendar, CheckCircle2, MessageSquareText } from "lucide-react";
import { format } from "date-fns";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FeedbackModal from "./FeedbackModal";

const ProfileMySubmission = () => {
  const { data, isLoading } = useGetMySubmissions();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [feedbackModal, setFeedbackModal] = useState({ isOpen: false, submission: null });
  const [erroredImages, setErroredImages] = useState(new Set());

  const openFeedbackModal = (submission) => {
    setFeedbackModal({ isOpen: true, submission });
  };

  const closeFeedbackModal = () => {
    setFeedbackModal({ isOpen: false, submission: null });
  };

  const handleImageError = (submissionId) => {
    setErroredImages((prev) => new Set(prev).add(submissionId));
  };

  const submissions = data?.submissions || [];

  const filteredSubmissions = submissions.filter((submission) => {
    if (selectedStatus === "all") return true;
    return submission.status?.toLowerCase() === selectedStatus.toLowerCase();
  });

  const getStatusBadge = (status) => {
    const statusType = status?.toLowerCase() || "pending";
    const variants = {
      pending: "bg-warning-bg text-warning border-warning",
      approved: "bg-success-bg text-success border-success",
      rejected: "bg-error-bg text-error border-error",
    };

    return (
      <Badge
        variant="outline"
        className={`${variants[statusType] || variants.pending
          } rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider capitalize`}
      >
        {status}
      </Badge>
    );
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const origin = baseUrl.replace(/\/api$/, "");
    return `${origin}${path}`;
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-10 w-[180px] rounded-full" />
      </div>
        <div className="space-y-4 sm:space-y-6">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="p-0! overflow-hidden shadow-sm border border-gray-200 dark:bg-zinc-800 dark:border-foreground-muted"
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
    <div className="md:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground-strong dark:text-white">
            My Submissions
          </h1>
          <Badge
            variant="secondary"
            className="px-4 py-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border-none font-medium"
          >
            Total {filteredSubmissions.length}
          </Badge>
        </div>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px] rounded-full bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-gray-200 dark:border-zinc-700 shadow-lg">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-zinc-700 text-gray-500 dark:text-gray-400">
            {selectedStatus === "all"
              ? "No submissions found. Start a campaign to see them here!"
              : `No ${selectedStatus} submissions found.`}
          </div>
        ) : (
          filteredSubmissions.map((submission) => (
            <Card
              key={submission.id}
              className="p-0! group overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-200 dark:bg-zinc-800 dark:border-foreground-muted"
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image Section */}
                  <div className="w-full lg:w-56 h-52 lg:h-44 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative group-hover:scale-[1.01] transition-transform duration-300">
                    {(() => {
                      const imageUrl = getImageUrl(submission.file);
                      const hasError = erroredImages.has(submission.id);
                      if (imageUrl && !hasError) {
                        return (
                          <img
                            src={imageUrl}
                            className="h-full w-full object-cover"
                            alt="Submission"
                            onError={() => handleImageError(submission.id)}
                          />
                        );
                      }
                      return (
                        <div className="flex items-center justify-center h-full w-full bg-gray-200 dark:bg-zinc-700">
                          <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                          </svg>
                        </div>
                      );
                    })()}
                    <div className="absolute top-3 left-3">
                       <Badge className="bg-black/60 backdrop-blur-md text-white border-none text-[10px] px-2 py-0.5">
                         ID: #{submission.id}
                       </Badge>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="space-y-5">
                      {/* Campaign Title & Status */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-foreground-strong dark:text-white truncate leading-tight mb-1">
                            {submission.campaign?.name || "Untitled Campaign"}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="text-[11px] flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                              <Calendar className="size-3" /> Submitted {submission.created_at ? format(new Date(submission.created_at), "PPP") : "N/A"}
                            </span>
                            {submission.approved_at && (
                              <span className="text-[11px] flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                                <CheckCircle2 className="size-3" /> Approved {format(new Date(submission.approved_at), "PPP")}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {getStatusBadge(submission.status)}
                        </div>
                      </div>

                      {/* Stats Overview */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50/80 dark:bg-zinc-800/80 p-3.5 rounded-xl border border-gray-100 dark:border-zinc-700/50 transition-colors group-hover:bg-gray-100/80 dark:group-hover:bg-zinc-800">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-zinc-500 mb-2">Performance</p>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <TrendingUp className="size-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <span className="block text-sm font-bold text-foreground-strong dark:text-white leading-none mb-0.5">
                                {submission.total_views_earned?.toLocaleString() || 0}
                              </span>
                              <span className="text-[10px] text-gray-500 dark:text-gray-400">Total Views Earned</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-emerald-50/30 dark:bg-emerald-900/10 p-3.5 rounded-xl border border-emerald-100/50 dark:border-emerald-900/30 transition-colors group-hover:bg-emerald-50/50">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-emerald-600/70 dark:text-emerald-500/70 mb-2">Earnings</p>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                              <DollarSign className="size-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                              <span className="block text-sm font-bold text-emerald-700 dark:text-emerald-400 leading-none mb-0.5">
                                ${submission.total_payout?.toFixed(2) || "0.00"}
                              </span>
                              <span className="text-[10px] text-emerald-600/70 dark:text-emerald-500/70 font-medium">Estimated Payout</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="pt-1">
                        <div className="flex flex-wrap gap-3">
                          {submission.links?.youtube && (
                            <a
                              href={submission.links.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-[11px] font-medium text-gray-700 dark:text-gray-200 hover:border-red-500/50 hover:text-red-600 transition-all shadow-sm"
                            >
                              <FaYoutube className="text-red-600 size-3.5" />
                              YouTube
                              <ExternalLink className="size-2.5 opacity-40" />
                            </a>
                          )}
                          {submission.links?.tiktok && (
                            <a
                              href={submission.links.tiktok}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-[11px] font-medium text-gray-700 dark:text-gray-200 hover:border-black dark:hover:border-white transition-all shadow-sm"
                            >
                              <FaTiktok className="text-black dark:text-white size-3" />
                              TikTok
                              <ExternalLink className="size-2.5 opacity-40" />
                            </a>
                          )}
                          {submission.links?.instagram && (
                            <a
                              href={submission.links.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-[11px] font-medium text-gray-700 dark:text-gray-200 hover:border-pink-500/50 hover:text-pink-600 transition-all shadow-sm"
                            >
                              <FaInstagram className="text-pink-600 size-3.5" />
                              Instagram
                              <ExternalLink className="size-2.5 opacity-40" />
                            </a>
                          )}
                        </div>

                        {/* Feedback Button */}
                        {submission.feedback && (
                          <button
                            onClick={() => openFeedbackModal(submission)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all shadow-sm mt-3"
                          >
                            <MessageSquareText className="size-3.5" />
                            View Feedback
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        onClose={closeFeedbackModal}
        submission={feedbackModal.submission}
      />
    </div>
  );
};

export default ProfileMySubmission;
