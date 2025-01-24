
Para el desarrollo del sistema se utilizó MySQL como sistema de gestión de bases de datos, implementando tablas clave como Pais, Departamento, Municipio, Empresa, Colaborador, ColaboradorEmpresa, personal y autenticacion con el fin de almacenar de manera eficiente la información y gestionar relaciones entre las distintas entidades. La seguridad fue un aspecto prioritario, por lo que las contraseñas fueron cifradas y se permitió una gestión independiente de los empleados a través de un modelo relacional adecuado.

En el backend se empleó Express con TypeScript, protegiendo las rutas mediante el uso de tokens. Solo el endpoint de login no requiere autenticación, ya que es el encargado de validar las credenciales del usuario y generar el token que se almacena localmente en el navegador, garantizando así un acceso seguro al sistema.

Para el frontend se utilizó Angular con TypeScript. Se implementaron guards e interceptors para gestionar los accesos, asegurando que solo los usuarios autenticados puedan interactuar con el sistema. Se diseñó un sistema de login escalable, permitiendo la futura inclusión de un módulo de administración de personal para facilitar la gestión de accesos. Se integró Angular Material para optimizar la interfaz de usuario y se desarrollaron servicios personalizados para interactuar con la API REST, permitiendo una comunicación eficiente entre el cliente y el servidor. La validación de formularios fue implementada mediante Reactive Forms, garantizando una experiencia de usuario fluida y segura.
![imagen](https://github.com/user-attachments/assets/e1e5a16f-199f-489d-bb2f-e4d3e61544c5)
![imagen](https://github.com/user-attachments/assets/823dfda1-861c-44a1-b988-fcc367cccc5b)
![imagen](https://github.com/user-attachments/assets/f5d511d1-b1da-4bce-8848-37095deda77b)
![imagen](https://github.com/user-attachments/assets/f37a60d9-2d78-4ee9-aa82-35af80f0008f)
![imagen](https://github.com/user-attachments/assets/ab73f2e8-4f98-4a27-8b28-e535f497aedc)
![imagen](https://github.com/user-attachments/assets/d907cced-9a33-481b-869a-b3696a1ad375)
![imagen](https://github.com/user-attachments/assets/2e9a6163-225c-4f4b-b41c-44602266e8ef)
![imagen](https://github.com/user-attachments/assets/c0ad90f8-119e-46a4-bd7f-2be66e94c946)
![imagen](https://github.com/user-attachments/assets/2b12aa15-ab95-4c8c-9bed-8e6a550947d6)
![imagen](https://github.com/user-attachments/assets/692697c9-0719-4b2b-8684-787d95d77518)
![imagen](https://github.com/user-attachments/assets/b9dbadba-d002-4082-8208-f5f776bcc05f)
![imagen](https://github.com/user-attachments/assets/b1019486-531f-4814-a56c-21ab5ddf6fc1)
![imagen](https://github.com/user-attachments/assets/32565804-5770-41dc-a35b-8080873d41ae)
![imagen](https://github.com/user-attachments/assets/1a69cb2e-4732-47c8-a513-c6c6f376a95a)
![imagen](https://github.com/user-attachments/assets/4b789ff4-58f7-43e5-94c6-a32dc2ac0df4)
![imagen](https://github.com/user-attachments/assets/7da7342c-23b7-49d8-bcb2-29787d5e2cda)
![imagen](https://github.com/user-attachments/assets/4f693dee-3206-4517-8757-8c1befaac1a9)
![imagen](https://github.com/user-attachments/assets/e8847404-42f5-4215-845a-273273f87853)



