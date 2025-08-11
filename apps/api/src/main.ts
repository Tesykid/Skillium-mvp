import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import * as dotenv from 'dotenv'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors()
  const port = process.env.PORT || 4000
  await app.listen(port as number, '0.0.0.0')
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}/api`)
}

bootstrap()