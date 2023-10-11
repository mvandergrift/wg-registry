export default function TopLineStats () {
    return (
        <section className=" h-full items-center flex bg-white dark:bg-gray-900 sm:rounded-md">
            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl md:text-4xl font-extrabold">3</dt>
                        <dd className="font-light text-gray-500 dark:text-gray-400">APIs</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl md:text-4xl font-extrabold">25</dt>
                        <dd className="font-light text-gray-500 dark:text-gray-400">dependencies</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl md:text-4xl font-extrabold">21</dt>
                        <dd className="font-light text-gray-500 dark:text-gray-400">applications</dd>
                    </div>
                </dl>
            </div>
        </section>
    )
}
