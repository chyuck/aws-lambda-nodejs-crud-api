module.exports.validate = function(order) {
    const errors = [];

    if (!order.product || typeof order.product !== "string") {
        errors.push("'product' must be provided and valid.");
    }

    if (!order.quantity || typeof order.quantity !== "number") {
        errors.push("'quantity' must be provided and valid.");
    } else {
        if (order.quantity < 1 || order.quantity > 1000) {
            errors.push("'quantity' must be between 1 and 1000.");
        }
    }

    return errors;
};