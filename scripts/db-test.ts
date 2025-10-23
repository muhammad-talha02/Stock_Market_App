import mongoose from 'mongoose';
import { connectToDatabase } from '@/database/mongoose';

// Load environment variables

async function testDatabaseConnection() {
  console.log('🔍 Testing MongoDB connection...\n');
  
  try {
    // Test connection
    await connectToDatabase();
    
    // Verify connection state
    const state = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    
    console.log('✅ Connection successful!');
    console.log(`📊 Connection state: ${states[state]}`);
    console.log(`🗄️  Database name: ${mongoose.connection.db?.databaseName || 'N/A'}`);
    console.log(`🌐 Host: ${mongoose.connection.host || 'N/A'}`);
    console.log(`🔌 Port: ${mongoose.connection.port || 'N/A'}`);
    
    // Optional: List collections
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log(`📚 Collections (${collections.length}):`, collections.map(c => c.name).join(', ') || 'None');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    // Clean up
    await mongoose.connection.close();
    console.log('\n🔒 Connection closed.');
  }
}

testDatabaseConnection();