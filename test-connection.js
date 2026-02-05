const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/web-motivem-database';

console.log('🔍 Intentando conectar a MongoDB...');
console.log('📍 URI:', mongoURI);

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('✅ Conexión exitosa a MongoDB');
        console.log('📊 Base de datos:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        console.log('🔌 Puerto:', mongoose.connection.port);
        console.log('📈 Estado:', mongoose.connection.readyState); // 1 = conectado

        // Listar colecciones
        return mongoose.connection.db.listCollections().toArray();
    })
    .then((collections) => {
        console.log('\n📚 Colecciones disponibles:');
        if (collections.length === 0) {
            console.log('   ⚠️  No hay colecciones creadas aún');
        } else {
            collections.forEach(col => console.log(`   - ${col.name}`));
        }

        // Cerrar conexión
        return mongoose.connection.close();
    })
    .then(() => {
        console.log('\n✅ Test completado. Conexión cerrada.');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ Error de conexión a MongoDB:', err.message);
        console.error('💡 Posibles causas:');
        console.error('   1. MongoDB no está instalado o no está corriendo');
        console.error('   2. El puerto 27017 está bloqueado');
        console.error('   3. La URI de conexión es incorrecta');
        process.exit(1);
    });
