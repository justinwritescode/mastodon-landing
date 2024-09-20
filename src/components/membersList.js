import resizeAvatar from "./resizeAvatar";

export default function MembersList(directory, directoryLimit, setDirectoryLimit, API_ENDPOINT) {

    function seeMore() {
        if (directory.length <= directoryLimit) return (<></>);
        return (
            <li key={directoryLimit} className="min-w-24 min-h-24 md:min-w-36 md:min-h-36 cursor-pointer" onClick={() => setDirectoryLimit(directoryLimit + 10)}>
                <div className="w-16 h-16 md:w-24 md:h-24 mx-auto bg-indigo-600 hover:bg-indigo-700 rounded-full flex justify-center items-center">
                    <p className="mt-2 flex text-xl sm:text-5xl text-white animate-more-plus">+</p>
                </div>
                <span className="text-center block text-xs sm:text-xl font-bold my-3">See More</span>
            </li>
        );
    }

    return (
        <div className="my-24">
            <h2 className="subtitle">
                Some of our members
            </h2>
            <ul className="grid gap-x-6 gap-y-12 sm:gap-y-16 my-16 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
                {directory.slice(0, directoryLimit).map((account, index) => (
                    <li key={index} className="min-w-24 min-h-24 md:min-w-36 md:min-h-36">
                        <a className="w-full h-full hover:text-blue-700 dark:hover:text-blue-300 break-words" href={`${API_ENDPOINT}/@${account.username}`} title={`Visit ${account.display_name}'s profile`}>
                            <div className="w-16 h-16 md:w-24 md:h-24 mx-auto">
                                <img
                                    src={resizeAvatar(account.avatar, 108)} alt={`${account.username}'s avatar`}
                                    className="object-cover h-full rounded-full"
                                />
                            </div>
                            <span className="text-center block text-xs sm:text-sm md:text-md font-bold my-2">{account.display_name ? account.display_name : account.username}</span>
                            <span className="text-center hidden sm:block text-xs my-2">@{account.username}</span>
                        </a>
                    </li>
                ))}
                {seeMore()}
            </ul>
        </div>
    )
}