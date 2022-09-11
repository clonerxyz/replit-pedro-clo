const colors = require('colors');
const AsciiTable = require('ascii-table');
const table = new AsciiTable('Replit Bot'.random);

module.exports = async (client) => {
  table.addRow('Message Event', 'Online');
  table.addRow('Ready Event', 'Online');
  table.addRow('Web', 'Online');
  table.addRow('Bot', 'Online');
  console.log(table.toString());
};