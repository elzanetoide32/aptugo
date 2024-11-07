const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ClasesSchema = mongoose.Schema(
  {
    nombreClase: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

ClasesSchema.plugin(mongoosePaginate)
ClasesSchema.index({
  nombreClase: 'text',
})

const myModel = (module.exports = mongoose.model('Clases', ClasesSchema, 'clases'))
myModel.schema = ClasesSchema
