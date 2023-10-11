"use client";
import { useQuery } from "@/components/generated/nextjs";
import { useRouter } from "next/navigation";
import DataGrid from "@/components/ui/DataGrid";

const UserList = () => {
    const router = useRouter();

    const { data: userData } = useQuery({
        operationName: "userOverview"
    });

    const columns = [
        {
            name: "",
            label: "Forename",
            render: (row: any) => {
                return (
                    <div>{row.details.forename}</div>
                )
            }
        },
        {
            name: "",
            label: "Surname",
            render: (row: any) => {
                return (
                    <div>{row.details.surname}</div>
                )
            }            
        },
        {
            name: "",
            label: "Title",
            render: (row: any) => {
                return (
                    <div>{row.role.title}</div>
                )
            }

        },
        {
            name: "",
            label: "Department",
            render: (row: any) => {
                return (
                    <div>{row.role.department}</div>
                )
            }
        },
        {
            name: "",
            label: "Location",
            render: (row: any) => {
                return (
                    <div>{row.details.location}</div>
                )
            }

        }

    ]

    function handleRowClick (row: any) {
        router.push(`/api-detail/${encodeURIComponent(row.federatedGraphId)}|${encodeURIComponent(row.name)}`)
    }

    return (
        <DataGrid 
            data={userData?.UserList} 
            title="External Users" 
            subtitle="List of users from Cosmo API. Exists primarily to generate traffic through Cosmo."
            columns={columns} 
            onRowClick={handleRowClick} />
    )
}

export default UserList;
