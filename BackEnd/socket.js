let users = []

const addUser = (userId, socketId) => {
	!users.some(user => user.userId === userId) && users.push({userId, socketId})
}

const removeUser = (socketId) => {
	users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => users.filter(user => user.userId == userId)

export {users, addUser, removeUser, getUser}



