module.exports = {
    apps: [
        {
            name: 'faktoryWorker',
            script: 'yarn',
            args: 'rw exec faktoryWorker',
            interpreter: '/usr/bin/env',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
