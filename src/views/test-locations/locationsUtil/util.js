import schools from "../schools"

export function matchSchoolToTerm(School, value) {
    return (
      School.toLowerCase().indexOf(value.toLowerCase()) !== -1 )
  }
  
  export function matchSchoolToTermWithHeaders(School, value) {
    return (
      School.header ||
      School.toLowerCase().indexOf(value.toLowerCase()) !== -1  )
  }
  
  /**
   * An example of how to implement a relevancy-based sorting method. Schools are
   * sorted based on the location of the match - For example, a search for "or"
   * will return "Oregon" before "North Carolina" even though "North Carolina"
   * would normally sort above Oregon. Strings where the match is in the same
   * location (or there is no match) will be sorted alphabetically - For example,
   * a search for "or" would return "North Carolina" above "North Dakota".
   */
  export function sortSchools(a, b, value) {
    const aLower = a.toLowerCase()
    const bLower = b.toLowerCase()
    const valueLower = value.toLowerCase()
    const queryPosA = aLower.indexOf(valueLower)
    const queryPosB = bLower.indexOf(valueLower)
    if (queryPosA !== queryPosB) {
      return queryPosA - queryPosB
    }
    return aLower < bLower ? -1 : 1
  }
  
  export function fakeRequest(value, cb) {
    return setTimeout(cb, 500, value ?
      getSchools().filter(School => matchSchoolToTerm(School, value)) :
      getSchools()
    )
  }
  
  
  // export function fakeCategorizedRequest(value, cb) {
  //   setTimeout(cb, 500, value ?
  //     getCategorizedSchools().filter(School => matchSchoolToTermWithHeaders(School, value)) :
  //     getCategorizedSchools()
  //   )
  // }

  export function getSchools() {
    return schools
  }
