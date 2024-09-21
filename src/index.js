import './styles/global.css';

import * as React from 'react';
import * as ReactDom from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import Layout from './components/layout';
import Root from './routes/root';
import Privacy from './routes/privacy';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />
    },
    {
        path: '/privacy',
        element: <Privacy />
    },
]);

ReactDom.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Layout>
            <RouterProvider router={router} />
        </Layout>
    </React.StrictMode>
);