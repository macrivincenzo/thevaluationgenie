import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Enhanced connection configuration with retry logic
const connectionConfig = {
  connectionString: process.env.DATABASE_URL,
  // Connection pool settings for stability
  max: 10, // Maximum number of connections in pool
  min: 2,  // Minimum number of connections in pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 10000, // Timeout connection attempts after 10 seconds
};

export const pool = new Pool(connectionConfig);
export const db = drizzle({ client: pool, schema });

// Database health check function
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

// Graceful database connection wrapper
export async function withDatabaseRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      console.error(`Database operation failed (attempt ${attempt}/${maxRetries}):`, error);
      
      if (attempt === maxRetries) {
        throw new Error(`Database operation failed after ${maxRetries} attempts: ${error.message}`);
      }
      
      // Wait before retrying with exponential backoff
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Unexpected error in withDatabaseRetry');
}