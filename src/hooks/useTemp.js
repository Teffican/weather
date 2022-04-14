const useTemp = () => {
    return (temp) => {
        temp = Math.floor(temp)
        if(temp > 0) temp = `+${temp}`
        temp += '°'

        return temp
    }
}

export default useTemp