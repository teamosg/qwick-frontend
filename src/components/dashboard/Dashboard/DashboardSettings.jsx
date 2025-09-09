import { Bell, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const DashboardSettings = () => {
  return (
    <div>
      <h2 className="text-[24px] text-gray-900 dark:text-white font-bold mb-6">
        Dashboard Settings
      </h2>
      <div className="">
        <Link
          to={"/dashboard/dashboard-settings/notifications"}
          className="flex items-center justify-between bg-white rounded-xl py-4 px-6 mb-3 hover:shadow-lg transition-all duration-300 ease-in-out shadow-sm"
        >
          <div className="flex items-center justify-center gap-3">
            <Bell />
            <h3 className="text-[#003933] text-[20px]">Notifications</h3>
          </div>
          <ChevronRight />
        </Link>
        <Link
          to={""}
          className="flex items-center justify-between bg-white rounded-xl py-4 px-6 hover:shadow-lg transition-all duration-300 ease-in-out shadow-sm"
        >
          <div className="flex items-center justify-center gap-3">
            <Bell />
            <h3 className="text-[#003933] text-[20px]">Legal</h3>
          </div>
          <ChevronRight />
        </Link>
      </div>
    </div>
  );
};

export default DashboardSettings;
