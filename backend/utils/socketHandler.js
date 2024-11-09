// const ApiHealth = require('../models/ApiHealth');
// const ContainerHealth = require('../models/ContainerHealth');
// const ServerHealth = require('../models/ServerHealth');
// const healthChecks = require('./socketHandler');

// module.exports = (socket, io) => {
// //   socket.on('startApiCheck', async ({ url, interval }) => {
// //     setInterval(async () => {
// //       const result = await healthChecks.checkApiHealth(url);
// //       io.emit('apiHealthUpdate', result);
// //       await ApiHealth.create(result);
// //     }, interval);
// //   });

// //   socket.on('startContainerCheck', async ({ containerName, interval }) => {
// //     setInterval(async () => {
// //       const result = await healthChecks.checkContainerHealth(containerName);
// //       io.emit('containerHealthUpdate', result);
// //       await ContainerHealth.create(result);
// //     }, interval);
// //   });

//   socket.on('startServerCheck', async ({ interval }) => {
//     setInterval(async () => {
//       const result = await healthChecks.checkServerHealth();
//       io.emit('serverHealthUpdate', result);
//       await ServerHealth.create(result);
//     }, interval);
//   });
// };
