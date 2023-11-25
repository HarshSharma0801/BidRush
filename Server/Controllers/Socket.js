import { Server } from 'socket.io';


const StartSocket = (server)=>{

  const io = new Server(server , {
    cors:{
        origin:"*"
    }
  });

  io.on('connection', (socket) => {
    socket.on('customEvent', (data) => {
        socket.broadcast.emit('changedBid' , data)
        
      });
  })

 

}


export default StartSocket