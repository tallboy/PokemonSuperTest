'use strict';

const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest-as-promised');
const app = require('../server/server.js');

describe('Pokemon', () => {

  // APP TEST
  it('should create a pokemon', (done) => {

    const payload = {
      name: 'Squirtle',
      type: 'water',
      color: 'blue'
    };

    //With the core app test we get the right type
    const Pokemon = app.models.Pokemon;
    Pokemon.create(payload, (err, pokemonInstance) => {
      expect(!err);
      console.log('Internal Create: ', pokemonInstance);
      expect(pokemonInstance.name).to.equal('Squirtle');
      expect(pokemonInstance.type).to.equal('water');
      done();
    });
  });

  // API TEST
  it('should create a pokemon using the API', (done) => {
    const payload = {
      name: 'Squirtle',
      type: 'water',
      color: 'blue'
    };

    let request = supertest(app);
    request.post('/api/pokemon')
      .type('json')
      .accept('json')
      .send(payload)
      .expect(200)

      .then((postResponse) => {
        expect(postResponse.body.name).to.equal('Squirtle');

        //POST was successful! Let's make a GET with our new pokemon
        console.log('POST: ', postResponse.body);
        const pokemonId = postResponse.body.id;
        return request.get('/api/pokemon/' + pokemonId)
          .type('json')
          .accept('json')
          .expect(200);

      }).then((getResponse) => {

        //The API test gives us the wrong type!
        console.log('GET: ', getResponse.body);
        expect(getResponse.body.name).to.equal('Squirtle');
        expect(getResponse.body.type).to.equal('water');
        done();
      }).catch(function(err) {
        // Catch errors here

        if (err) {
          console.log('ERR', err);
          done(err);
        }
      });
  });

});
