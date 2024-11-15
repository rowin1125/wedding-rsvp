import { createId } from '@paralleldrive/cuid2';
import { Role } from '@prisma/client';
import type { APIGatewayProxyEvent, Context } from 'aws-lambda';

import {
    DbAuthHandler,
    DbAuthHandlerOptions,
} from '@redwoodjs/auth-dbauth-api';

import { db } from 'src/lib/db';
import Sentry from 'src/lib/sentry';
import { activateUserEmail } from 'src/services/users/users';

import { EMAIL_TEMPLATES_MAP, mailUser } from '../lib/email';

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
) => {
    const forgotPasswordOptions: DbAuthHandlerOptions['forgotPassword'] = {
        handler: async (user, resetToken) => {
            await mailUser({
                to: [
                    {
                        name: user.email,
                        email: user.email,
                    },
                ],
                templateId: EMAIL_TEMPLATES_MAP.PASSWORD_RESET,
                params: {
                    recoverUrl: `${process.env.REDWOOD_ENV_VERCEL_URL}/wachtwoord-herstellen?resetToken=${resetToken}`,
                },
            });

            return user;
        },

        // How long the resetToken is valid for, in seconds (default is 24 hours)
        expires: 60 * 60 * 24,

        errors: {
            // for security reasons you may want to be vague here rather than expose
            // the fact that the email address wasn't found (prevents fishing for
            // valid email addresses)
            usernameNotFound: 'Username not found',
            // if the user somehow gets around client validation
            usernameRequired: 'Username is required',
        },
    };

    const loginOptions: DbAuthHandlerOptions['login'] = {
        // handler() is called after finding the user that matches the
        // username/password provided at login, but before actually considering them
        // logged in. The `user` argument will be the user in the database that
        // matched the username/password.
        //
        // If you want to allow this user to log in simply return the user.
        //
        // If you want to prevent someone logging in for another reason (maybe they
        // didn't validate their email yet), throw an error and it will be returned
        // by the `logIn()` function from `useAuth()` in the form of:
        // `{ message: 'Error message' }`
        handler: (user) => {
            if (!user.verified) {
                throw new Error('Valideer je account eerst');
            }

            return user;
        },

        errors: {
            usernameOrPasswordMissing:
                'Both username and password are required',
            // for security reasons this message should be the same as the incorrectPassword message
            usernameNotFound:
                'Combinatie van gebruikersnaam en wachtwoord is onjuist of dit account bestaat niet',
            // For security reasons you may want to make this the same as the
            // usernameNotFound error so that a malicious user can't use the error
            // to narrow down if it's the username or password that's incorrect
            incorrectPassword:
                'Combinatie van gebruikersnaam en wachtwoord is onjuist of dit account bestaat niet',
        },

        // How long a user will remain logged in, in seconds
        expires: 60 * 60 * 24 * 365 * 10,
    };

    const resetPasswordOptions: DbAuthHandlerOptions['resetPassword'] = {
        // handler() is invoked after the password has been successfully updated in
        // the database. Returning anything truthy will automatically log the user
        // in. Return `false` otherwise, and in the Reset Password page redirect the
        // user to the login page.
        handler: (_user) => {
            return true;
        },

        // If `false` then the new password MUST be different from the current one
        allowReusedPassword: true,

        errors: {
            // the resetToken is valid, but expired
            resetTokenExpired: 'resetToken is expired',
            // no user was found with the given resetToken
            resetTokenInvalid: 'resetToken is invalid',
            // the resetToken was not present in the URL
            resetTokenRequired: 'resetToken is required',
            // new password is the same as the old password (apparently they did not forget it)
            reusedPassword: 'Must choose a new password',
        },
    };

    const signupOptions: DbAuthHandlerOptions['signup'] = {
        enabled: process.env.SIGN_UP_ENABLED === 'true',
        // Whatever you want to happen to your data on new user signup. Redwood will
        // check for duplicate usernames before calling this handler. At a minimum
        // you need to save the `username`, `hashedPassword` and `salt` to your
        // user table. `userAttributes` contains any additional object members that
        // were included in the object given to the `signUp()` function you got
        // from `useAuth()`.
        //
        // If you want the user to be immediately logged in, return the user that
        // was created.
        //
        // If this handler throws an error, it will be returned by the `signUp()`
        // function in the form of: `{ error: 'Error message' }`.
        //
        // If this returns anything else, it will be returned by the
        // `signUp()` function in the form of: `{ message: 'String here' }`.
        handler: async ({ username, hashedPassword, salt }) => {
            const verifiedToken = createId();
            let user;

            try {
                user = await db.user.create({
                    data: {
                        email: username,
                        hashedPassword: hashedPassword,
                        salt: salt,
                        // name: userAttributes.name
                        verifiedToken,
                        roles: {
                            create: {
                                name: Role.USER,
                            },
                        },
                    },
                });
                await activateUserEmail({
                    email: user.email,
                    verifiedToken,
                });
            } catch (error) {
                Sentry.captureException(error);

                throw new Error('Failed to sign up');
            }

            return `We hebben een bevestiging naar ${user.email} gestuurd. Activeer je account en ga aan de slag!`;
        },

        // Include any format checks for password here. Return `true` if the
        // password is valid, otherwise throw a `PasswordValidationError`.
        // Import the error along with `DbAuthHandler` from `@redwoodjs/api` above.
        passwordValidation: (_password) => {
            return true;
        },

        errors: {
            // `field` will be either "username" or "password"
            fieldMissing: '${field} is required',
            usernameTaken: 'Username `${username}` already in use',
        },
    };

    const authHandler = new DbAuthHandler(event, context, {
        // Provide prisma db client
        db: db,
        allowedUserFields: ['id', 'email', 'wedding', 'weddingId', 'roles'],
        // The name of the property you'd call on `db` to access your user table.
        // i.e. if your Prisma model is named `User` this value would be `user`, as in `db.user`
        authModelAccessor: 'user',

        // A map of what dbAuth calls a field to what your database calls it.
        // `id` is whatever column you use to uniquely identify a user (probably
        // something like `id` or `userId` or even `email`)
        authFields: {
            id: 'id',
            username: 'email',
            hashedPassword: 'hashedPassword',
            salt: 'salt',
            resetToken: 'resetToken',
            resetTokenExpiresAt: 'resetTokenExpiresAt',
        },

        // Specifies attributes on the cookie that dbAuth sets in order to remember
        // who is logged in. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies
        cookie: {
            HttpOnly: true,
            Path: '/',
            SameSite: 'Strict',
            Secure: process.env.NODE_ENV !== 'development',

            // If you need to allow other domains (besides the api side) access to
            // the dbAuth session cookie:
            // Domain: 'example.com',
        },

        forgotPassword: forgotPasswordOptions,
        login: loginOptions,
        resetPassword: resetPasswordOptions,
        signup: signupOptions,
    });

    return await authHandler.invoke();
};
