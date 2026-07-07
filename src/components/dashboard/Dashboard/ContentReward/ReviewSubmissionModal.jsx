import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ThumbsDown, MessageSquare, DollarSign, TrendingUp, FileText } from "lucide-react";
import { useReviewSubmission } from "@/hooks/campaign.hook";
import { format } from "date-fns";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";

const ReviewSubmissionModal = ({ isOpen, onClose, submission, action }) => {
  const [feedback, setFeedback] = useState("");
  const { mutate: reviewSubmission, isPending: isReviewing } = useReviewSubmission();

  if (!submission) return null;

  const isApprove = action === "approve";
  const campaignName = submission?.campaign?.name || "Untitled Campaign";
  const creatorName = submission?.member?.username || "Anonymous";
  const views = submission?.views || 0;
  const payout = submission?.payout?.total_earned || 0;

  const getImageUrl = (path) => {
    if (!path) return "/submission.png";
    if (path.startsWith("http")) return path;
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const origin = baseUrl.replace(/\/api$/, "");
    return `${origin}${path}`;
  };

  const handleSubmit = () => {
    reviewSubmission(
      { submissionId: submission.id, action, feedback },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card dark:bg-card rounded-3xl w-full max-w-lg mx-auto shadow-2xl border border-border dark:border-border overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isApprove
                    ? "bg-success-bg dark:bg-success/20 text-success"
                    : "bg-error-bg dark:bg-error/20 text-error"
                    }`}>
                    {isApprove ? <Check className="size-5" /> : <ThumbsDown className="size-5" />}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      {isApprove ? "Approve Submission" : "Reject Submission"}
                    </h2>
                    <p className="text-xs text-muted-foreground">Review the submission details below</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* Submission Image - only show when file exists */}
                {submission?.file && (
                  <div className="w-full h-44 rounded-xl overflow-hidden bg-accent">
                    <img
                      src={getImageUrl(submission?.file)}
                      alt="Submission"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* Submission Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-secondary border border-border">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Campaign</span>
                    <p className="text-sm font-semibold text-foreground mt-0.5 truncate">{campaignName}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary border border-border">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Creator</span>
                    <p className="text-sm font-semibold text-foreground mt-0.5 truncate">{creatorName}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary border border-border">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="size-3" /> Views
                    </span>
                    <p className="text-sm font-bold text-foreground mt-0.5">{views?.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary border border-border">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-1">
                      <DollarSign className="size-3" /> Payout
                    </span>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      ${payout?.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Submitted Date */}
                {submission?.created_at && (
                  <div className="text-[11px] text-muted-foreground">
                    Submitted on {format(new Date(submission.created_at), "PPP")}
                  </div>
                )}

                {/* Platform Links */}
                {submission?.platform_stats && Object.values(submission.platform_stats).some(v => v?.link) && (
                  <div className="p-3 rounded-xl bg-secondary border border-border space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-1">
                      <FileText className="size-3" /> Platform Links
                    </span>
                    <div className="space-y-1.5">
                      {submission?.platform_stats?.youtube?.link && (
                        <a href={submission.platform_stats.youtube.link} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                          <FaYoutube className="text-red-600 size-3.5 shrink-0" />
                          <span className="truncate">View on YouTube</span>
                        </a>
                      )}
                      {submission?.platform_stats?.tiktok?.link && (
                        <a href={submission.platform_stats.tiktok.link} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                          <FaTiktok className="text-foreground size-3.5 shrink-0" />
                          <span className="truncate">View on TikTok</span>
                        </a>
                      )}
                      {submission?.platform_stats?.instagram?.link && (
                        <a href={submission.platform_stats.instagram.link} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                          <FaInstagram className="text-pink-600 size-3.5 shrink-0" />
                          <span className="truncate">View on Instagram</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Feedback Textarea */}
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <MessageSquare className="size-3.5" />
                    Feedback <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder={isApprove
                      ? "Add a note for the creator (optional)..."
                      : "Explain why this submission is being rejected (optional)..."
                    }
                    rows={3}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-border shrink-0">
                <button
                  onClick={onClose}
                  disabled={isReviewing}
                  className="flex-1 px-6 py-3 rounded-2xl font-bold text-muted-foreground hover:text-foreground hover:bg-accent transition-all border border-border disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isReviewing}
                  className={`flex-[1.5] px-6 py-3 rounded-2xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${isApprove
                    ? "bg-success hover:bg-success/90 shadow-lg shadow-success/20"
                    : "bg-error hover:bg-error/90 shadow-lg shadow-error/20"
                    }`}
                >
                  {isReviewing ? (
                    <div className="flex items-center gap-2">
                      <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{isApprove ? "Approving..." : "Rejecting..."}</span>
                    </div>
                  ) : (
                    <>
                      {isApprove ? <Check className="size-4" /> : <ThumbsDown className="size-4" />}
                      <span>{isApprove ? "Approve Payout" : "Reject Submission"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReviewSubmissionModal;
