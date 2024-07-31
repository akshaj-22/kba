const {Schema} =require('mongoose');
const {model} =require('mongoose');

const certificateSchema = new Schema({
   course: { type: String, required: true },
   certificateId: { type: String, required: true },
   candidateName: { type: String, required: true },
   grade: { type: String, required: true },
   date: {type: String, required: true}
});

const certificate = model('issueCertificate', certificateSchema);

module.exports = certificate;
