import mongoose from "mongoose"
import Hackathon from "../models/Hackathon.js"
import { slugify } from "../utils.js"

export const view = async (req, res) => {
  try {
    const event = await Hackathon.findOne({'slug': req.params.slug})

    if (!event) {
      return (
        res.send({
          success: false,
          message: "That event does not exist"
        })
      )
    }

    res.send({
      success: true,
      event
    })
  } catch (error) {
    console.log(error)
    res.send({
      success: false,
      message: "An error occurred"
    })
  }
}

export const list = async (req, res) => {
  const events = await Hackathon.find()
  res.send(events)
}

export const create = async (req, res) => {
  try {
    const user = req.user;
    
    const event = new Hackathon({
      _id: new mongoose.Types.ObjectId(),
      slug: req.body.slug || slugify(req.body.name),
      name: req.body.name,
      description: req.body.description,
      domains: req.body.domains,
      poster_image: req.body.poster_image || 'https://via.placeholder.com/128',
      header_image: req.body.header_image || 'https://via.placeholder.com/128',
      online: req.body.online,
      venue: req.body.venue,
      color: req.body.color,
      event_date: new Date(),
      registration_start: req.body.registration_start,
      registration_end: req.body.registration_end,
      event_date: req.body.event_date,
      organizers: [user._id],
      organizer_name: req.body.organizer_name
    });
    
    user.events_organized.push(event._id)
    const eventResult = await event.save()
    await user.save()

    return res.status(200).json({
      success: true,
      hackathon: eventResult
    })

  } catch (err) {
    console.log(err)

    return res.status(500).json({
      success: false,
      message: 'An error occurred.'
    })
  }
}


export const updatePS = async (req, res) => {
  try {
    const user = req.user;
    const event = await Hackathon.findOne({'slug': req.params.slug})
    
    if (!event) {
      return (
        res.send({
          success: false,
          message: "That event does not exist"
        })
      )
    }

    const updatedPS = req.body.statements;
    event.ps_list = updatedPS;
    await event.save()

    return res.status(200).json({
      success: true,
      statements: event.ps_list
    })

  } catch (err) {
    console.log(err)

    return res.status(500).json({
      success: false,
      message: 'An error occurred.'
    })
  }
}