import { expect } from 'chai';
import request from 'supertest';
import app from '../app.mjs';

describe('app.mjs', () => {
  it('GET / should return the home page', async () => {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.text).to.include('Home Page');
  });

  it('GET /register should return the register page', async () => {
    const res = await request(app).get('/register');
    expect(res.status).to.equal(200);
    expect(res.text).to.include('Register');
  });

  it('GET /login should return the login page', async () => {
    const res = await request(app).get('/login');
    expect(res.status).to.equal(200);
    expect(res.text).to.include('Login');
  });

  it('GET /my-movies should redirect to if authentication fails /login', async () => {
    const res = await request(app).get('/my-movies');
    expect(res.status).to.equal(302); 
    expect(res.header.location).to.equal('/login'); 
  });
});
