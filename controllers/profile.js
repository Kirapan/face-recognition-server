const handleProfileGet = async (req, res, db) => {
  try {
    const { id } =  req.params;
    const user = await db.select('*').from('users').where({id: id})
    if (user.length) {
      res.json(user[0])
    } else {
      res.status(404).json('no such user')
    }
  } catch (err) {
    res.status(404).json('error finding user')
  }
}

module.exports = {
  handleProfileGet: handleProfileGet
}