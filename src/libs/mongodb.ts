import mongoose from 'mongoose';

if (!process.env.MONGODB_URL) {
  throw new Error('Por favor, define la variable de entorno MONGODB_URL');
}

const MONGODB_URL: string = process.env.MONGODB_URL;
/*
CONNECTION STATES:
    0 = disconnected
    1 = connected
    2 = connecting
    3 = disconnecting
*/
const stateConnection = {
    isConnected: 0
}

export const connectDB = async() => {

    if( stateConnection.isConnected === 1 ){
        // Ya estamos conectados
        return
    }

    // Verificamos si hay alguna conexión
    if( mongoose.connections.length > 0 ){
        
        // Asignar el estado actual de la conexión
        stateConnection.isConnected = mongoose.connections[0].readyState
    
        if( stateConnection.isConnected === 1 ){
            // Utilizar esa conexión
            return
        }

        // Desconectar
        await mongoose.disconnect()
    }
    
    await mongoose.connect( MONGODB_URL )
    stateConnection.isConnected = 1
    console.log('Conexión a la DB exitosa ✅')
}

