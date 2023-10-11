import DataGrid from "@/components/ui/DataGrid";

const ApiList = ({ apiList }: { apiList?: Array<Record<string, any>> }) => {
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

    return (
        <DataGrid 
            data={apiList} 
            title="Registered APIs" 
            subtitle="This applications depends on them."
            columns={columns} />
    )
}

export default ApiList;
