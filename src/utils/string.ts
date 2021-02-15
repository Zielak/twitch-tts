/**
 * Split the string into somewhat equal chunks
 * @param string
 * @param parts
 */
export const split = (string: string, parts: number = 1): string[] => {
  const result: string[] = [];
  const partLength = Math.max(1, Math.round(string.length / parts));

  for (let index = 0; index < parts; index++) {
    result.push(
      string.slice(
        index * partLength,
        index === parts - 1 ? undefined : (index + 1) * partLength
      )
    );
  }

  return result;
};

export const isLetterCharacter = (char: string): boolean => {
  return !!char.match(/\p{L}/gu);
};
export const isNumberCharacter = (char: string): boolean => {
  return !!char.match(/\p{N}/gu);
};
export const isPunctuationCharacter = (char: string): boolean => {
  return !!char.match(/\p{P}/gu);
};
export const isMarkCharacter = (char: string): boolean => {
  return !!char.match(/\p{M}/gu);
};
export const isSymbolCharacter = (char: string): boolean => {
  return !!char.match(/\p{S}/gu);
};
export const isSeparatorCharacter = (char: string): boolean => {
  return !!char.match(/\p{Z}/gu);
};
export const isOtherCharacter = (char: string): boolean => {
  return !!char.match(/\p{C}/gu);
};
