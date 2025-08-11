import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.use(cors())
  const port = process.env.PORT || 4000
  await app.listen(port)
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}/api`)
}

bootstrap()