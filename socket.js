import socket from "socket.io";
// Define an asynchronous function named 'setupSocket' that takes a 'server' object as a parameter
export default async function setupSocket(server) {
  // Create a new socket.io instance using the provided 'server'
  const io = socket(server);

  // Set up a listener for the 'connection' event, which triggers when a new socket client connects
  io.on("connection", async (socket) => {
    // Log the unique identifier (ID) of the newly connected socket
    console.log(socket.id);

    // Set up a listener for the 'join_room' event, which is triggered when a client requests to join a room
    socket.on("join_room", async (data) => {
      // Add the socket to the specified room
      socket.join(data);
      // Log a message indicating that a user has joined a room
      console.log("User Joined Room: " + data);
    });

    // Set up a listener for the 'send_message' event, which occurs when a client sends a message
    socket.on("send_message", async (data) => {
      // Log the content of the message received
      console.log(data);
      // Emit a 'receive_message' event to all sockets in the specified room,
      // containing the content of the message
      await socket.to(data.room).emit("receive_message", data.content);
    });

    // Set up a listener for the 'disconnect' event, which triggers when a client disconnects
    socket.on("disconnect", async () => {
      // Log a message indicating that a user has disconnected
      console.log("USER DISCONNECTED");
    });
  });
}
