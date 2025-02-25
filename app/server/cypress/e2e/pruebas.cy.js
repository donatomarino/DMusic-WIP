const login = [
  ['donato_8@icloud.com', "donato_8@icloud.com", "prueba@gmail.com"],
  ['donato1234', "donato123", "prueba1prueba"]
]

const searches = ['despacito', 'perotu', 'pero tu', 'macherie', 'ma cherie', 'shakira'];

for (let i = 0; i < login[0].length; i++) {
  for (let y = 0; y < 1; y++) {
      for (let x = 1; x < 2; x++) {
        describe('Login', () => {
          it('Login page', () => {
            cy.visit('http://localhost:3000/login')
            cy.get('input[name="email"]').type(`${login[y][i]}{enter}`);
            cy.get('input[name="password"]').type(`${login[x][i]}{enter}`);
          });
        })
      }
  }
}

searches.forEach(e => {
  describe('Search song', () => {
    it('Home page', () => {
      cy.visit('http://localhost:3000/')
      cy.get('input[name="searchbar"]').type(`${e}{enter}`);
    });
  })
})
