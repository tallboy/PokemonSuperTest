'use strict';

var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest-as-promised');
var app = require('../server/server.js');

describe('Pokemon', function() {

  // APP TEST
  it('should create a pokemon', function(done) {

    var payload = {
      name: 'Squirtle',
      type: 'water',
      color: 'blue'
    };

    //With the core app test we get the right type
    var Pokemon = app.models.Pokemon;
    Pokemon.create(payload, function(err, pokemonInstance) {
      expect(!err);
      console.log('Internal Create: ', pokemonInstance);
      expect(pokemonInstance.name).to.equal('Squirtle');
      expect(pokemonInstance.type).to.equal('water');
      done();
    });
  });

  // API TEST
  it('should create a pokemon using the API', function(done) {
    var payload = {
      name: 'Squirtle',
      type: 'water',
      color: 'blue'
    };

    var request = supertest(app);
    request.post('/api/pokemon')
      .type('json')
      .accept('json')
      .send(payload)
      .expect(200)

      .then(function(postResponse) {
        expect(postResponse.body.name).to.equal('Squirtle');

        //POST was successful! Let's make a GET with our new pokemon
        console.log('POST: ', postResponse.body);
        var pokemonId = postResponse.body.id;
        return request.get('/api/pokemon/' + pokemonId)
          .type('json')
          .accept('json')
          .expect(200);

      }).then(function(getResponse) {

        //The API test gives us the wrong type!
        console.log('GET: ', getResponse.body);
        expect(getResponse.body.name).to.equal('Squirtle');
        expect(getResponse.body.type).to.equal('water');
        done();
      }).catch(function(err) {
        // Catch errors here
        console.log('ERR', err);
        if (err) done(err);
      });
  });

});
