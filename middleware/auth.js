module.exports = (client) => {
    return async (req, res, next) => {
      if (!client.ready) {
        next();
      } else {
        const context = {
          chatCount: (await client.getChats()).length,
          contactCount: (await client.getContacts()).length,
          status: 'Online',
        }
        res.render('home', context);
    }
  }
}