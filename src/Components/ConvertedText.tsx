import { useAppSelector } from "../Redux/store/store"
import styles from "./convertedTxt.module.css"
const ConvertedText = () => {
  const returnData = useAppSelector((state) => state.TextConversion)

  return (
    <div>
      {/* <div>
        <h2>Converted Text</h2>
        <div>{returnData.timeTaken}</div>
      </div>
      <div>{returnData.noOfChanges}</div> */}
      <div
        className={styles.converted_txt_cont}
        dangerouslySetInnerHTML={{ __html: returnData.convertedText }}
      ></div>
    </div>
  )
}

export default ConvertedText
