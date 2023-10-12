"use client"
import AppOwner from "./AppOwner";

export default function Page ({ params }: { params: { appId: number } }) {            
    return (
        <div className="pt-8" >
            <div className="">
                <div className="grid gap-4 max-w-screen-lg text-gray-400 dark:text-gray-500 flex items-center rounded  ">
                    <div>
                        <AppOwner appId={params.appId} />
                    </div>
                </div>
            </div>
        </div>
    )
}
