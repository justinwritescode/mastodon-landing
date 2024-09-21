import axios from "axios";

export default async function fetchDirectory(setDirectory, setSlideshows) {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/landing`)
    .then(res => {
        // console.log(res);
        setDirectory(structuredClone(res.data));
        // set featured to 5 random accounts
        let random_set = structuredClone(res.data).sort(() => Math.random() - Math.random())
        let new_slideshows = [];
        let slideshow_length = Math.floor(random_set.length / 5);
        for (let i = 0; i < 5; i++) {
            new_slideshows.push(random_set.slice(i * slideshow_length, (i + 1) * slideshow_length));
        }
        setSlideshows(new_slideshows);
    })
    .catch(err => {
        console.log(err);
    })
}   