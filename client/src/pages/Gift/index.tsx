import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../components/Card'
import { Loader } from '../../components/Loader'
import { InputField } from '../../components/UserInput'
import { randomIdeas } from '../../constants'
import { ApiEndpoint, ROUTES } from '../../models'
import { getRandomPrompt } from '../../utils'

export const GiftPage: React.FC = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', prompt: '', idea: '' })

  const [generatingIdea, setGeneratingIdea] = useState(false)
  const [saving, setSaving] = useState(false)

  const generateIdea = async () => {
    if (form.prompt) {
      try {
        const userPrompt = `give me 1 personalized gift idea for the ${form.prompt} . write 2 sentences, splitted by dot , 1 gift name, 2 gift description`
        setGeneratingIdea(true)
        const response = await fetch(ApiEndpoint.giftIdea, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: userPrompt,
          }),
        })

        const data = await response.json()
        console.log(data)
        setForm({ ...form, idea: data })
      } catch (err) {
        console.log(err)
      } finally {
        setGeneratingIdea(false)
      }
    } else {
      alert('Please provide proper prompt')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleRandomizeMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.prompt && form.idea) {
      setSaving(true)
      try {
        const response = await fetch(ApiEndpoint.createGift, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        })

        await response.json()
        navigate(ROUTES.HOME_PAGE)
      } catch (err) {
        alert(err)
      } finally {
        setSaving(false)
      }
    } else {
      alert('Please generate an idea with proper details')
    }
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Get Gift</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Looking For The Perfect Gift Can Be a Daunting Task. But It Doesn't Have To Be!
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <InputField
            labelName="For Whom"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleInputChange}
          />

          <InputField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder={randomIdeas[0]}
            value={form.prompt}
            handleChange={handleInputChange}
            additionalButton
            handleAdditionalButton={handleRandomizeMe}
          />

          <div className="relative text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 flex justify-center items-center">
            {form.idea && <Card gift={form.idea} />}

            {generatingIdea && (
              <div
                className={`absolute inset-0 z-0 flex justify-center items-center ${
                  form.idea && 'bg-[rgba(0,0,0,0.3)]'
                } rounded-lg`}
              >
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateIdea}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingIdea ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-gray-600 text-sm">
            Bring your vision to life and share or save it for later!
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6166ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </section>
  )
}
