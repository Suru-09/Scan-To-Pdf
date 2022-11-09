import React from 'react';

import httpUrlJson from '../../constants/httpUrl.json'

export const getNgrokHttps = () => {
    return httpUrlJson ? httpUrlJson.tunnels[0].public_url : `HTTP NOT FOUND state: ${httpUrlJson}`;
}