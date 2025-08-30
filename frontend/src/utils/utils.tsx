function leftPad(original: string, upTo: number, pad: string) {
  while (original.length < upTo) {
    original = `${pad}${original}`;
  }

  return original;
}

function shortenString(str: string, toLength: number) {
  if (str.length > toLength) {
    return str.substring(0, toLength - 1) + "...";
  } else {
    return str;
  }
}

export { leftPad, shortenString };
