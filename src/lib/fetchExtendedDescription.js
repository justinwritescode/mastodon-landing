import fetch from './fetch';

export default async function fetchExtendedDescription(setExtendedDescription) {
    await fetch(setExtendedDescription, '/api/v1/instance/extended_description');
}