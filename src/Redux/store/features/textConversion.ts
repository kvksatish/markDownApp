/*TypeScript code that defines a Redux slice for text conversion. */

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import dayjs from "dayjs"
import { ActionReducerMapBuilder } from "@reduxjs/toolkit"

export interface TextConversionState {
  text: string
  convertedText: string
  noOfChanges: number
  timeTaken: number
}

const initialState: TextConversionState = {
  text: "",
  convertedText: "fgnbfgnb",
  noOfChanges: 0,
  timeTaken: 0,
}

// Load state from localStorage if available
const savedState = localStorage.getItem("textConversionState")
const persistedState = savedState ? JSON.parse(savedState) : initialState

export const fetchConvertedText = createAsyncThunk(
  "textConversion/fetchConvertedText",
  async (parameters: string) => {
    let beforeTime = dayjs()
    const response = await axios.post(`http://localhost:3000/api/text_converter`, {
      text: encodeURIComponent(parameters),
    })
    let afterTime = dayjs()
    //console.log(response.data, encodeURIComponent(parameters), "parameters")
    return {
      data: response.data.data,
      timeTaken: afterTime.diff(beforeTime, "millisecond"),
    }
  },
)

/**
 * Redux slice for text conversion.
 *
 * @remarks
 * This slice handles the state and actions related to text conversion.
 *
 * @packageDocumentation
 */
export const TextConversionSlice = createSlice({
  initialState: persistedState,
  name: "textConversion",
  reducers: {
    /**
     * Set the text data.
     *
     * @param state - The current state.
     * @param action - The payload action containing the text conversion state.
     */
    setTextData: (state: TextConversionState, action: PayloadAction<TextConversionState>) => {
      state.text = action.payload.text
      state.convertedText = action.payload.convertedText
      state.noOfChanges = action.payload.noOfChanges
      state.timeTaken = action.payload.timeTaken

      // Save state to localStorage
      localStorage.setItem("textConversionState", JSON.stringify(state))
    },
    /**
     * Clear the text data.
     *
     * @param state - The current state.
     */
    clearTextData: (state: TextConversionState) => {
      state.text = ""
      state.convertedText = ""
      state.noOfChanges = 0
      state.timeTaken = 0

      // Clear state from localStorage
      localStorage.removeItem("textConversionState")
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<TextConversionState>) => {
    builder.addCase(
      fetchConvertedText.fulfilled,
      (state: TextConversionState, action: PayloadAction<{ data: string; timeTaken: number }>) => {
        state.convertedText = action.payload.data
        state.timeTaken = action.payload.timeTaken
        state.noOfChanges = action.payload.data.length - state.text.length

        // Save state to localStorage
        localStorage.setItem("textConversionState", JSON.stringify(state))
      },
    )
  },
})

export default TextConversionSlice.reducer
export const { setTextData, clearTextData } = TextConversionSlice.actions
