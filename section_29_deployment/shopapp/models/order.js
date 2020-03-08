const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [{
        product: { type: Object, required: true },
        quantity: { type: Number, required: true }
    }],
    user: {
        email: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    paypal_order: {
        statusCode: {
            type: Number
        },
        headers:
        {
            'cache-control': { type: String, required: true },
            'content-length': { type: String, required: true },
            'content-type': { type: String, required: true },
            date: { type: String, required: true },
            'paypal-debug-id': { type: String, required: true },
            connection: { type: String, required: true }
        },
        result:
        {
            id: { type: String, required: true },
            intent: { type: String, required: true },
            purchase_units: [{

            }],
            payer:
            {
                name: { given_name: { type: String, required: true }, surname: { type: String, required: true } },
                email_address: { type: String, required: true },
                payer_id: { type: String, required: true },
                address: { country_code: { type: String, required: true } }
            },
            create_time: { type: String, required: true },
            update_time: { type: String, required: true },
            links: [
                {
                    href: { type: String, required: true },
                    rel: { type: String, required: true },
                    method: { type: String, required: true }
                }],
            status: { type: String, required: true }
        }
    }
});

module.exports = mongoose.model('Order', orderSchema);

