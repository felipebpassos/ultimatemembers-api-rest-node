-- Criação do banco de dados
CREATE DATABASE ultimatemembers
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

-- Selecionando o banco de dados
USE ultimatemembers;

select * from lessons;

-- Criação da tabela Users
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) NOT NULL UNIQUE, -- UUID para compartilhamento seguro
    role ENUM('user', 'adm') NOT NULL DEFAULT 'user', -- Papel do usuário
    name VARCHAR(255) NOT NULL, -- Nome do usuário
    email VARCHAR(255) NOT NULL UNIQUE, -- Email único
    password VARCHAR(255) NOT NULL, -- Hash da senha
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data de criação
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Data de atualização
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Criação da tabela Banners
CREATE TABLE Banners (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID único para o banner
    title VARCHAR(255) NOT NULL, -- Título do banner
    link VARCHAR(255) NOT NULL, -- URL para onde o banner aponta
    image_url VARCHAR(255) NOT NULL, -- URL da imagem do banner
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data de criação
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Data de atualização
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Criação da tabela Modules
CREATE TABLE Modules (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID do módulo
    title VARCHAR(255) NOT NULL, -- Título do módulo
    description TEXT NOT NULL, -- Descrição do módulo
    cover_url VARCHAR(255) NOT NULL, -- URL da imagem de capa
    video_cover_url VARCHAR(255), -- URL do vídeo de capa (opcional)
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data de criação
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Data de atualização
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Criação da tabela Lessons
CREATE TABLE Lessons (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID da aula
    title VARCHAR(255) NOT NULL, -- Título da aula
    description TEXT NOT NULL, -- Descrição da aula (HTML)
    video VARCHAR(255) NOT NULL, -- URL ou texto do conteúdo da aula
    platform ENUM('AWS', 'Vimeo', 'Panda', 'YouTube') NOT NULL, -- Plataforma de hospedagem
    moduleId INT NOT NULL, -- Relacionamento com o módulo
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data de criação
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Data de atualização
    FOREIGN KEY (moduleId) REFERENCES Modules(id) ON DELETE CASCADE -- Cascade para deletar as aulas ao excluir o módulo
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Criação da tabela para marcar aulas assistidas
CREATE TABLE WatchedLessons (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID único para a marcação
    userId INT NOT NULL, -- ID do usuário
    lessonId INT NOT NULL, -- ID da aula
    watchedAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data em que a aula foi assistida
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE, -- Excluir marcações ao deletar o usuário
    FOREIGN KEY (lessonId) REFERENCES Lessons(id) ON DELETE CASCADE -- Excluir marcações ao deletar a aula
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

