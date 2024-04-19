import React from 'react'
import './TrendCard.css'
import { TrendData } from '../Data/TrendData'
const TrendCard = () => {
  return (
    <div className='TrendCard'  >  
      <h3>Latest  Trends</h3>
      {
        TrendData.map((trend)=>{
            return(
                <div className="trend"  key={trend.name}>
                    <span>#{trend.name}</span>
                    <p>{trend.shares}K Shares</p>
                </div>
            )
        })
      }
    </div>
  )
}

export default TrendCard
