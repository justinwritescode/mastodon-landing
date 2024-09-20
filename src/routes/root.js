// get data from API path #{backend}/api/v1/directory?order=active&local=false&limit=20

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GridBackground from '../components/grid_background';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import FAQ from '../components/faq';
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

    const resizeAvatar = (src, size) => {
        if (src && size && src.includes('/s:/')) {
            return src.replace('/s:/', '/s:' + size + ':' + size + '/');
        } else {
            return src;
        }
    }

    function accountStack(start, end) {
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

    function accountStacks() {
        return (
            <div className="flex-auto hidden sm:block">
                <div className="flex">
                    <div className="md:flex-1 md:my-auto hidden md:block">
                        {accountStack(0, 1)}
                    </div>

                    <div className="md:flex-1 md:mt-16">
                        {accountStack(1, 3)}
                    </div>

                    <div className="md:flex-1">
                        {accountStack(3, 5)}
                    </div>
                </div>
            </div>
        );
    }

    function instanceStats() {
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

    function accountList() {

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

    function Rules() {
        const [expanded, setExpanded] = useState(null);

        if (instance === null) { return (<div>Loading</div>); }

        const toggleExpanded = (index) => {
            setExpanded(expanded === index ? null : index);
        };

        if (instance === null) { return (<div>Loading</div>); }
        return (
            <div className="my-24">
                <h2 className="subtitle">
                    Our Rules
                </h2>
                <ul className="grid gap-x-8 gap-y-12 my-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {instance.rules.map((rule, index) => (
                        <li key={index} className="text-md mb-4">
                            <span className="block text-2xl mb-4 cursor-pointer" onClick={() => toggleExpanded(index)}>
                                Rule #{index + 1}
                            </span>
                            <span className="block text-lg dark:text-white tracking-widest leading-8">{rule.text}</span>
                            <div className={`accordion-content ${expanded === index ? 'expanded' : ''}`}>
                                <span className="block text-md dark:text-gray-400 pt-2">{rule.hint}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    function FAQ() {
        if (instance === null) { return (<div>Loading</div>); }
        const faqs = instance.faqs;
        return (
            <div className="divide-y divide-gray-400/10">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
                <dl className="mt-10 space-y-6 divide-y divide-gray-400/10">
                    {faqs.map((faq) => (
                        <Disclosure as="div" key={faq.question} className="pt-6">
                            {({ open }) => (
                                <>
                                    <dt>
                                        <Disclosure.Button className="flex w-full items-start justify-between text-left">
                                            <span className="text-lg font-bold leading-7">{faq.question}</span>
                                            <span className="ml-6 flex h-7 items-center">
                                                {open ? (
                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                ) : (
                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                )}
                                            </span>
                                        </Disclosure.Button>
                                    </dt>
                                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                        <p className="text-md leading-7 dark:text-white my-4">{faq.answer}</p>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </dl>
            </div>
        );
    }


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
                    {accountStacks()}
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
                        {instanceStats()}
                    </div>
                </div>

                {accountList()}

                {Rules()}

                {FAQ()}
            </div>
        </>
    );
}