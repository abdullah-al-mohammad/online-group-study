import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query'

const useUserInfo = () => {
    const axiosPublic = useAxiosPublic()

    const {data: user =[], isLoading: loading, refetch} = useQuery({
        queryKey: ['user'],
        queryFn: async ()=>{
           const res =  axiosPublic.get('/users')
           return res.data

        }
    })
  return [user, loading, refetch]
}

export default useUserInfo
