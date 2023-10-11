"use client";
import { useQuery } from "@/components/generated/nextjs";
import DataGrid from "@/components/ui/DataGrid";

const ApiApplications = ({ apiName, federatedGraphId }: { apiName: string, federatedGraphId: string }) => {
    const { data: apiList } = useQuery({
        operationName: "apiDetails",
        input: {
            federatedGraphId,
            apiName
        }
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
        }
    ]

    const apps = apiList?.ApiDetails?.applications;

    return (
        <>
            <section className="bg-white dark:bg-gray-900 sm:rounded-md">
                <div className="flex-1 justify-center">
                    <DataGrid data={apps} columns={columns} title="Dependent Applications" subtitle="These applications have registered their dependencies on this API"/>
                </div>
            </section>
        </>
    )
}

export default ApiApplications;
