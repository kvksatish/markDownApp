import { useState } from "react"
import "./App.css"
import { useAppDispatch, useAppSelector } from "./Redux/store/store"
import {
  clearTextData,
  fetchConvertedText,
  setTextData,
} from "./Redux/store/features/textConversion"
import ConvertedText from "./Components/ConvertedText"

import styles from "./converter.module.css"
/**
 * The main component of the application.
 */
function App() {
  // State variables
  const [font, setfont] = useState(true)

  // Redux hooks
  const dispatch = useAppDispatch()
  const Text = useAppSelector((state) => state.TextConversion.text)
  const returnData = useAppSelector((state) => state.TextConversion)

  /**
   * Clears the text data.
   */
  const handleClearTextData = () => {
    dispatch(clearTextData())
  }

  /**
   * Toggles the font style between cursive and normal.
   */
  const handleToggleFont = () => {
    setfont(!font)
  }

  /**
   * Handles the change event of the textarea and dispatches actions to fetch converted text and update text data.
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The change event object.
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(fetchConvertedText(e.target.value))
    dispatch(
      setTextData({
        text: e.target.value,
        convertedText: e.target.value,
        noOfChanges: 1,
        timeTaken: 1,
      }),
    )
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.navbar_cont}>
        <button onClick={handleClearTextData}>Clear</button>
        <button onClick={handleToggleFont}>{!font ? "Cursive" : "Normal"}</button>
        <div className={styles.navbar_inner_cont}>
          <div>Time Taken-{returnData.timeTaken}ms</div>
          <div>No of Changes-{returnData.noOfChanges}</div>
        </div>
      </div>
      <div
        style={{ fontFamily: font ? "Dancing Script, cursive" : "Roboto, sans-serif" }}
        className={styles.inner_container}
      >
        <div>
          <textarea className={styles.textarea} value={Text} onChange={handleChange} />
        </div>

        <ConvertedText />
      </div>
    </div>
  )
}

export default App
