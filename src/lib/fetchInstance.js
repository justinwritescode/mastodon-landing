import axios from 'axios';
import fetch from './fetch';

export async function fetchInstance(setInstance) {
    await fetch(setInstance, '/api/v1/instance');
}

export async function fetchInstanceV2(setInstanceV2) {
    await fetch(setInstanceV2, '/api/v2/instance');
}