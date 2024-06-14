const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, 'please enter the name']
        },
        quantity: {
            type: Number,
            require: true,
            default: 0
        },
        price : {
            type: Number,
            require: true,
        },
        image: {
            type: String,
            require: false
    
    
    },

   
},
    {
        timestamp: true
    }
)

//from the above we have created the productSchema---


const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// The Above is the product Model--