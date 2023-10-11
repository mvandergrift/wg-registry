"use client";

import { useRouter } from "next/navigation";

import DataGrid from "@/components/ui/DataGrid";

import type { ListAllApisResponseData } from "@/components/generated/models";

function formatTime (time?: string) {
    if (!time) return ""
    const date = new Date(time);
    return date.toLocaleDateString();
}

const ApiList = ({ apiList }: { apiList?: ListAllApisResponseData }) => {
    const router = useRouter();

    const columns = [
        {
            name: "name",
            label: "Name"
        },
        {
            name: "",
            label: "Owner",
            render: (row: any) => {
                return (
                    <div>{row.owner?.forename} {row.owner?.surname}</div>
                )
            }
        },
        {
            name: "",
            label: "Department",
            render: (row: any) => {
                return (
                    <div>{row.owner?.department}</div>
                )
            }

        },
        {
            name: "",
            label: "App Dependents",
            render: (row: any) => {
                return (
                    <div className="text-right">{row.applications?.length}</div>
                )
            }

        },
        {
            name: "",
            label: "Recent Operations",
            render: (row: any) => {
                return (
                    <div className="text-right">{row.operations?.length}</div>
                )
            }
        },
        {
            name: "",
            label: "Last Accessed",
            render: (row: any) => {
                return (
                    <div className="text-right">{formatTime(row.operations?.[0]?.accessTime)}</div>
                )
            }
        }

    ]

    function handleRowClick (row: any) {
        router.push(`/api-detail/${encodeURIComponent(row.federatedGraphId)}|${encodeURIComponent(row.name)}`)
    }

    return (
        <DataGrid 
            data={apiList?.ApiList} 
            title="Your Organization's APIs" 
            subtitle="Discovered from Cosmo Router. Select an API to see more details."
            columns={columns} 
            onRowClick={handleRowClick} />
    )
}

export default ApiList;
