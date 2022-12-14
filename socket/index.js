const io = require('socket.io')(8900, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

let users = []; 

let messages = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
}

const removeMessage = () => {
    messages = messages.filter((message) => message)
}

io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('addUser', (userId)=> {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    });

    socket.on('sendMessage', ({senderId, receiverId, text, file}) => {
        const user = getUser(receiverId)
        io.to(user.socketId).emit('getMessage', {
            senderId,
            text,
            file
        })
    })

    // socket.on('deleteMessage', (senderId, receiverId, messageId) => {
    //     const user = getUser(receiverId)
    //     io.to(user.socketId).emit('getDeletedMessage', {
    //         messageId,
    //         senderId,
    //     })
    // })

    socket.on('disconnect', () => {
        console.log('user disconnected')
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
})