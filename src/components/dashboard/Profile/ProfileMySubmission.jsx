import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";

const ProfileMySubmission = () => {
  const submissions = [
    {
      id: 1,
      image: "/submission.png",
      user: {
        name: "Sarah Chen",
        handle: "@sarahbeauty",
        avatar: "/api/placeholder/40/40",
      },
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desk",
      status: { text: "Pending", type: "pending" },
    },
    {
      id: 2,
      image: "/submission.png",
      user: {
        name: "Sarah Chen",
        handle: "@sarahbeauty",
        avatar: "/api/placeholder/40/40",
      },
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desk",
      status: { text: "Accepted", type: "accepted" },
    },
    {
      id: 3,
      image: "/submission.png",
      user: {
        name: "Sarah Chen",
        handle: "@sarahbeauty",
        avatar: "/api/placeholder/40/40",
      },
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desk",
      status: { text: "Reject", type: "reject" },
    },
    {
      id: 4,
      image: "/submission.png",
      user: {
        name: "Sarah Chen",
        handle: "@sarahbeauty",
        avatar: "/api/placeholder/40/40",
      },
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desk",
      status: { text: "Reject", type: "reject" },
    },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      pending: "bg-[#FEE2E2] text-[#CA6377] border-[#CA6377]",
      accepted: "bg-[#F0FDF4] text-[#15803D] border-[#15803D]",
      reject: "bg-[#FEE2E2] text-[#CA6377] border-[#CA6377]",
    };

    return (
      <Badge
        variant="outline"
        className={`${
          variants[status.type]
        } rounded-full px-3 py-1 text-xs font-medium`}
      >
        {status.text}
      </Badge>
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
              <h1 className="text-lg sm:text-xl font-semibold text-[#15161E] dark:text-white mb-4 sm:mb-6">
        Content Submissions
      </h1>

      {/* Submissions List */}
      <div className="space-y-4 sm:space-y-6">
        {submissions.map((submission) => (
          <Card
            key={submission.id}
            className="overflow-hidden shadow-sm border border-gray-200 dark:bg-[#2E2E2E] dark:border-[#444444]"
          >
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row">
                {/* Image Section */}
                <div className="w-[320px] sm:w-48 h-48 sm:h-40 flex-shrink-0">
                  <img
                    src="/submission.png"
                    className="h-full w-full object-cover rounded-xl"
                    alt=""
                  />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-4 sm:p-6 text-[#666666]">
                  {/* User Info and Status */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <img src="/image.png" alt="" />
                      </div>
                      <div>
                        <div className="font-medium text-[#15161E] dark:text-white">
                          {submission.user.name}
                        </div>
                        <div className="text-xs text-[#AAAAAA] dark:text-white">{submission.user.handle}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(submission.status)}
                      <Link
                        to={"#"}
                        className="text-[#15803D] bg-[#F0FDF4] dark:bg-[#15803D] dark:text-white border border-[#15803D] rounded-full px-3 py-1 text-xs "
                      >
                        Update
                      </Link>
                    </div>
                  </div>

                  {/* Content Description */}
                  <p className="text-xs leading-relaxed text-[#666666] dark:text-white">
                    {submission.content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileMySubmission;
