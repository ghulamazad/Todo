# Build Stage
FROM eclipse-temurin:21-jdk-jammy AS builder
LABEL authors="Md.Ghulam Azad Ansari"

WORKDIR /opt/app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./

RUN ./mvnw dependency:go-offline

COPY ./src ./src

RUN ./mvnw clean install -DskipTests

# Run Stage
FROM eclipse-temurin:21-jre-jammy

WORKDIR /opt/app

EXPOSE 8080

COPY --from=builder /opt/app/target/*.jar /opt/app/app.jar

CMD ["java", "-jar", "app.jar"]
