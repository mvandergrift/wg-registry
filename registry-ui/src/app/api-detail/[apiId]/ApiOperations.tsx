"use client";
import type { ApiDetailsResponseData } from "@/components/generated/models";
import DataGrid from "@/components/ui/DataGrid";

function formatTime (time?: string) {
    if (!time) return ""
    const date = new Date(time);
    return date.toLocaleString();
}

function formatDuration (duration?: number) {
    return duration ? `${(duration / 1000 / 1000).toFixed(2)} ms` : ""
}

const ApiOperations = ({ apiList }: { apiList?: ApiDetailsResponseData }) => {
    const columns = [
        {
            name: "",
            label: "Time",
            render: (row: any) => {
                return (
                    <div>{formatTime(row?.accessTime)}</div>
                )
            }

        },
        {
            name: "operationName",
            label: "Operation Name"
            
        },
        {
            name: "operationId",
            label: "Operation Id"            
        },
        {
            name: "",
            label: "Duration",
            render: (row: any) => {
                return (
                    <div className="text-right">{formatDuration(row.duration)}</div>
                )
            }

        }
    ]

    const apiDetails = apiList?.ApiDetails;

    return (
        <>
            <section className="bg-white dark:bg-gray-900 sm:rounded-md">
                <div className="flex-1 justify-center">
                    <DataGrid 
                        data={apiDetails?.operations} 
                        columns={columns} 
                        title="Recent Operations"
                        subtitle="Unique Operations Accessing this API"/>
                </div>
            </section>
        </>
    )
}

export default ApiOperations;
