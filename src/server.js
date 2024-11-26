import app from './app.js';
import { env } from './utils/env.js';
import { initMongoConnection } from './initMongoConnection.js';


async function bootstrap() {
  
  try {
    await initMongoConnection();

    const PORT = Number(env('PORT', 3000));
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
