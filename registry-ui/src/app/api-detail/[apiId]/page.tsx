"use client"
import { useState } from "react";
import { useQuery, withWunderGraph } from "@/components/generated/nextjs";

import ApiOperations from "./ApiOperations";
import ApiOwner from "./ApiOwner";
import ApiApplications from "./ApiApplications";
import ApiVersions from "./ApiVersions";

const tabMode = {
    DEPENDANT_APPLICATIONS: 0,
    RECENT_OPERATIONS: 1,
    VERIONS: 2
}

const Page = ({ params }: { params: { apiId: string } }) => {
    const [tabState, setTabState] = useState(tabMode.DEPENDANT_APPLICATIONS);

    const decodedApiId = decodeURIComponent(params.apiId);
    const federatedGraphId = decodedApiId.split("|")[0];
    const apiName = decodedApiId.split("|")[1];

    const { data: apiList } = useQuery({
        operationName: "apiDetails",
        input: {
            federatedGraphId,
            apiName
        }
    });

    function buildTabClasses (tabIndex: number) {
        let css = tabState === tabIndex ? "text-blue-600 border-blue-600" : "text-gray-400 border-transparent";
        css += " inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
        return css;
    }

    const GridComponent = () => {
        switch (tabState) {
            case tabMode.DEPENDANT_APPLICATIONS:
                return <ApiApplications apiList={apiList} />;
            case tabMode.RECENT_OPERATIONS:
                return <ApiOperations apiList={apiList} />;
            case tabMode.VERIONS:
                return <ApiVersions apiList={apiList} />;
            default:
                return <ApiApplications apiList={apiList} />;
        }
    }

    return (
        <div className="pt-8" >
            <div>
                <div className="grid gap-4 max-w-screen-lg text-gray-400 dark:text-gray-500 flex items-center rounded  ">
                    <div>
                        <ApiOwner apiName={apiName} federatedGraphId={federatedGraphId} />
                    </div>
                    <div className="flex justify-center">
                        <div className="text-md font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                            <ul className="flex flex-wrap -mb-px cursor-pointer">
                                <li className="mr-2" onClick={() => { setTabState(tabMode.DEPENDANT_APPLICATIONS); }}>
                                    <a
                                        className={buildTabClasses(tabMode.DEPENDANT_APPLICATIONS)}>
                                        Dependent Applications
                                    </a>
                                </li>
                                <li className="mr-2" onClick={() => { setTabState(tabMode.RECENT_OPERATIONS); }}>
                                    <a className={buildTabClasses(tabMode.RECENT_OPERATIONS)}
                                        aria-current="page">Recent Operations</a>
                                </li>
                                <li className="mr-2" onClick={() => { setTabState(tabMode.VERIONS); }}>
                                    <a className={buildTabClasses(tabMode.VERIONS)}
                                        aria-current="page">Version History</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <GridComponent />
                </div>
            </div>
        </div>
    )
}

export default withWunderGraph(Page);
