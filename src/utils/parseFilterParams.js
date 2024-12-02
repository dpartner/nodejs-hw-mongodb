function parseIsFavourite(value) {
  if (typeof Boolean(value) !== 'boolean') {
    return undefined;
  }
  if(Boolean(value) === true) {
    return true;
  }
  return undefined;
}

function parseContactType(value) {
  if (typeof value !== 'string') {
    return undefined;
  }
  if (['work', 'home', 'personal'].includes(value)) {
    return value;
  }
  return undefined;
}

export function parseFilterParams(query) {
  const {isFavourite, type} = query;
  // console.log(isFavourite);
  // console.log(type);
  const parsedIsFavourite  = parseIsFavourite(isFavourite);
  const parsedContactType  = parseContactType(type);
  // console.log(parsedContactType);

  return {
    isFavourite: parsedIsFavourite,
    type: parsedContactType,
  };
}