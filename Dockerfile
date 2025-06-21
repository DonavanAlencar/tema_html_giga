FROM python:3.11-alpine

# Cria grupo e usuário não-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copia o HTML
COPY index.html ./

# Garante que exista /app/assets
RUN mkdir -p assets

# Copia TODO o conteúdo de assets para /app/assets/
COPY assets/ ./assets/

USER appuser

EXPOSE 80
CMD ["python3", "-m", "http.server", "80"]
