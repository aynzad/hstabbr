// TODO: add support for words like eXternal
export function highlightFirstLetter(_abbreviation: string, definition: string) {
    const definitionTokens = definition.split(' ')

    return definitionTokens.map(definitionToken => ({
        pre: '',
        bold: definitionToken[0].toUpperCase(),
        post: definitionToken.slice(1)
    }))
}
