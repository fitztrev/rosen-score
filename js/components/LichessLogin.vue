<template>
    <div>
        <template v-if="isLoggedIn">
            <div class="text-sm mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                    />
                </svg>
                Logged in as
                <strong>{{ username }}</strong>
                <span class="dotted-underline text-xs text-sky-900 cursor-pointer" @click.prevent="logout"> (Logout) </span>
            </div>
        </template>
        <template v-else>
            <span class="uppercase text-xs">Optional:</span>

            <button
                type="button"
                class="block px-4 py-2 bg-slate-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-500 hover:shadow-lg focus:bg-slate-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-600 active:shadow-lg transition duration-150 ease-in-out"
                @click="login"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>
                Login to Lichess
            </button>
            <p class="mt-2 text-xs">
                Lichess allows much faster download of games if you login.
                <br />
                <strong>3x</strong> faster when downloading your own games, <strong>1.5x</strong> faster for all others
                <br />
                You can learn more about this
                <a href="https://lichess.org/api#operation/apiGamesUser" target="_blank" class="text-sky-900 dotted-underline">here</a>
            </p>
        </template>
    </div>
</template>

<script lang="ts">
import { OAuth2AuthCodePKCE } from '@bity/oauth2-auth-code-pkce'

export const lichessHost = 'https://lichess.org'
export const clientId = 'https://rosen-score.vercel.app/'
export const clientUrl = (() => {
    const url = new URL(location.href)
    url.search = ''
    return url.href
})()

export default {
    data() {
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

            username: '',
        }
    },

    computed: {
        isLoggedIn(): boolean {
            return !!window.localStorage.getItem('lichessToken')
        },
    },

    mounted() {
        const lichessToken = window.localStorage.getItem('lichessToken')
        if (lichessToken) {
            this.$emit('set-lichess-oauth-token', lichessToken)
        }

        this.username = window.localStorage.getItem('lichessUsername') ?? ''

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
                    let accessContext = await this.oauth.getAccessToken()

                    window.localStorage.setItem('lichessToken', accessContext.token!.value)

                    await this.getProfile()

                    window.location.assign('/')
                }
            } catch (error) {
                // user probably hit "Cancel" on the auth server
            }
        },

        getProfile: async function () {
            // Example request using @bity/oauth2-auth-code-pkce decorator:
            // Requests will fail with 401 Unauthorized if the access token expired
            // or was revoked. Make sure to offer a chance to reauthenticate.
            const res = await fetch(`${lichessHost}/api/account`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('lichessToken')}`,
                },
            })

            let account = await res.json()

            window.localStorage.setItem('lichessUsername', account.username)
        },

        logout: async function () {
            // Example request using vanilla fetch: Revoke access token.
            await fetch(`${lichessHost}/api/token`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('lichessToken')}`,
                },
            })

            window.localStorage.clear()

            window.location.assign('/')
        },
    },
}
</script>
