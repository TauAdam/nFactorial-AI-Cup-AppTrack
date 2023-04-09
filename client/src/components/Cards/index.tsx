import { IResponse } from '../../models'
import { Card } from '../Card'

export const Cards = ({ data, title }: { data: IResponse[]; title: string }) => {
  if (data?.length > 0) {
    return (
      <>
        {data.map((el) => (
          <Card key={el._id} gift={el.idea} name={el.name} />
        ))}
      </>
    )
  }

  return (
    <>
      <h2 className="mt-5 font-bold text-[#2451e6] text-xl uppercase">{title}</h2>
    </>
  )
}
