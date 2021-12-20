/**
* @desc read from txt file on disk
* @param string $file - full file path on disk,
* @return string - file content
*/

import fs from 'fs'

export const readFile = async (file:string) => new Promise((resolve) => fs.readFile(file, 'utf8', (err:any, data:any) => {
  if (err) {
    throw new Error(err)
  }
  resolve(data)
}))

export default readFile
