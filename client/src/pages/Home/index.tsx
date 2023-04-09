import { useEffect, useState } from 'react'
import { Cards } from '../../components/Cards'
import { Loader } from '../../components/Loader'
import { InputField } from '../../components/UserInput'
import { ApiEndpoint, IResponse } from '../../models'

export const Home = () => {
  const [loading, setLoading] = useState(false)
  const [gifts, setGifts] = useState<IResponse[]>([])
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState<number | undefined>(undefined)
  const [searchedResults, setSearchedResults] = useState<IResponse[]>([])

  const fetchGifts = async () => {
    setLoading(true)

    try {
      const response = await fetch(ApiEndpoint.SAVED_GIFTS_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        console.log(result.data.reverse())
        setGifts(result.data.reverse())
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGifts()
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = gifts?.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.idea.toLowerCase().includes(searchText.toLowerCase())
        )
        setSearchedResults(searchResult)
      }, 300)
    )
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Find The Perfect Gift For Any Occasion
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Say goodbye to endless gift searches and say hello to AI-powered gift ideas. No more
          stress, no more guessing.
        </p>
      </div>
      <div className="mt-16">
        <InputField
          labelName="Search your gifts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <Cards data={searchedResults} title="No Search Results Found" />
              ) : (
                <Cards data={gifts} title="No Gifts Yet" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
