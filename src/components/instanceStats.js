export default function InstanceStats(instance) {
    if (instance === null) { return (<div>Loading</div>); }

    return (
        <dl className="flex flex-row lg:flex-col gap-y-8 gap-x-12 text-center lg:text-left justify-center">
            {
                [
                    {
                        title: "Perverted Poz Pigs",
                        value: instance.stats.user_count,
                    },
                    {
                        title: "Posts",
                        value: instance.stats.status_count,
                    },
                    {
                        title: "Affiliated servers",
                        value: instance.stats.domain_count,
                    }
                ].map((stat, index) => (
                    <div key={index} className="">
                        <dt className="text-2xl sm:text-5xl font-bold text-black dark:text-neutral-100">{stat.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</dt>
                        <dd className="text-sm sm:text-md py-2">{stat.title}</dd>
                    </div>
                ))
            }
        </dl>
    );
}