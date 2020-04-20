export function containsAny (str: string, targets: string[]): string | undefined {
    let matched: string | undefined;

    for (let index = 0; index < targets.length; index++) {
        const target = targets[index];
        if (str.includes(target)) {
            matched = target;
            break;
        }
    }
    return matched;
}