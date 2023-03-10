import mongoose from "mongoose";
import connection from '../services/database.js'

const teamSchema = new mongoose.Schema({
	team_name: {
		type: String,
		required: true
	},
	registration_time: mongoose.SchemaTypes.Date,
	members: {
		type: [{
			user_id: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: "User"
			},
			resume: String
		}],
		required: true
	},
	abstract_text: String,
	presentation_link: String,
	ps_preferences: [Number],
	ps_allotment: {
		title: String,
		number: Number
	},
	screening_submitted: {
		type: Boolean,
		default: false
	},
	hackathon_name: String,
	hackathon_id: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Hackathon'
	},
	shortlisted: {
		type: Boolean,
		default: false,
		required: true
	},
	scores: {
		type: new mongoose.Schema({
			technical_knowledge: {
				type: Number,
				required: true,
				default: 0
			},
			idea: {
				type: Number,
				required: true,
				default: 0
			},
			practicality: {
				type: Number,
				required: true,
				default: 0
			},
			feasibility: {
				type: Number,
				required: true,
				default: 0
			}
		}),
		required: true,
		default: {}
	}
})

export default connection.model('Team', teamSchema)