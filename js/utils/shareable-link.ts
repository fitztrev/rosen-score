import { ReportSource } from '../types/types'
import { cleanupInput } from './cleanup-input'

export type ShareableLink = {
  source: ReportSource
  username: string
}

export function normalizeReportSource(
  source: string | null | undefined
): ReportSource | null {
  if (source === 'lichess') {
    return 'lichess'
  }

  if (source === 'chesscom' || source === 'chess.com') {
    return 'chesscom'
  }

  return null
}

function getQuery(search?: string): string {
  let query = search

  if (query == null && typeof location !== 'undefined') {
    query = location.search
  }

  if (query && query.startsWith('?')) {
    query = query.slice(1)
  }

  return query ?? ''
}

export function parseShareableLink(search?: string): ShareableLink | null {
  const params = new URLSearchParams(getQuery(search))
  const source = normalizeReportSource(params.get('source'))
  const rawUsername = params.get('username') ?? params.get('user')

  if (!source || !rawUsername) {
    return null
  }

  const username = cleanupInput(rawUsername)

  if (!username) {
    return null
  }

  return {
    source,
    username,
  }
}

export function generateShareableLink(
  source: ShareableLink | ReportSource,
  usernameOrBaseUrl?: string,
  baseUrl?: string
): string {
  let link: ShareableLink
  let base: string | undefined

  if (typeof source === 'object') {
    link = source
    base = usernameOrBaseUrl
  } else {
    link = {
      source,
      username: cleanupInput(usernameOrBaseUrl ?? ''),
    }
    base = baseUrl
  }

  if (!base) {
    base =
      typeof location !== 'undefined'
        ? location.origin + location.pathname
        : 'https://rosenscore.com/'
  }

  const url = new URL(base)
  url.search = ''
  url.hash = ''
  url.searchParams.set('source', link.source)
  url.searchParams.set('username', link.username)

  return url.toString()
}

export const createShareableLink = generateShareableLink
export const parseShareLink = parseShareableLink

export default {
  parseShareableLink,
  generateShareableLink,
}
