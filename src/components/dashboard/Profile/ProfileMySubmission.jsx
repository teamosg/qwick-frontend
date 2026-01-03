import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router"; // Keep this if we need it later, though not using "Update" link for now as per "show links status created at only"
import { useGetMySubmissions } from "@/hooks/campaign.hook";
import { Loader2, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";

const ProfileMySubmission = () => {
  const { data, isLoading } = useGetMySubmissions();
  const submissions = data?.submissions || [];

  const getStatusBadge = (status) => {
    const statusType = status?.toLowerCase() || "pending";
    const variants = {
      pending: "bg-[#FEF9C3] text-[#A16207] border-[#A16207]",
      accepted: "bg-[#F0FDF4] text-[#15803D] border-[#15803D]",
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

  const getImageUrl = (path) => {
    if (!path) return "/submission.png";
    if (path.startsWith("http")) return path;
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://darrenchua.softvencealpha.com/api";
    // Remove /api from end if present to get root
    const origin = baseUrl.replace(/\/api$/, "");
    return `${origin}${path}`;
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-4 sm:space-y-6">
        <Skeleton className="h-7 w-48 mb-6" />
        <div className="space-y-4 sm:space-y-6">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="overflow-hidden shadow-sm border border-gray-200 dark:bg-[#2E2E2E] dark:border-[#444444]"
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image Skeleton */}
                  <Skeleton className="w-full sm:w-48 h-48 sm:h-40 flex-shrink-0 rounded-xl" />

                  {/* Content Skeleton */}
                  <div className="flex-1 flex flex-col justify-between py-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full sm:w-3/4" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
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
      {/* Header */}
      <h1 className="text-lg sm:text-xl font-semibold text-[#15161E] dark:text-white mb-4 sm:mb-6">
        My Submissions
      </h1>

      {/* Submissions List */}
      <div className="space-y-4 sm:space-y-6">
        {submissions.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No submissions found.
          </div>
        ) : (
          submissions.map((submission) => (
            <Card
              key={submission.id}
              className="overflow-hidden shadow-sm border border-gray-200 dark:bg-[#2E2E2E] dark:border-[#444444]"
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
                        e.target.src = "/submission.png"; // Fallback if image fails
                      }}
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Submitted on{" "}
                          {submission.created_at
                            ? format(new Date(submission.created_at), "PPP")
                            : "N/A"}
                        </span>
                        {getStatusBadge(submission.status)}
                      </div>

                      <div className="space-y-2">
                        {submission.youtube_link && (
                          <a
                            href={submission.youtube_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[#15161E] dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <FaYoutube className="text-red-600 size-5" />
                            <span className="truncate max-w-[200px] sm:max-w-md">
                              {submission.youtube_link}
                            </span>
                            <ExternalLink className="size-3 shrink-0 opacity-50" />
                          </a>
                        )}
                        {submission.tiktok_link && (
                          <a
                            href={submission.tiktok_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[#15161E] dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <FaTiktok className="text-black dark:text-white size-5" />
                            <span className="truncate max-w-[200px] sm:max-w-md">
                              {submission.tiktok_link}
                            </span>
                            <ExternalLink className="size-3 shrink-0 opacity-50" />
                          </a>
                        )}
                        {submission.instagram_link && (
                          <a
                            href={submission.instagram_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[#15161E] dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <FaInstagram className="text-pink-600 size-5" />
                            <span className="truncate max-w-[200px] sm:max-w-md">
                              {submission.instagram_link}
                            </span>
                            <ExternalLink className="size-3 shrink-0 opacity-50" />
                          </a>
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
    </div>
  );
};

export default ProfileMySubmission;
