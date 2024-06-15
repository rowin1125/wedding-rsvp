module.exports = {
    apps: [
        {
            name: 'faktoryWorker',
            script: 'yarn',
            args: 'rw exec faktoryWorker',
            interpreter: '/usr/bin/env',
            env_production: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development',
            },
        },
        {
            name: 'cron',
            script: 'yarn',
            args: 'rw exec cron',
            interpreter: '/usr/bin/env',
            env_production: {
                NODE_ENV: 'production',
            },
        },
        {
            name: 'Bruiloft Buddy App',
            script: 'yarn',
            args: 'rw dev',
            interpreter: '/usr/bin/env',
        },
        {
            name: 'Prisma Studio',
            script: 'yarn',
            args: 'rw prisma studio',
            interpreter: '/usr/bin/env',
        },
    ],
};
