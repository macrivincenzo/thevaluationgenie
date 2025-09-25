import express from "express";
import { registerRoutes } from "../server/routes.js";
import { db, withDatabaseRetry, checkDatabaseHealth } from "../server/db.js";
import { users } from "../shared/schema.js";
import { eq } from "drizzle-orm";
import cookieParser from "cookie-parser";

// Initialize users in database to match in-memory auth system with retry logic
async function initializeUsers() {
  try {
    // Check database health first
    const isHealthy = await checkDatabaseHealth();
    if (!isHealthy) {
      console.warn('Database health check failed, but continuing with initialization...');
    }

    await withDatabaseRetry(async () => {
      // Check if test user exists
      const testUser = await db.select().from(users).where(eq(users.id, "test-user-id"));
      if (testUser.length === 0) {
        await db.insert(users).values({
          id: "test-user-id",
          email: "test@test.com",
          firstName: "Test",
          lastName: "User"
        });
        console.log('Created test user in database');
      }

      // Check if your user exists
      const mainUser = await db.select().from(users).where(eq(users.id, "your-user-id"));
      if (mainUser.length === 0) {
        await db.insert(users).values({
          id: "your-user-id",
          email: "macrivincenzo@hotmail.com",
          firstName: "",
          lastName: ""
        });
        console.log('Created main user in database');
      }
    });

    console.log('Users created:', ['test@test.com', 'macrivincenzo@hotmail.com']);
  } catch (error) {
    console.error('Error initializing database users:', error);
    console.warn('Application will continue with in-memory auth fallback');
  }
}

// Create Express app for serverless
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Initialize database users
let initialized = false;

export default async function handler(req, res) {
  if (!initialized) {
    await initializeUsers();
    await registerRoutes(app);
    initialized = true;
  }

  return app(req, res);
}