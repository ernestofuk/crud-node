const { mongoose } = require(".");

module.exports = mongoose => {
    const tutorial = mongoose.model(
        "tutorial",
        mongoose.Schema(
            {
                title: String,
                description: String,
                published: Boolean
            },
            {
                timestamps: true
            }
        )
    );
    return tutorial;
};