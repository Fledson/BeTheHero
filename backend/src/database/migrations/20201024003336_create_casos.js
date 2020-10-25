
exports.up = function(knex) {
  return knex.schema.createTable('casos', table => {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    
    table.string('ong_id').notNullable(); //chave estrangeira

    table.foreign('ong_id').references('id').inTable('ongs'); //criando a referencia na tabela
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('casos')
};
