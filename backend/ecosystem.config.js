module.exports = {
    apps: [
        {
            name: "Task",
            script: "./configuration/index.js",
            watch: true,
            env: { node_env: "devel", port: 3151 },
            env_production: { node_env: "prod", port: 3151 }
        }
    ]
}