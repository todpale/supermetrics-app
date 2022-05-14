/**
 * Deep copy of object
 * @param obj
 * @returns {any}
 */
export const copy = obj => JSON.parse(JSON.stringify(obj))

/**
 * Field validator
 * @param value
 * @param type
 * @returns {boolean}
 */
export const valid = (value, type = '') => {
  if (typeof value === 'string') {
    if (type === 'email') {
      const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/gi
      return reg.test(value)
    }
    return value !== ''
  }
  return true
}

/**
 * Get parameter from URL search substring
 * @param param
 * @returns {string}
 */
export const searchParam = param => {
  const params = new URLSearchParams(window.location.search)
  return params.get(param)
}
