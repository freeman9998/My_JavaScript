/** @type {import('next').NextConfig} */

import { config } from 'process';

const nextConfig = {};
// const nextConfig = {
//     output: APP_ENV === 'local' ? undefined : 'standalone',
//     typescript: {
//         ignoreBuildErrors:true
//     },
//     webpack: (config,option) => {
//         if (!option.isServer) {
//             config.plugins.push(new NextFederationPlugin({name:'project',filename: 'static/chunks/remoteEntry.js',exposes:{'./ScreenOperator':path.resolve(__dirname,'src','screens','ScreenOperator.tsx')}}))
//             return config
//         }
//     }
// }


export default nextConfig;
