const childSchema = require("../Model/ChildModel");

exports.getChildById = (req, res, next) => {
    const childId = req.params.id;
    childSchema.findById(childId)
        .then((child) => {
            if (!child) {
                return res.status(404).json({ message: "Child not found" });
            }
            res.status(200).json({ child });
        })
        .catch((error) => next(error));
};

exports.updateChild = (req, res, next) => {
    const id = req.params.id;
    childSchema.findByIdAndUpdate(id, req.body, { new: true })
        .then((child) => {
            if (!child) {
                return res.status(404).json({ message: "Child not found" });
            }
            res.status(200).json({ child });
        })
        .catch((error) => next(error));
};


