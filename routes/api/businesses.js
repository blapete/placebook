const router = require("express").Router();
const placeController = require("../../controllers/placeController");

// Matches with "/api/businesses"
router.route("/all").get(placeController.findAll).post(placeController.create);

// matches /api/businesses/add, add a new business
// router
//     .route("/add")
//     .post(placeController.create);
// router.route('/protected')
//     .get(function(req, res) {
//         if (req.user) {
//             //access granted
//         } else {
//             // send away
//         }
//     })

// Matches with "/api/businesses/:id"
router.route("/:id")
    .get(placeController.findOne)
    .post(placeController.update);
//   .put(placeController.update)
//   .delete(placeController.remove);

router.route("/add").post(placeController.create);
module.exports = router;
