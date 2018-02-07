export function generateTxnId(): number {
    return Math.floor((Math.random() * 100000) + 1);
}
export function generateJsonPayload(data: string, templateName: string, did: string): string {
    return JSON.stringify({
        'did': did,
        'template': {
            'name': templateName
        },
        'data': data
    });
}

