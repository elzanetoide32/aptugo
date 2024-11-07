const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PreguntasSchema = mongoose.Schema(
  {
    Pregunta: {
      type: String,
    },
    Unidad: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

PreguntasSchema.plugin(mongoosePaginate)
PreguntasSchema.index({
  Pregunta: 'text',
  Unidad: 'text',
})

const myModel = (module.exports = mongoose.model('Preguntas', PreguntasSchema, 'preguntas'))
myModel.schema = PreguntasSchema
