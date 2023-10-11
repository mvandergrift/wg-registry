"use client"
import { useQuery, withWunderGraph } from "@/components/generated/nextjs";
import { useRouter } from "next/navigation";

import ApiList from "../api/ApiList";
import TopLineStats from "./TopLineStats";
import PieChart from "./PieChart";
import Spinner from "@/components/ui/Spinner";

const Page = () => {
    const router = useRouter();

    const { data: apiList, isLoading } = useQuery({
        operationName: "listAllApis"
    });

    if (isLoading && !apiList) {
        return (
            <Spinner />
        ) 
    }

    function handleSlickClick (event: unknown, chartContext: unknown, config: { dataPointIndex: number }) {
        const selectedItem = apiList?.ApiList[config.dataPointIndex];        
        if (selectedItem) {
            router.push(`/api-detail/${selectedItem.federatedGraphId}|${selectedItem.name}`);
        }
    }

    return (
        <div>
            <div>
                <div className="grid gap-4">
                    <ApiList apiList={apiList} />
                    <div className="grid lg:grid-cols-2 gap-4">
                        <div><PieChart height={300} data={apiList} onSliceClick={handleSlickClick} /></div>
                        <div><TopLineStats /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withWunderGraph(Page);
