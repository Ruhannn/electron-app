import { useQuery } from "@tanstack/react-query"
import { getAyakaImage } from "./api"

export const useAyakaImage = () => {
    return useQuery({ queryKey: ["ayaka"], queryFn: getAyakaImage })
}