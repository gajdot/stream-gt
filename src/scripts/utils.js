export const moduleName = 'stream-gt';

export function findTokenById(tokenId) {
    return canvas.tokens.ownedTokens.find(t => t.id == tokenId);
}
