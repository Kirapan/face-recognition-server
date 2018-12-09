const Clarifai = require('clarifai');
require('dotenv').config()

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_API_KEY
 });

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data)
  })
  .catch(err => res.status(400).json('under to work with api.'))
}

const handleImage = async (req,res, db) => {
  try {
    const { id } =  req.body;
    const response = await db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    res.json(response[0])
  }
  catch(err) {
    res.status(400).json('unable to get entries')
  }
}

module.exports = {
  handleImage,
  handleApiCall
} 