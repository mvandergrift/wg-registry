"use client";

import { useQuery } from "@/components/generated/nextjs";
import { useRouter } from "next/navigation";

import DataGrid from "@/components/ui/DataGrid";
import Spinner from "@/components/ui/Spinner";

const AppList = () => {
    const router = useRouter();

    const { data: apiList, isLoading } = useQuery({
        operationName: "listAllApps"
    });

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
                    <div>{row.owner.forename} {row.owner.surname}</div>
                )
            }
        },
        {
            name: "",
            label: "Title",
            render: (row: any) => {
                return (
                    <div>{row.owner.title}</div>
                )
            }
        },
        {
            name: "",
            label: "Department",
            render: (row: any) => {
                return (
                    <div>{row.owner.department}</div>
                )
            }

        },
        {
            name: "",
            label: "Api Dependencies",
            render: (row: any) => {
                return (
                    <div className="text-right">{row.apis?.length}</div>
                )
            }
        }
    ]

    function handleRowClick (row: any) {
        router.push(`/app-detail/${row.id}`)
    }

    return (
        <>
            {isLoading
                ? (<Spinner />)
                : (
                    <DataGrid
                        data={apiList?.AppList}
                        title="Registered Applications"
                        subtitle="User submitted applications that consume registered APIs. Select an App to see more details."
                        columns={columns}
                        onRowClick={handleRowClick} />
                )
            }
        </>
    )
}

export default AppList;
