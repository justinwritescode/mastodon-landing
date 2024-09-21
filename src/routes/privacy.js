// get data from API path #{backend}/api/v1/directory?order=active&local=false&limit=20

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GridBackground from '../components/grid_background';
import FAQ from '../components/faq';
import Rules from '../components/rules';
import InstanceStats from '../components/instanceStats';
import AccountStacks from '../components/accountStacks';
import MembersList from '../components/membersList';
import Loading from '../components/loading';
import fetchExtendedDescription from '../lib/fetchExtendedDescription';
import fetchDirectory from '../lib/fetchDirectory';
import "./accordion.css";
import { fetchInstance, fetchInstanceV2 } from '../lib/fetchInstance';
import fetch from '../lib/fetch';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export default function Root() {
    const [privacyPolicy, setPrivacyPolicy] = useState([]);
    const [dots, setDots] = useState('');

    useEffect(() => {
        fetch(setPrivacyPolicy, '/api/v1/instance/privacy_policy');
    }, []);

    return (privacyPolicy) ? (
        <>
            <GridBackground />
            <div className="">
                <div className="flex">
                    <div className="flex-auto my-auto">
                        <h1 className="title pb-8 font-bold">
                            Privacy Policy
                        </h1>
                    </div>
                </div>

                <div className="flex flex-col markdown">
                    <div className="flex-1 max-w-2xl xl:max-w-none" dangerouslySetInnerHTML={{ __html: privacyPolicy.content }} />
                </div>
            </div>
        </>
    ) : (new Loading());
}