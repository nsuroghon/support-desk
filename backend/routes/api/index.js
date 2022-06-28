const router = require("express").Router();
const userRoutes = require("./users");
const ticketRoutes = require("./tickets")

// Book routes
router.use("/users", userRoutes);
router.use("/tickets", ticketRoutes)

module.exports = router;