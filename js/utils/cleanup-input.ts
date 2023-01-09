export function cleanupInput(input: string): string {
    if (input.match(/swiss|tournament/)) {
        return input.trim()
    }

    return input.split('/').pop()!.trim()
}
