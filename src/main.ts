import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS globally
  app.enableCors({
    origin: ['http://localhost:3000', 'http://192.168.43.198:3000'], // Allow these origins
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();