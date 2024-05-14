import { data } from '../fixtures/ingredients.json';

describe('Проверка работы  конструктора', () => {
  const baseURL = 'http://localhost:4000'
  const bun = '[data-cy="643d69a5c3f7b9001cfa093d"]';

  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    })
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    })
    cy.intercept('POST', '/api/orders', {
      fixture: 'orders.json'
    })
  
    cy.setCookie('accessToken', 'testToken');
    localStorage.setItem('refreshToken', 'testRefreshToken');
  });

  it('Проверка добавленя ингредиента в конструктор', () => {
    cy.visit(baseURL);
    cy.get(bun)
    .contains('Добавить').click();
    cy.get('.constructor-element').contains('Флюоресцентная булка');
  });

  it('Проверка оформления заказа', () => {
    cy.visit(baseURL);
    cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]')
      .contains('Добавить').click();
    cy.get('[data-cy="643d69a5c3f7b9001cfa0942"]')
      .contains('Добавить').click();
    cy.get(bun)
      .contains('Добавить').click();
    cy.get('button').contains('Оформить заказ').click();
    cy.contains('44444');
    cy.get('[data-cy="modal-close"]').click();
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });

  it('Проверка модального окна ингредиента', () => {
    cy.visit(baseURL);
    cy.get(bun)
      .contains('Флюоресцентная булка').click();
    cy.get('li').contains('Калории, ккал');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('li').contains('Калории, ккал').should('not.exist');
  });
});
