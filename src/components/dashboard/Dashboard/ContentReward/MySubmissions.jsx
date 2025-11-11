import { Link } from "react-router";
import ContentRewardNav from "./ContentRewardNav";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { X } from "lucide-react";

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

const ContentRewardMySubmission = () => {
  return (
    <div>
      <ContentRewardNav />

      {/* post number */}
      <div className="mb-4">
        <p className="border-b border-gray-400 max-w-max">Total 10</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="overflow-hidden rounded-xl dark:text-white dark:bg-zinc-900 bg-white"
          >
            <div className="p-4">
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
                        <div className="font-medium dark:text-white">
                          {submission.user.name}
                        </div>
                        <div className="text-xs dark:text-white">
                          {submission.user.handle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={"#"}
                        className="text-[#15803D] bg-[#F0FDF4] dark:bg-[#15803D] dark:text-[#F0FDF4] rounded-full px-3 py-1 text-xs "
                      >
                        Write a feedback
                      </Link>
                    </div>
                  </div>

                  {/* Content Description */}
                  <p className="text-xs leading-relaxed dark:text-zinc-400">
                    {submission.content}
                  </p>

                  <div className="space-x-6">
                    {/* accept  */}
                    <Button
                      variant="ghost"
                      className={
                        "!px-0 hover:underline-none cursor-pointer hover:bg-white text-[#15803D] hover:text-[#15803D] text-xs font-medium"
                      }
                    >
                      <Check />
                      Accept
                    </Button>

                    {/* reject  */}
                    <Button
                      variant="ghost"
                      className={
                        "!px-0 hover:underline-none hover:bg-white cursor-pointer text-[#DC2626] hover:text-[#DC2626] text-xs font-medium"
                      }
                    >
                      <X />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentRewardMySubmission;
