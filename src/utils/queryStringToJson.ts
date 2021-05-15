const queryStringToJson = (queryString: string): unknown => {
  const pairs = queryString.slice(1).split('&')

  return pairs.reduce((acc, curr) => {
    const [key, value] = curr.split('=')

    const formattedValue = decodeURIComponent(value || '')

    return { ...acc, [key]: formattedValue }
  }, {})
}

export default queryStringToJson
