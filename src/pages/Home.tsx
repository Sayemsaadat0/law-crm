import { StatsCard } from "@/components/shared/StatsCard";
import { DollarSign, Users, UserPlus, BarChart3 } from "lucide-react";

function Home() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatsCard
          icon={<DollarSign className="w-6 h-6" />}
          title="Today's Money"
          value="$53k"
          percentage="+55%"
          description="than last week"
          percentageColor="text-green-500"
        />
        <StatsCard
          icon={<Users className="w-6 h-6" />}
          title="Today's Users"
          value="2,300"
          percentage="+3%"
          description="than last month"
          percentageColor="text-green-500"
        />
        <StatsCard
          icon={<UserPlus className="w-6 h-6" />}
          title="New Clients"
          value="3,462"
          percentage="-2%"
          description="than yesterday"
          percentageColor="text-red-500"
        />
        <StatsCard
          icon={<BarChart3 className="w-6 h-6" />}
          title="Sales"
          value="$103,430"
          percentage="+5%"
          description="than yesterday"
          percentageColor="text-green-500"
        />
      </div>
    </div>
  );
}

export default Home;
