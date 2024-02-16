"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validPassword = exports.validPhone = exports.validEmail = exports.validName = void 0;
function validName(name) {
    if (name.length > 50) {
        return {
            msg: "The field must contain a maximum of 50 characters",
        };
    }
    if (!/^[A-Z][a-z]*$/.test(name)) {
        return {
            msg: "Invalid Format",
            example: { name: "Kevin", surname: "Denker" },
        };
    }
}
exports.validName = validName;
function validEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            msg: "Invalid Format",
            example: "apolo@gmail.com",
        };
    }
}
exports.validEmail = validEmail;
//Por hora está apenas no formato brasileiro, precisamos pensar em como globalizar essa validação
function validPhone(phone) {
    const regex = new RegExp("^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{4}))$");
    if (!regex.test(phone)) {
        return false;
    }
    return true;
}
exports.validPhone = validPhone;
function validPassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return false;
    }
    return true;
}
exports.validPassword = validPassword;
