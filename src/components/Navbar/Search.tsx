// import { MovieContext } from '@/app/context/context'
// import React, { useContext, useState } from 'react'
// import { BsSearch } from 'react-icons/bs'

// export const Search = () => {
//     const data = useContext(MovieContext)
//     console.log(data, "Search")
//     const[inputSearch,setInputSearch]=useState("")
//     const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setInputSearch(e.target.value)
//     }
//     console.log(data)
//   return (
//       <div className={`flex items-center rounded-md bg-light-white mt-6 } py-2`}>
//           <BsSearch className={`text-white text-lg block float-left cursor-pointer ml-2 `} />

//           <input className={`ml-1 text-base bg-transparent w-full text-white focus:outline-none $`}
//               type="Search" placeholder="Search" value={inputSearch}
//               onChange={(e) => handelSearch(e)} />
//           <div className='w-full'>
//               {/* {data} */}
//           </div>
//       </div>
//   )
// }
