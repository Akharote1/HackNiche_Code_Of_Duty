import mongoose from "mongoose";
import connection from '../services/database.js'

const screeningSchema = new mongoose.Schema({
	start_date: {
		type: mongoose.SchemaTypes.Date,
		default: new Date(),
		required: true
	},	
	end_date: {
		type: mongoose.SchemaTypes.Date,
		default: new Date(),
		required: true
	},
	resume_required: {
		type: Boolean,
		required: true,
		default: true
	},
	abstract_required: {
		type: Boolean,
		required: true,
		default: false,
	},
	abstract_limit_start: {
		type: Number,
		required: true,
		default: 200
	},
	abstract_limit_end: {
		type: Number,
		required: true,
		default: 500
	},
	presentation_required: {
		type: Boolean,
		required: true,
		default: false,
	},
	guidelines_text: {
		type: String,
		default: ""
	}
})

const communicationSchema = new mongoose.Schema({
	date: {
		type: mongoose.SchemaTypes.Date,
		default: new Date(),
		required: true
	},
	subject: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	target: {
		type: String,
		required: true,
		enum: ["shortlisted", "not-shortlisted", "registered", "final-submitted", "final-not-submitted", "screening-submitted", "screening-not-submitted"]
	},
	target_size: {
		type: Number,
		required: true,
		default: 0
	}
})

const eventSchema = new mongoose.Schema({
	slug: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	organizer_name: {
		type: String,
		required: true
	},
	organizers: {
		type: [{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User'
		}],
		required: true,
		default: []
	},
	poster_image: {
		type: String,
		required: true
	},
	header_image: {
		type: String,
		required: false
	},
	description: {
		type: String,
		required: true
	},
	online: {
		type: Boolean,
		required: true
	},
	venue: {
		type: String
	},
	color: {
		type: String,
		required: false
	},
	communications: {
		type: [communicationSchema],
		required: true,
		default: []
	},
	teams: {
		type: [{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Team'
		}],
		default: [],
		required: true
	},
	domains: {
		type: [{
			type: String,
			enum: ["web-dev", "app-dev", "ai-ml", "blockchain", "cloud", "iot", "ar-vr", "social-cause"],
			required: true,
			default: []
		}]
	},
	event_date: {
		type: mongoose.SchemaTypes.Date,
		required: true
	},
	registration_start: {
		type: mongoose.SchemaTypes.Date,
		required: true
	},
	registration_end: {
		type: mongoose.SchemaTypes.Date,
		required: true
	},
	screening: {
		type: screeningSchema,
		required: true,
		default: {}
	},
	min_team_size: {
		type: Number,
		required: true,
		default: 2
	},
	max_team_size: {
		type: Number,
		required: true,
		default: 4
	},
	shortlist_count: {
		type: Number,
		default: 0
	},
	registration_count: {
		type: Number,
		default: 0
	},
	male_count: {
		type: Number,
		default: 0
	},
	female_count: {
		type: Number,
		default: 0
	},
	other_gender_count: {
		type: Number,
		default: 0
	},
	ps_release_date: mongoose.SchemaTypes.Date,
	ps_form_start: mongoose.SchemaTypes.Date,
	ps_form_end: mongoose.SchemaTypes.Date,
	ps_list_released: {
		type: Boolean,
		required: true,
		default: false
	},
	
	ps_form_released: {
		type: Boolean,
		required: true,
		default: false
	},
	ps_list: {
		required: true,
		default: [],
		type: [{
			title: {
				type: String,
				required: true
			},
			description: {
				type: String,
				required: true
			},
			allot_limit: {
				type: Number,
				default: -1,
				required: true
			},
			domains: [{
				type: String,
				enum: ["web-dev", "app-dev", "ai/ml", "blockchain", "cloud", "iot", "ar-vr", "social-cause"],
				required: true,
				default: []
			}]
		}],
		required: true
	}
})


export default connection.model('Hackathon', eventSchema)