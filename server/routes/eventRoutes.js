const router = require("express").Router();
const Event = require("../models/eventModel");
const authMiddleware = require("../middlewares/authMiddleware");

// Create a new event
router.post("/create-event", authMiddleware, async (req, res) => {
  try {
    const newEvent = new Event({
      organizerId: req.user.userId, // Assuming req.user.userId is set by authMiddleware
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date,
      tags: req.body.tags || [],
      isTrending: req.body.isTrending || false,
      price: req.body.price,
      capacity: req.body.capacity,
      language: req.body.language,
      foodArrangement: req.body.foodArrangement,
      utilities: req.body.utilities,
      thingsToCarry: req.body.thingsToCarry,
      waterAvailability: req.body.waterAvailability || false,
      parkingInfo: req.body.parkingInfo,
      imageUrl: req.body.imageUrl,
    });

    await newEvent.save();

    res.status(201).send({
      success: true,
      message: "Event created successfully.",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).send({
      success: false,
      message: "Failed to create event. Please try again later.",
    });
  }
});

// Get all events
// Get all events with pagination
router.get("/get-all-events", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 documents per page
    const skip = (page - 1) * limit;

    const events = await Event.find()
      .skip(skip)
      .limit(limit)
      .exec();

    const totalEvents = await Event.countDocuments(); // Total count of events

    res.send({
      success: true,
      message: "Events fetched successfully.",
      events: events,
      totalPages: Math.ceil(totalEvents / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch events. Please try again later.",
    });
  }
});


// Get event by ID
router.get("/get-event/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate('organizerId', 'name email');

    if (!event) {
      return res.status(404).send({
        success: false,
        message: "Event not found.",
      });
    }

    res.send({
      success: true,
      message: "Event fetched successfully.",
      event: event,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch event. Please try again later.",
    });
  }
});

// Update event by ID
router.put("/update-event/:eventId", authMiddleware, async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true });

    if (!updatedEvent) {
      return res.status(404).send({
        success: false,
        message: "Event not found.",
      });
    }

    res.send({
      success: true,
      message: "Event updated successfully.",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).send({
      success: false,
      message: "Failed to update event. Please try again later.",
    });
  }
});

// Delete event by ID
router.delete("/delete-event/:eventId", authMiddleware, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);

    if (!deletedEvent) {
      return res.status(404).send({
        success: false,
        message: "Event not found.",
      });
    }

    res.send({
      success: true,
      message: "Event deleted successfully.",
      event: deletedEvent,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).send({
      success: false,
      message: "Failed to delete event. Please try again later.",
    });
  }
});

module.exports = router;
