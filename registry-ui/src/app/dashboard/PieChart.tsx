"use client"
import React, { useState, useEffect } from "react";

import type { ListAllApisResponseData } from "@/components/generated/models";

export default function PieChart ({ height, data, onSliceClick }: { height: number, data?: ListAllApisResponseData, onSliceClick?: (event: any, chartContext: any, config: any) => void }) {
    const [ReactApexChart, setChart] = useState<any>();

    const options = {
        series: data?.ApiList.map((item: any) => item.applications.length),
        labels: data?.ApiList.map((item: any) => item.name),
        chart: {
            events: {
                dataPointSelection: (event: unknown, chartContext: unknown, config: unknown) => {
                    onSliceClick && onSliceClick(event, chartContext, config);
                }
            }
        },
        colors: [
            "#3F83F8",
            "#FCE96A",
            "#4B5563"
        ],  
        legend: {
            labels: {
                colors: [
                    "#aaa",
                    "#aaa",
                    "#aaa"                   
                ]
            }
        }

    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            setChart(() => require("react-apexcharts").default);
        }
    }, []);

    return (
        <section className="bg-white dark:bg-gray-900 sm:rounded-md py-4">
            <div className="pb-4 pt-2 pl-8 font-bold text-gray-900 dark:text-gray-400 ">Application Dependencies</div>
            {ReactApexChart && options.series && <ReactApexChart
                options={options}
                series={options.series}
                type="pie"
                height={height}
                width="100%"
            />}
        </section>
    )
}
