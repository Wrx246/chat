import { API } from './apiConsts'
import { deleteConversation } from './contactsFetch'

export const updateUser = async (avatarData, userId) => {
    try {
        await API.post('user/update', {
            _id: userId,
            avatarData: avatarData,
        })
            .then(() => {
                fetchAccount(userId)
            })
    } catch (error) {
        console.log(error)
    }
}

export const updatePassword = async (userId, values, setServerError, setCompletePassword) => {
    const { newPassword, password } = values
    try {
        await API.post('user/update/password', {
            userId: userId,
            password: password,
            newPassword: newPassword,
        }).then((res) => {
            fetchAccount(userId)
            setServerError('')
            setCompletePassword(true)
        })
    } catch (error) {
        setServerError(error.response.data.message)
    }
}

export const updateEmail = async (userId, value, setServerError, setCompleteEmail) => {
    const { newEmail } = value;
    try {
        await API.post('user/update/email', {
            userId: userId,
            newEmail: newEmail,
        })
            .then((res) => {
                fetchAccount(userId)
                setServerError('')
                setCompleteEmail(true)
            })
    } catch (error) {
        setServerError(error.response.data.message)
    }
}

export const updateUserName = async (userId, value, setServerError, setCompleteUserName) => {
    const { newUserName } = value;
    try {
        await API.post('user/update/name', {
            userId: userId,
            newUserName: newUserName,
        })
            .then((res) => {
                fetchAccount(userId)
                setServerError('')
                setCompleteUserName(true)
            })
    } catch (error) {
        setServerError(error.response.data.message)
    }
}

export const deleteAccount = async (userId, navigate, conversation) => {
    try {
        await API.post('user/delete', {
            userId: userId,
        }).then((res) => {
            deleteConversation(conversation)
                .then(() => {
                    localStorage.removeItem('chat-user')
                    navigate('/login')
                })
        })
    } catch (error) {

    }
}

export const fetchAccount = async (userId) => {
    try {
        await API.get(`user/${userId}`)
            .then((res) => {
                localStorage.setItem('chat-user', JSON.stringify(res.data));
            })
    } catch (error) {
        console.log(error)
    }
}

export const submitAvatar = async (avatar, setAvatar, userId) => {

    const data = new FormData();
    data.append('image', avatar)
    try {
        await API.post('user/setavatar', data, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
            .then((res) => {
                const avatarData = res.data
                updateUser(avatarData, userId)
                setAvatar(null)
            })
    } catch (error) {
        console.log(error)
    }
}