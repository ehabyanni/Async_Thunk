'use client'
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";


//custom hook function
export default function useThunk(thunk: any) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
  
    const runThunk = useCallback((arg: any) => {
      setIsLoading(true);
      dispatch(thunk(arg) as any).unwrap()
        .catch((err: any) => setError(err))
        .finally(() => setIsLoading(false))
    }, [dispatch, thunk]);
  
    return [runThunk, isLoading, error];
  }
  