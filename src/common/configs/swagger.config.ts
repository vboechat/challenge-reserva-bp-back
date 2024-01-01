import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
/**
 * @param {INestApplication} app - NestJS application instance.
 */
export default function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Reserva-BP")
    .setDescription(
      "Documentação da API do desafio para RESERVA-BP da Bem Protege.",
    )
    .setVersion("1.0")
    .addSecurity("bearer", {
      type: "http",
      scheme: "bearer",
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document);
  console.log("Swagger enabled at /docs");
}
