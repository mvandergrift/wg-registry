"use client";
import type { ApiDetailsResponseData } from "@/components/generated/models";
import DataGrid from "@/components/ui/DataGrid";

function formatTime (time?: string) {
    if (!time) return ""
    const date = new Date(time);
    return date.toLocaleString();
}

export default function ApiVersions ({ apiList }: { apiList?: ApiDetailsResponseData }) {
    const columns = [
        {
            name: "",
            label: "Time",
            render: (row: any) => {
                return (
                    <div>{formatTime(row.createdAt)}</div>
                )
            }

        },
        {
            name: "compositionErrors",
            label: "Errors"            
        }
    ]

    const apiDetails = apiList?.ApiDetails;

    return (
        <>
            <section className="bg-white dark:bg-gray-900 sm:rounded-md">
                <div className="flex-1 justify-center">
                    <DataGrid 
                        data={apiDetails?.versions} 
                        columns={columns} 
                        title="API Revisions"
                        subtitle="Could be based on a traversal of schema_version_change_action?"/>
                </div>
            </section>
        </>
    )
}
