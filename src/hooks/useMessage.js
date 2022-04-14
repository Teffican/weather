const useMessage = () => {
    return (variant, text) => {
        const app = document.getElementById('app')
        const message = document.createElement('div')

        message.classList.add('message', `message_${variant}`)
        message.innerText = text

        app.appendChild(message)
    
        setTimeout(() => message.classList.add('message_active'), 0)
        setTimeout(() => message.classList.remove('message_active'), 3000)
        setTimeout(() => app.removeChild(message), 4000)
    }
}

export default useMessage