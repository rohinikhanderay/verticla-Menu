export const numberWithCommas = (x) => {
  if (x != null) {
    return x
      .toString()
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    return ''
  }
}
