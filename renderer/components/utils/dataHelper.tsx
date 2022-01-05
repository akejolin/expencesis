export const selectYearData = (stack:Array<Array<Number>>, year:Number) => stack.filter(item => Number(item[0]) === Number(year))
export const PromiseYearData = (stack:Array<Array<Number>>, year:Number) => new Promise<any>((resolve, reject) => {

  const selected = stack.filter(item => Number(item[0]) === Number(year))
  resolve(selected)
})   
export const pickAndSumData = (stack:Array<Array<Number>>, needle = 2):Number => {
  if (stack.length < 1) {return 0}
  const data = stack.map(item => Number(item[needle]))
  const sum = data.reduce(add, 0)
  function add(accumulator, a) {
    return Number(accumulator + a);
  }
  return sum
}

export const sumArray = (arr) => {
  if (!Array.isArray(arr)) {return 0}
  if (arr.length < 1) {return 0}
  
  const data = arr.map(item => item)
  const sum = data.reduce(add, 0)
  function add(accumulator, a) {
    return accumulator + a;
  }
  return sum
}