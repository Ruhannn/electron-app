import axios from "axios"
import { ImageType } from "../../@types"

export const getAyakaImage = async () => {
    return (await axios.get<ImageType>("https://api.waifu.im/search?included_tags=kamisato-ayaka&")).data
}