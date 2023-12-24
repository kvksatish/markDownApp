/**
 * Redux store configuration.
 *
 * @remarks
 * This file exports the Redux store instance, along with custom hooks for dispatching actions and selecting state.
 * The store is configured using `configureStore` from the `@reduxjs/toolkit` package.
 * The reducer for the `TextConversion` feature is added to the store.
 *
 * @packageDocumentation
 */

import { configureStore } from "@reduxjs/toolkit"
import { TextConversionSlice } from "./features/textConversion"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

/**
 * The Redux store instance.
 */
export const store = configureStore({
  reducer: {
    TextConversion: TextConversionSlice.reducer,
  },
})

/**
 * Custom hook for dispatching actions.
 */
export const useAppDispatch: () => typeof store.dispatch = useDispatch

/**
 * Custom hook for selecting state.
 */
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
