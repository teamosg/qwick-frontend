import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquareText, ThumbsUp, ThumbsDown, Calendar, Hash } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const FeedbackModal = ({ isOpen, onClose, submission }) => {
  if (!submission) return null;

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
        className={`${variants[statusType] || variants.pending} rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider capitalize`}
      >
        {status}
      </Badge>
    );
  };

  const isRejected = ["rejected", "reject"].includes(submission.status?.toLowerCase());

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
            <div className="bg-card rounded-3xl w-full max-w-md mx-auto shadow-2xl border border-border overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isRejected
                      ? "bg-error-bg text-error"
                      : "bg-success-bg text-success"
                  }`}>
                    <MessageSquareText className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Submission Feedback</h2>
                    <p className="text-xs text-foreground-muted">Review from the brand team</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-accent transition-colors text-foreground-muted hover:text-foreground cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* Campaign Info */}
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-foreground truncate">
                      {submission.campaign?.name || "Untitled Campaign"}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Hash className="size-3 text-foreground-muted" />
                      <span className="text-[11px] text-foreground-muted">ID: #{submission.id}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(submission.status)}
                  </div>
                </div>

                {/* Submission Date */}
                {submission.created_at && (
                  <div className="flex items-center gap-2 text-[11px] text-foreground-muted">
                    <Calendar className="size-3" />
                    Submitted {format(new Date(submission.created_at), "PPP")}
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Feedback Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${
                      isRejected
                        ? "bg-error-bg text-error"
                        : "bg-success-bg text-success"
                    }`}>
                      {isRejected ? (
                        <ThumbsDown className="size-3.5" />
                      ) : (
                        <ThumbsUp className="size-3.5" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      {isRejected ? "Feedback on your rejection" : "Feedback from the team"}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-secondary border border-border">
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {submission.feedback}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-border shrink-0">
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 rounded-2xl font-bold text-foreground bg-secondary hover:bg-secondary-hover transition-all border border-border cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;
