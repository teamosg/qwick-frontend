import { Navigation, Search } from "lucide-react";
import { Link } from "react-router";

const NeedHelp = () => {
  const helpCategories = [
    {
      id: "creators",
      title: "Creators",
      articles: 55,
      description: "Everything about content creation and management",
    },
    {
      id: "affiliates",
      title: "Affiliates",
      articles: 32,
      description: "Learn how to become an affiliate and earn",
    },
    {
      id: "billing",
      title: "Billing & subscription",
      articles: 28,
      description: "Manage your subscription and payments",
    },
    {
      id: "account",
      title: "Account settings",
      articles: 15,
      description: "Configure your account preferences",
    },
    {
      id: "content-reward",
      title: "Content reward",
      articles: 42,
      description: "Understanding content rewards and payouts",
    },
  ];

  return (
    <div className="p-12 dark:bg-background max-w-6xl mx-auto">
      <div className="mb-6 inline-block">
        <h1 className="text-foreground dark:text-white text-4xl font-semibold">
          How can we help?
        </h1>
      </div>

      <div className="mb-8">
        <div className="flex items-center border pr-3 gap-2 border-border h-[46px] rounded-md overflow-hidden w-full">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full h-full pl-5 outline-none text-muted-foreground placeholder-gray-500 text-sm bg-background"
          />
          <button type="button">
            <Search />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 md:mb-20">
        {helpCategories.map((category) => (
          <Link
            key={category.id}
            to={`/need-help/${category.id}`}
            className="bg-card dark:bg-card rounded-xl p-5 transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105"
          >
            <div className="flex items-center justify-start gap-3">
              <div className="w-12 h-12 bg-foreground-strong rounded-md text-white flex items-center justify-center">
                <Navigation />
              </div>
              <div className="">
                <h3 className="text-base lg:text-xl text-foreground-strong dark:text-white font-semibold">
                  {category.title}
                </h3>
                <span className="text-xs lg:text-base text-muted-foreground">
                  {category.articles} articles
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <h1 className="text-foreground dark:text-white text-2xl md:text-4xl font-semibold mb-2">
          Need to talk with a person?
        </h1>
        <span className="text-xs lg:text-base block">
          Our average response time is 30s
        </span>
        <Link className="bg-foreground-strong dark:bg-accent text-white px-4 py-2 sm:py-4 sm:px-10 rounded-3xl sm:rounded-full hover:bg-foreground dark:hover:bg-accent/80 transition font-medium cursor-pointer inline-block mt-8">
          Chat with us
        </Link>
      </div>
    </div>
  );
};

export default NeedHelp;
