const jwt = require("jsonwebtoken");
const Teacher = require("../Model/TeacherModel");
const Child = require("../Model/ChildModel");
const Class = require("../Model/ClassModel");

const ADMIN_CREDENTIALS = {
    fullName: "admin",
    password: "adminPassword",
    role: "admin"
};

exports.login = async (req, res, next) => {
    const { fullName, password, role } = req.body; 

    try {
        let user;
        if (role === "admin") {
            if (fullName === ADMIN_CREDENTIALS.fullName && password === ADMIN_CREDENTIALS.password) {
                user = { _id: "adminId", ...ADMIN_CREDENTIALS }; 
            } else {
                throw new Error("Invalid admin credentials");
            }
        } else {
            let userModel = role === "teacher" ? Teacher : role === "child" ? Child : null;
            if (!userModel) throw new Error("Invalid role");

            user = await userModel.findOne({ fullName });
            if (!user) throw new Error("Invalid full name or role");
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            "secretkey",
            { expiresIn: "1h" }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
