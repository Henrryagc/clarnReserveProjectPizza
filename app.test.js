const request = require("supertest");
const app = require("./app");

describe("Prueba de la ruta principal '/'", () => {
  test("Debe de responder al metodo GET", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
describe("Prueba de la ruta del pedido'/index/pedido'", () => {
    test("Debe de responder al metodo POST", () => {
      request(app)
        .post("/index/pedido")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });
  describe("Prueba de la ruta  Iniciar Sesion '/index/iniciarSesion'", () => {
    test("Debe de responder al metodo GET", () => {
      request(app)
        .get("/index/iniciarSesion")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });
  describe("Prueba de la ruta Validar Login '/customer/validarLogin'", () => {
    test("Debe de responder al metodo POST", () => {
      request(app)
        .post("/customer/validarLogin")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });
  describe("Prueba de la ruta Insertar Customer '/customer/insertar'", () => {
    test("Debe de responder al metodo POST", () => {
      request(app)
        .post("/customer/insertar")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });
  describe("Prueba de la ruta Traer Distritos '/customer/traerDistritos'", () => {
    test("Debe de responder al metodo GET", () => {
      request(app)
        .get("/customer/traerDistritos")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });
  describe("Prueba de la ruta Buscar id Usuario Creado '/customer/buscarIdUsuarioCreado'", () => {
    test("Debe de responder al metodo POST", () => {
      request(app)
        .post("/customer/buscarIdUsuarioCreado")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });