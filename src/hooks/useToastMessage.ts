'use client'
import useToastMessageStore from '@/stores/toastMessageStore'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export function useToastMessage() {
  const { message, clearMessage, error, clearError } = useToastMessageStore()

  useEffect(() => {
    if (message) {
      toast.success(message?.data?.message || message.message)
      clearMessage()
    }
    if (error) {
      toast.error(error?.response?.data?.message || error.message)
      clearError()
    }

  }, [message, clearMessage, error, clearError])
}
