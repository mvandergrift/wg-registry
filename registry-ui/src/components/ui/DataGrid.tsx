import React, { useState } from "react";
export interface DataListColumn {
    name: string
    label: string
    render?: (value: any) => React.ReactNode
}

export default function DataList({ title, subtitle, data, columns, onRowClick }: { data?: Array<Record<string, unknown>>, columns: DataListColumn[], title?: string, subtitle?: string, onRowClick?: (row: any) => void }) {
    const [search, setSearch] = useState("");
    
    function tableFilter(searchFilter: string) {
        const filter = searchFilter.toUpperCase();
        console.log("filter", filter, searchFilter)
        const table = document.getElementById("dataTable");        
        
        if (!table) return;

        const tr = table.getElementsByTagName("tr");        

        // Loop through all table rows, and hide those who don't match the search query
        for (let i = 0; i < tr.length; i++) {            
            for (let j = 0; j < tr[i].getElementsByTagName("td").length; j++) {
                const td = tr[i].getElementsByTagName("td")[j];
                if (td) {                    
                    const txtValue = td.textContent ?? td.innerText;                    
                    if (!filter || filter === "" || txtValue.toUpperCase().includes(filter)) {
                        tr[i].style.display = "";                        
                        break;
                    } else {
                        tr[i].style.display = "none";                        
                    }
                }
            }
        }
    }

    function getVisibleRowCount() {
        const table = document.getElementById("dataTable");                        
        const tr = table?.getElementsByTagName("tr");
        const rows = Array.prototype.slice.call(tr ?? {});
        return (rows.filter((row) => row.style.display !== "none").length) - 1;
    }

    return (
        <div className="overflow-x-auto relative bg-white dark:bg-gray-900 sm:rounded-md p-4">
            <div className="p-4 ">
                <p className="flex justify-center pt-8 mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{title}</p>
                <p className="flex justify-center font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400 pt-2 mb-8">{subtitle}</p>
                <label className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); tableFilter(e.target.value); }}
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for items" />
                </div>
            </div>
            <table id="dataTable" className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {columns.map((column, i) => (
                            <th key={i} scope="col" className="px-6 py-3">
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row, i) => (
                        // TODO: Accept a key column prop and use it here
                        <tr key={i} className={`${onRowClick ? "cursor-pointer" : "cursor-auto"} border-b hover:bg-gray-50 dark:hover:bg-gray-600`} onClick={() => { onRowClick && onRowClick(row); }}>
                            {columns.map((column, i) => (
                                <td key={i} className="px-6 py-4">
                                    {column.render && column.render(row)}
                                    {row[column.name] as string}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="p-4 flex items-center justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-{getVisibleRowCount()}</span> of <span className="font-semibold text-gray-900 dark:text-white">{getVisibleRowCount()}</span></span>
                <ul className="inline-flex -space-x-px text-sm h-8">
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white">Previous</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-blue-50 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
