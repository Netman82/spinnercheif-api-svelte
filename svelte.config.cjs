const preprocess = require("svelte-preprocess");
// import preprocess from "svelte-preprocess";
// import tailwind from "tailwindcss";
// import autoprefixer from "autoprefixer";

const config = {
    preprocess: [
        preprocess({
            postcss: true,
        }),
    ],
};

module.exports = config;