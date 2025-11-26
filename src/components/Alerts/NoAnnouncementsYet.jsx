import { Megaphone, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function NoAnnouncementsYet({ owner }) {
    return (
        <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4">

            {/* Icon */}
            <div className="mb-6">
                <Megaphone className="w-16 h-16 text-gray-400 dark:text-gray-500" />
            </div>

            {/* Message */}
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                {owner ? "No Announcements Yet" : "No Announcements Available"}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8 text-base sm:text-lg">
                {owner
                    ? "You haven’t created any announcements yet. Create one to keep your community updated."
                    : "There are currently no announcements posted in this community. Please check back later."}
            </p>

            {/* Owner Action Button */}
            {owner && (
                <Link
                    to="/dashboard"
                    className="bg-[#003933] dark:bg-[#003933] text-white px-6 py-3 rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Create Announcement
                </Link>
            )}
        </div>
    );
}
