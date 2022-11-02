import React from 'react'
import './TrendCard.scss'
import {TrendData}  from '../../Data/TrendData.js'

const TrendCard = () => {
  return (
    <div className="TrendCard">
        <h3>Trends for you</h3>
        {TrendData.map((trend)=>{
            return(
                <div className="trend">
                    <span>#{trend.name}</span>
                    <span>{trend.share}k shares</span>
                </div>
            )
        })}
    </div>
  )
}

export default TrendCard
