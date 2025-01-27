
### Error devido a mudança no comportamento do OpenSSL a partir do Node.js 17+.
1. Solução:
    - Configure o start script no package.json da seguinte maneira:
    ```bash
    "start": "react-scripts --openssl-legacy-provider start",
    ```

### Biblioteca Router está dando problemas de compilação.
1. Solução:
    - usar roteamento manual

