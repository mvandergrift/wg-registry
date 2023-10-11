"use client"

import { useQuery, withWunderGraph } from "@/components/generated/nextjs";

import ApiList from "./ApiList";

const Page = () => {
    const { data: apiList } = useQuery({
        operationName: "listAllApis"
    });

    return (
        <div>
            <div>
                <div className="grid gap-4">
                    <ApiList apiList={apiList} />
                </div>
            </div>
        </div>
    )
}

export default withWunderGraph(Page);
