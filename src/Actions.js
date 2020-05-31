class Actions {
    static jump(ctx) {
        ctx.hamster.body.velocity.y = -350;
    }
}

module.exports = Actions;