export default function AccountStack(start, end, API_ENDPOINT, slideshows) {
    const anchor_class = "block w-20 lg:w-36 xl:w-48 h-32 lg:h-48 xl:h-72 ml-8";
    const container_class = "rounded-xl bg-white h-full"
    const image_spacing = "h-full my-12"

    // Create placeholders so the layout doesn't jump around
    const indices = Array.from(Array(end - start).keys());
    if (slideshows.length < end) return indices.map((index) => (
        <div className={anchor_class} key={index}>
            <div className={container_class}>
                <div
                    className={image_spacing}
                />
            </div>
        </div>
    ));

    const resizeAvatar = (src, size) => {
        if (src && size && src.includes('/s:/')) {
            return src.replace('/s:/', '/s:' + size + ':' + size + '/');
        } else {
            return src;
        }
    }

    return slideshows.slice(start, end).map((slideshow) => (slideshow).slice(0, 1).map((account, index) =>
        (account === undefined) ? (<></>) : (
            <a href={`${API_ENDPOINT}/@${account.username}`} key={index} className={anchor_class} title={`Visit ${account.display_name}'s profile`}>
                <div className="rounded-xl bg-white h-full">
                    <img
                        src={resizeAvatar(account.avatar, 324)} alt={`${account.username}'s avatar`}
                        className={`${image_spacing} object-cover rounded-xl shadow-lg bg-white animate-slide-in`}
                        onLoad={(e) => {
                            // trigger animation
                            e.target.classList.remove('animate-slide-in');
                            void e.target.offsetWidth;
                            e.target.classList.add('animate-slide-in');
                        }}
                    />
                </div>
            </a>
        )));
}