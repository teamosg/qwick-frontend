import SingleNotificationItem from "@/components/notifications/SingleNotificationItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SquareCheck } from "lucide-react";
import { Link } from "react-router";

const Notifications = () => {
  return (
    <div className="p-6 bg-[#f9fafb] dark:bg-zinc-950 min-h-screen">
      <div className="bg-white dark:bg-zinc-900 p-6 border border-gray-200 dark:border-zinc-700 rounded-xl">
        <div class="mb-9 inline-block">
          <h1 class="text-[#191919] dark:text-white text-xl font-semibold">
            Notifications
          </h1>
        </div>
        <div className="flex w-full flex-col gap-6">
          <Tabs defaultValue="all-notifications">
            <div className="flex flex-row justify-between">
              <TabsList className="bg-transparent border-b border-border rounded-none p-0 mb-8 h-auto w-full justify-start  max-w-xs">
                <TabsTrigger
                  value="all-notifications"
                  className="bg-transparent shadow-none rounded-none border-0 relative data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3 mr-8 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-1 data-[state=active]:after:right-1 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:content-['']"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="bg-transparent shadow-none rounded-none border-0 relative data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3 mr-8 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-1 data-[state=active]:after:right-1 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:content-['']"
                >
                  <span>Unread</span>
                  <span className="text-muted-foreground text-sm ml-1">
                    (17)
                  </span>
                </TabsTrigger>
              </TabsList>
              <div className="">
                <Link
                  to="#"
                  className="font-semibold text-[#003933] dark:text-white flex gap-1 justify-center items-center text-xs md:text-sm"
                >
                  <SquareCheck />
                  <span className=""> Mark all as read</span>
                </Link>
              </div>
            </div>
            <TabsContent value="all-notifications">
              <SingleNotificationItem />
              <SingleNotificationItem />
              <SingleNotificationItem />
              <SingleNotificationItem />
            </TabsContent>
            <TabsContent value="unread">
              <SingleNotificationItem />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
