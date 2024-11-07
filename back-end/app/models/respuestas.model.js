const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const RespuestasSchema = mongoose.Schema(
  {
    Pregunta: {
      type: String,
    },
    Respuesta: String,
    Unidad: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

RespuestasSchema.plugin(mongoosePaginate)
RespuestasSchema.index({
  Pregunta: 'text',
  Respuesta: 'text',
  Unidad: 'text',
})

const myModel = (module.exports = mongoose.model('Respuestas', RespuestasSchema, 'respuestas'))
myModel.schema = RespuestasSchema
