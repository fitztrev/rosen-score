<template>
    <div>
        <template v-if="isLoggedIn">
            <span class="text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                    />
                </svg>
                Logged in as
                <strong>{{ username }}</strong>
                <span
                    class="text-xs text-sky-900 underline decoration-dotted underline-offset-1 hover:decoration-dashed cursor-pointer"
                    @click.prevent="logout"
                >
                    (Logout)
                </span>
            </span>
        </template>
        <template v-else>
            <button
                type="button"
                class="block px-4 py-2 bg-slate-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-500 hover:shadow-lg focus:bg-slate-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-600 active:shadow-lg transition duration-150 ease-in-out"
                @click="login"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="inline h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>
                Login to Lichess
            </button>
        </template>
    </div>
</template>

<script>
import Cookies from 'js-cookie'

import { AccessContext, HttpClient, OAuth2AuthCodePKCE } from '@bity/oauth2-auth-code-pkce'

export const lichessHost = 'https://lichess.org'
export const clientId = 'example.com'
export const clientUrl = (() => {
    const url = new URL(location.href)
    url.search = ''
    return url.href
})()

export default {
    template: `
            `,

    data: function () {
        return {
            oauth: new OAuth2AuthCodePKCE({
                authorizationUrl: `${lichessHost}/oauth`,
                tokenUrl: `${lichessHost}/api/token`,
                clientId,
                scopes: [],
                redirectUrl: clientUrl,
                onAccessTokenExpiry: (refreshAccessToken) => refreshAccessToken(),
                onInvalidGrant: (_retry) => {},
            }),

            error: null,

            accessContext: null,
            username: null,
        }
    },

    computed: {
        isLoggedIn: function () {
            return !!this.username
        },
    },

    mounted: function () {
        if (Cookies.get('lichessAccessContext')) {
            this.accessContext = JSON.parse(Cookies.get('lichessAccessContext'))

            this.$emit('set-lichess-oauth-token', this.accessContext)
        }

        this.username = Cookies.get('lichessUsername') || null

        this.init()
    },

    methods: {
        login: async function () {
            await this.oauth.fetchAuthorizationCode()
        },

        init: async function () {
            try {
                const hasAuthCode = await this.oauth.isReturningFromAuthServer()
                if (hasAuthCode) {
                    this.accessContext = await this.oauth.getAccessToken()

                    Cookies.set('lichessAccessContext', JSON.stringify(this.accessContext), {
                        expires: 30,
                    })

                    await this.getProfile()

                    window.location = '/'
                }
            } catch (err) {
                this.error = err
            }
        },

        getProfile: async function () {
            // Example request using @bity/oauth2-auth-code-pkce decorator:
            // Requests will fail with 401 Unauthorized if the access token expired
            // or was revoked. Make sure to offer a chance to reauthenticate.
            const res = await fetch(`${lichessHost}/api/account`, {
                headers: {
                    Authorization: `Bearer ${this.accessContext.token.value}`,
                },
            })

            let account = await res.json()

            this.username = account.username

            Cookies.set('lichessUsername', this.username, { expires: 30 })
        },

        logout: async function () {
            // Example request using vanilla fetch: Revoke access token.
            await fetch(`${lichessHost}/api/token`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${this.accessContext.token.value}`,
                },
            })

            this.token = null
            this.error = null
            this.username = null

            Cookies.remove('lichessUsername')
            Cookies.remove('lichessAccessContext')

            window.location = '/'
        },
    },
}
</script>
