import React from 'react'
import { ICard } from '../../models'

export const Card: React.FC<ICard> = ({ gift, name }) => {
  const [giftName, ...giftDescription] = gift.split('.')

  return (
    <div className="border border-gray-200 rounded-lg p-6 flex flex-col justify-between">
      <h2 className="text-lg font-bold mb-2">{giftName.trim()}</h2>
      <p className="text-gray-700">{giftDescription.join('.').trim()}</p>

      {name && (
        <div className="flex items-center gap-2 ">
          <div className="w-7 h-7 rounded-full object-cover bg-blue-700 flex justify-center items-center text-white text-xs font-bold">
            {name[0]}
          </div>
          <p className="text-black text-sm">For {name}</p>
        </div>
      )}
    </div>
  )
}
