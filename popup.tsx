import { Header } from "@/components/header"
import saveEnabledImage from  "data-base64:@/assets/save-enabled.png"
import saveDisabledImage from  "data-base64:@/assets/save-disabled.png"
import categoriesImage from "data-base64:@/assets/categories.png"
import accountImage from "data-base64:@/assets/account.png"
import "./styles.css"
import { useEffect, useState } from "react"

function IndexPopup() {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null)

  useEffect(() => {
    chrome.tabs.query({ active: true }, tabs => {
      tabs[0].url.includes('https://chat.openai.com/c/') ? 
        setCurrentUrl(tabs[0].url) :
        setCurrentUrl(null)
    })
  }, [])

  const canSaveChat = currentUrl !== null

  return (
    <main className="bg-gray-800 text-gray-50 w-[400px] h-[400px] px-4 py-4 flex flex-col space-y-4">
      <Header />
      <section className="w-full border border-gray-400 flex flex-col items-center rounded space-y-6 py-6">
        <p className="text-lg">{canSaveChat ? 'You have a chat selected' : 'No chat is currently selected'}</p>
        <button className="p-6 border border-gray-500 flex justify-center rounded">
          <img src={canSaveChat ? saveEnabledImage : saveDisabledImage} />
        </button>
        <p className="text-sm text-gray-300">{canSaveChat ? '' : 'You need to select a chat in ChatGPT'}</p>
      </section>
      <footer className="flex justify-end space-x-2">
        <button className="p-2 bg-gray-700 hover:bg-gray-700/90 rounded">
          <img src={categoriesImage} />
        </button>
        <button className="p-2 bg-gray-700 hover:bg-gray-700/90 rounded">
          <img src={accountImage} />
        </button>
      </footer>
    </main>
  )
}

export default IndexPopup
