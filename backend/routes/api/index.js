const router = require("express").Router();
const userRoutes = require("./users");
const ticketRoutes = require("./tickets")
const notesRoutes = require("./notes")

// Book routes
router.use("/users", userRoutes);
router.use("/tickets", ticketRoutes)
router.use("/tickets/:ticketId/notes", notesRoutes)
module.exports = router;