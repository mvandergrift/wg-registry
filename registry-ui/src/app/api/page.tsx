"use client"

import { useQuery, withWunderGraph } from "@/components/generated/nextjs";

import ApiList from "./ApiList";
import Spinner from "@/components/ui/Spinner";

const Page = () => {
    const { data: apiList, isLoading } = useQuery({
        operationName: "listAllApis"
    });

    return (
        <div>
            <div>
                <div className="grid gap-4">
                    {isLoading
                        ? (<Spinner />)
                        : (<ApiList apiList={apiList} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default withWunderGraph(Page);
