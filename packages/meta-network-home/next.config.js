/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['react-hls-player']);
module.exports = withTM({ reactStrictMode: true });
