import react, {useEffect} from 'react'

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { set } from "../redux/yearPicker/slice";
import { getCurrentYear } from '../utils/getCurrentYear'


const YearPicker = () => {

  const currentYear = useAppSelector((state) => state.yearPicker.value);
  const dispatch = useAppDispatch()

  useEffect(() => {},[])


  const handleChange = (e) => {
    dispatch(set(Number(e.target.value)))
  }

  const years = [
    Number(getCurrentYear),
    Number(getCurrentYear-1),
    Number(getCurrentYear-2),
    Number(getCurrentYear-3),
  ]

  return (
    <div>
      <select
        id="year-picker"
        value={currentYear}
        onChange={handleChange}
      >
        {years.map((item) => {
          return (
            <option key={`year-picker-${item}`} value={item}>{item}</option>
          )
        })}
      </select>
    </div>
  ) 
}

export default YearPicker