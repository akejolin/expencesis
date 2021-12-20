/**
* @desc read from txt file on disk
* @param string $file - full file path on disk,
* @return string - file content
*/

import fs from 'fs'

export const readFileRowsInArray = async (file:string) => new Promise<Array<string>>((resolve) => fs.readFile(file, 'utf8', (err:any, data:any) => {
  if (err) {
    throw new Error(err)
  }
  let stringData = data.toString()
  stringData = stringData.replace(/ /g, '')
  const arr = stringData.toString().replace(/\r\n/g,'\n').split('\n');
  resolve(arr)
}))

export default readFileRowsInArray
