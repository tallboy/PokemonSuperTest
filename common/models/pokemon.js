module.exports = (Pokemon) => {

  Pokemon.afterRemote('**', (ctx, user, next) => {
    if (ctx.result) {
      if (Array.isArray(ctx.result)) {
        ctx.result.forEach((result) => {
          result.type = 'fire';
        });
      } else {
        ctx.result.type = 'fire';
      }
    }

    next();
  });

};
