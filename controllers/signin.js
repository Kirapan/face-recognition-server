const handleSignin = async (req, res, db, bcrypt) => {
  try {
    const {email, password} = req.body
    if(!email || !password) {
      return res.status(400).json('Incorrect Form Submission')
    }
    const response = await db.select('email', 'hash').from('login')
    .where('email','=',email)
    const isValid = bcrypt.compareSync(password, response[0].hash)
    if(isValid) {
      const user = await db.select('*').from('users').where('email', '=', email)
      res.json(user)
    } else {
      res.status(404).json('wrong credentials')
    }
  } catch (err) {
    res.status(404).json('wrong credentials')
  }
}

module.exports = {
  handleSignin: handleSignin
}