const _getCurrentYear = new Date().getFullYear()
export const getCurrentYear = Number(_getCurrentYear)

const now = new Date()
export const getCurrentMonth = now.getMonth()


export const getMonth = (date = new Date()) => Number(date.getMonth() + 1)
