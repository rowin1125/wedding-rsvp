module.exports = {
    apps: [
        {
            name: 'faktoryWorker',
            script: 'yarn',
            args: 'rw exec faktoryWorker',
            interpreter: 'bash',
        },
    ],
};
