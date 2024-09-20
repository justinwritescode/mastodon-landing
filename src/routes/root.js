// get data from API path #{backend}/api/v1/directory?order=active&local=false&limit=20

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GridBackground from '../components/grid_background';
import FAQ from '../components/faq';
import Rules from '../components/rules';
import InstanceStats from '../components/instanceStats';
import AccountStacks from '../components/accountStacks';
import MembersList from '../components/membersList';
import "./accordion.css";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export default function Root() {
    const [directory, setDirectory] = useState([]);
    const [directoryLimit, setDirectoryLimit] = useState(20);
    const [slideshows, setSlideshows] = useState([]);
    const [instance, setInstance] = useState(null);

    useEffect(() => {
        axios.get(`${API_ENDPOINT}/api/v1/landing`)
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

        axios.get(`${API_ENDPOINT}/api/v1/instance`)
            .then(res => {
                // console.log(res);
                setInstance(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    // every 10 seconds, rotate the slideshows
    useEffect(() => {
        const interval = setInterval(() => {
            let new_slideshows = structuredClone(slideshows);

            // pick a random index to move first index to last index
            let random_index = Math.floor(Math.random() * new_slideshows.length);
            let slideshow = new_slideshows[random_index];
            slideshow.push(slideshow.shift());

            new_slideshows[random_index] = slideshow;
            setSlideshows(new_slideshows);
        }, 8000);
        return () => clearInterval(interval);
    }, [slideshows]);

    return (
        <>
            <GridBackground />
            <div className="">
                <div className="flex">
                    <div className="flex-auto my-auto">
                        <h1 className="title pb-8 font-bold">
                            The first federated social media hub for POZ fetishists by POZ fetishists!
                        </h1>

                        <a href={`${API_ENDPOINT}/auth/sign_up`} type="button" className="inline-flex button mr-4 bg-indigo-600 hover:bg-indigo-700 text-white animate-wiggle">
                            Create Account
                        </a>

                        <a href={`${API_ENDPOINT}/auth/sign_in`} type="button" className="button bg-gray-100 hover:bg-gray-200 text-gray-900 border">
                            Log in
                        </a>
                    </div>
                    {AccountStacks(API_ENDPOINT, slideshows)}
                </div>

                <div className="flex flex-col lg:flex-row gap-y-12 my-16">
                    <div className="flex-1 max-w-2xl xl:max-w-none">
                        <h2 className="subtitle">
                            Made by POZ fetishists and BUGCHASERS, not billionaires
                        </h2>
                        <p className="text-md font-bold mb-4">
                            Our motive is to help get you off with as much nasty POZZING content as pozzible!
                        </p>
                        <p className="text-md mb-4">
                            The CHASERS and GIFTERS here would be delighted for you to join us! While there are fewer of us than on billionaire-run social media, we connect with other decentralized social networks. You can interact with the excellent people on Mastodon, Lemmy, KBin, Pixelfed, or PeerTube from POZ.world.
                        </p>

                        <p className="text-md">
                            There are no fees to use POZ.world. We want you to be our newest friend. Let's make POZ babies together! Generous crowd-funders pay for our server costs.
                        </p>
                    </div>
                    <div className="flex flex-shrink mx-auto xl:flex-1 justify-center lg:justify-end">
                        {InstanceStats(instance)}
                    </div>
                </div>

                {MembersList(directory, directoryLimit, setDirectoryLimit, API_ENDPOINT)}

                {Rules(instance)}

                {FAQ(instance)}
            </div>
        </>
    );
}