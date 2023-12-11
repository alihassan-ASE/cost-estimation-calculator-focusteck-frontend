"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
const Home = () => {

  const route = useRouter();

  const goToRoute = (param)=>{
    route.push(param);
  }


    return (
    <div>
      <button onClick={()=>goToRoute('cost-estimation-calculator/staff')}>Staff</button>
      <button onClick={()=>goToRoute('cost-estimation-calculator/project')}>Project</button>
    </div>
  )
}

export default Home;