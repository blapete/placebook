const db = require("../models");
const shortid = require('shortid');

module.exports = {
    addUserReservation: function (req, res) {
        const obj = {
            _id: shortid.generate(),
            date: req.body.date,
            time: req.body.time,
            businessId: req.body.businessId,
            businessName: req.body.businessName
        };
        db.User.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $push: {
                    reservations: obj,
                },
            },
            { new: true }
        )
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },
    pushPastReservation: function (req, res) {
        db.User.findById({ _id: req.params.id })
            .then((userModel) => {
                const filteredOut = [];
                const filteredIn = [];

                for (let i = 0; i < userModel.reservations.length; i++) {
                    if (userModel.reservations[i]._id === req.body.resId) {
                        filteredIn.push(userModel.reservations[i])
                    } else {
                        filteredOut.push(userModel.reservations[i]);
                    }
                }

                db.User.findByIdAndUpdate(
                    { _id: req.params.id },
                    {
                        $set: {
                            reservations: filteredOut,
                        },
                        $push: {
                            pastReservations: filteredIn
                        }
                    },
                    { new: true }
                )
                    .then((dbModel) => {
                        res.json(dbModel);
                    })
                    .catch((err) => res.status(422).json(err));
            })

            .catch((err) => res.status(422).json(err));
    },
    deleteUserReservation: function (req, res) {
        db.User.findById({ _id: req.params.id })
            .then((userModel) => {
                const filteredOut = [];

                for (let i = 0; i < userModel.reservations.length; i++) {
                    if (userModel.reservations[i]._id !== req.body.resId) {
                        filteredOut.push(userModel.reservations[i]);
                    }
                }
                db.Business.findById(req.body.businessId)
                    .then(busModel => {
                        const filtered = busModel.reservations.filter(element => {
                            return element.time === req.body.time && element.date === req.body.date
                        });
                        const updatedReservations = [];
                        for (let i = 0; i < busModel.reservations.length; i++) {
                            if (busModel.reservations[i]._id !== filtered[0]._id) {
                                updatedReservations.push(busModel.reservations[i]);
                            }
                        }
                        db.Business.findByIdAndUpdate({ _id: busModel._id },
                            {
                                $set: {
                                    reservations: updatedReservations
                                }
                            },
                            { new: true }
                        ).then((newRes) => {
                            res.json(newRes);
                        }).catch((err) => res.status(422).json(err));
                    })
                    .catch((err) => res.status(422).json(err));

                db.User.findByIdAndUpdate(
                    { _id: req.params.id },
                    {
                        $set: {
                            reservations: filteredOut,
                        },
                    },
                    { new: true }
                )
                    .then((dbModel) => res.json(dbModel))
                    .catch((err) => res.status(422).json(err));
            })
            .catch((err) => res.status(422).json(err));
    },
};
