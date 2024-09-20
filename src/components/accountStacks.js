import AccountStack from "./accountStack";

export default function AccountStacks(API_ENDPOINT, slideshows) {
    return (
        <div className="flex-auto hidden sm:block">
            <div className="flex">
                <div className="md:flex-1 md:my-auto hidden md:block">
                    {AccountStack(0, 1, API_ENDPOINT, slideshows)}
                </div>

                <div className="md:flex-1 md:mt-16">
                    {AccountStack(1, 3, API_ENDPOINT, slideshows)}
                </div>

                <div className="md:flex-1">
                    {AccountStack(3, 5, API_ENDPOINT, slideshows)}
                </div>
            </div>
        </div>
    );
}