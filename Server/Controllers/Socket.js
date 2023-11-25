import { Server } from 'socket.io';


const StartSocket = (server)=>{

  const io = new Server(server , {
    cors:{
        origin:"*"
    }
  });

  io.on('connection', (socket) => {
    console.log("user connect")
    socket.on('customEvent', (data) => {
        console.log(data);
        socket.broadcast.emit('changedBid' , data)
        
      });
  })

 

}


export default StartSocket
