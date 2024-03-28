export function cleanupInput(input: string): string {
    if (/swiss|tournament/.exec(input)) {
        return input.trim()
    }

    return input.split('/').pop()!.trim()
}
