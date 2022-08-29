"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthToken = void 0;
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const authSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', index: true },
    userAgent: { type: String },
    authToken: { type: String, required: true, index: true },
    refreshToken: { type: String, required: true, index: true },
    issueAt: { type: Number },
    expireAt: { type: Number }
}, {
    timestamps: true,
    toJSON: {
        transform(_ref, doc, her) {
            delete doc.__v;
            doc.id = doc._id;
            return doc;
        }
    },
    toObject: {
        transform(_ref, doc, her) {
            doc.id = doc._id;
            return doc;
        }
    }
});
exports.AuthToken = (0, mongoose_1.model)('AuthToken', authSchema);
//# sourceMappingURL=auth-token.model.js.map