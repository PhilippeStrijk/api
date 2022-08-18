import mongoose from 'mongoose';


interface IOTPAttrs {
    id: string;
    sid: string;
    otp_code: number;
    expiresAt: Date;
    phoneTo: string;
    phoneFrom: string;
}

interface IOTPDoc extends mongoose.Document {
    id: string;
    sid: string;
    otp_code: number;
    expiresAt: Date;
    phoneTo: string;
    phoneFrom: string;
}

interface IOTPModel extends mongoose.Model <IOTPDoc> {
    build(attrs: IOTPAttrs): IOTPDoc;
};

const otpSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    sid: {
        type: String,
        unique: true,
        required: true
    },
    otp_code: {
        type: Number,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    phoneTo: {
        type: String,
        required: true
    },
    phoneFrom: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        },
        versionKey: false,
    },
    collection: 'otp_codes'
});

otpSchema.set('timestamps', true); 
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });


otpSchema.statics.build = (attrs: IOTPAttrs) => {
    return new OTP({
        userId: attrs.id,
        sid: attrs.sid,
        otp_code: attrs.otp_code,
        expiresAt: attrs.expiresAt,
        phoneTo: attrs.phoneTo,
        phoneFrom: attrs.phoneFrom
    });
};

const OTP = mongoose.model<IOTPDoc, IOTPModel>('otp_codes', otpSchema);

export default OTP;