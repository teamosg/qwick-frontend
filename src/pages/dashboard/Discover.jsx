import Card from "@/components/dashboard/Card";

const Discover = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb] dark:bg-zinc-950 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {Array.from({ length: 9 }).map((_, i) => (
          <Card key={i} progress={7} />
        ))}
      </div>
    </div>
  );
};

export default Discover;
