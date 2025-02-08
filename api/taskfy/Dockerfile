# Usar uma imagem base do Maven ou Gradle
FROM maven:3.8.4-openjdk-17-slim AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto
COPY ./pom.xml ./ 
COPY ./src ./src

# Rodar o Maven para compilar a aplicação
RUN mvn clean package -DskipTests

# Usar a imagem base do OpenJDK
FROM openjdk:17-jdk-slim

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o JAR compilado da etapa anterior
COPY --from=build /app/target/taskfy-0.0.1-SNAPSHOT.jar ./taskfy.jar

# Expor a porta 8080 para a aplicação Spring Boot
EXPOSE 8080

# Comando para rodar a aplicação Spring Boot
CMD ["java", "-jar", "taskfy.jar"]
