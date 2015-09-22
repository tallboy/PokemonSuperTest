module.exports = function(Pokemon) {

  // Pokemon.afterRemote('**', function(ctx, user, next) {
  //   if (ctx.result) {
  //     if (Array.isArray(ctx.result)) {
  //       ctx.result.forEach(function(result) {
  //         result.type = 'fire';
  //       });
  //     } else {
  //       ctx.result.type = 'fire';
  //     }
  //   }

  //   next();
  // });

  Pokemon.beforeRemote('**', function(ctx, instance, next) {
    console.log('Before hook: **');
    next();
  });

  Pokemon.beforeRemote('*', function(ctx, instance, next) {
    console.log('Before hook: *');
    next();
  });

  Pokemon.beforeRemote('*.*', function(ctx, instance, next) {
    console.log('Before hook: *.*');
    next();
  });

  Pokemon.beforeRemote('prototype.*', function(ctx, instance, next) {
    console.log('Before hook: prototype.*');
    next();
  });

  Pokemon.beforeRemote('prototype.create', function(ctx, instance, next) {
    console.log('Before hook: prototype.create');
    next();
  });

  Pokemon.beforeRemote('pokemon.create', function(ctx, instance, next) {
    console.log('Before hook: pokemon.create');
    next();
  });

  Pokemon.beforeRemote('Pokemon.create', function(ctx, instance, next) {
    console.log('Before hook: Pokemon.create');
    next();
  });

  Pokemon.afterRemote('**', function(ctx, instance, next) {
    if (ctx.result) {
      if (Array.isArray(ctx.result)) {
        ctx.result.forEach(function(result) {
          result.type = 'fire';
        });
      } else {
        ctx.result.type = 'fire';
      }
    }

    next();
  });

};
