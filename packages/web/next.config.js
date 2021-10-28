/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@boocrit/controller"]);
module.exports = withTM({
  reactStrictMode: true
})