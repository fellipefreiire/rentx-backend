# Cadastro de carro

**RF**
[X] Deve ser possível cadastrar um novo carro.

**RN**
[X] Não deve ser possível cadastrar um carro com uma placa já existente.
[X] O carro deve estar disponível ao ser cadastrado.
[X] O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
[X] Deve ser possível listar todos os carros disponíveis.
[X] Deve ser possível listar todos os carros disponíveis pelo nome do carro.
[X] Deve ser possível listar todos os carros disponíveis pela marca do carro.
[X] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.

**RN**
[X] O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**RF**
[X] Deve ser possível cadastrar uma especificação para um carro.

**RN**
[X] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
[X] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
[X] O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**
[] Deve ser possível cadastrar a imagem do carro.

**RNF**
[X] Utilizar o multer para upload dos arquivos.

**RN**
[] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
[] O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
[] Deve ser possível cadastrar um aluguel.

**RN**
[] O aluguel deve ter duração mínima de 24 horas.
[] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
[] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
