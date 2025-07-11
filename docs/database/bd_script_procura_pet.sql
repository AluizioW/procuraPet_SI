-- MySQL Script generated by MySQL Workbench
-- qua 25 jun 2025 09:57:13
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema procuraPet_v3
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema procuraPet_v3
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `procuraPet_v3` ;
USE `procuraPet_v3` ;

-- -----------------------------------------------------
-- Table `procuraPet_v3`.`endereco`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `procuraPet_v3`.`endereco` ;

CREATE TABLE IF NOT EXISTS `procuraPet_v3`.`endereco` (
  `idEndereco` INT NOT NULL AUTO_INCREMENT,
  `logradouro` VARCHAR(90) NOT NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `cep` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idEndereco`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `procuraPet_v3`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `procuraPet_v3`.`usuario` ;

CREATE TABLE IF NOT EXISTS `procuraPet_v3`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nomeUsuario` VARCHAR(90) NOT NULL,
  `email` VARCHAR(90) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `telefone` VARCHAR(20) NOT NULL,
  `fotoUsuario` VARCHAR(255) NULL,
  `descricaoUsuario` VARCHAR(255) NULL,
  `idEndereco` INT NULL,
  `statusConta` ENUM('inativo', 'ativo', 'suspenso', 'excluido') NOT NULL DEFAULT 'inativo',
  `tipoUsuario` ENUM('padrao', 'moderador') NOT NULL DEFAULT 'padrao',
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `idUsuário_UNIQUE` (`idUsuario` ASC) VISIBLE,
  INDEX `fk_usuario_1_idx` (`idEndereco` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `procuraPet_v3`.`pet`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `procuraPet_v3`.`pet` ;

CREATE TABLE IF NOT EXISTS `procuraPet_v3`.`pet` (
  `idPet` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `raca` VARCHAR(45) NULL,
  `cor` VARCHAR(45) NOT NULL,
  `fotoPet` VARCHAR(255) NOT NULL,
  `especie` VARCHAR(45) NOT NULL,
  `sexo` ENUM('macho', 'femea') NOT NULL,
  `idDono` INT NOT NULL,
  `idade` VARCHAR(45) NULL,
  PRIMARY KEY (`idPet`),
  INDEX `fk_pet_1_idx` (`idDono` ASC) VISIBLE,
  CONSTRAINT `fk_pet_1`
    FOREIGN KEY (`idDono`)
    REFERENCES `procuraPet_v3`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `procuraPet_v3`.`postagem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `procuraPet_v3`.`postagem` ;

CREATE TABLE IF NOT EXISTS `procuraPet_v3`.`postagem` (
  `idPostagem` INT NOT NULL AUTO_INCREMENT,
  `idUsuarioPostagem` INT NOT NULL,
  `descricaoPostagem` VARCHAR(255) NULL,
  `dataCriacao` DATETIME NOT NULL,
  `idLocal` INT NOT NULL,
  `idPetPostagem` INT NULL,
  `dataModificacao` DATETIME NULL,
  `dataExclusao` DATETIME NULL,
  `statusPetPostagem` ENUM('desaparecido', 'adocao', 'encontrado') NULL,
  `statusPostagem` ENUM('ativo', 'suspenso', 'excluido') NOT NULL,
  `recompensa` VARCHAR(45) NULL,
  PRIMARY KEY (`idPostagem`),
  INDEX `fk_postagem_1_idx` (`idUsuarioPostagem` ASC) VISIBLE,
  INDEX `fk_postagem_2_idx` (`idLocal` ASC) VISIBLE,
  INDEX `fk_postagem_3_idx` (`idPetPostagem` ASC) VISIBLE,
  CONSTRAINT `fk_postagem_1`
    FOREIGN KEY (`idUsuarioPostagem`)
    REFERENCES `procuraPet_v3`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_postagem_2`
    FOREIGN KEY (`idLocal`)
    REFERENCES `procuraPet_v3`.`endereco` (`idEndereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_postagem_3`
    FOREIGN KEY (`idPetPostagem`)
    REFERENCES `procuraPet_v3`.`pet` (`idPet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `procuraPet_v3`.`comentario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `procuraPet_v3`.`comentario` ;

CREATE TABLE IF NOT EXISTS `procuraPet_v3`.`comentario` (
  `idComentario` INT NOT NULL AUTO_INCREMENT,
  `idPostagem` INT NOT NULL,
  `excluido` TINYINT NOT NULL,
  `legenda` VARCHAR(255) NOT NULL,
  `idResposta` INT NULL,
  `dataComentario` DATETIME NOT NULL,
  PRIMARY KEY (`idComentario`),
  INDEX `fk_comentario_1_idx` (`idPostagem` ASC) VISIBLE,
  INDEX `fk_comentario_2_idx` (`idResposta` ASC) VISIBLE,
  CONSTRAINT `fk_comentario_1`
    FOREIGN KEY (`idPostagem`)
    REFERENCES `procuraPet_v3`.`postagem` (`idPostagem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comentario_2`
    FOREIGN KEY (`idResposta`)
    REFERENCES `procuraPet_v3`.`comentario` (`idComentario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `procuraPet_v3`.`denuncia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `procuraPet_v3`.`denuncia` ;

CREATE TABLE IF NOT EXISTS `procuraPet_v3`.`denuncia` (
  `idDenuncia` INT NOT NULL AUTO_INCREMENT,
  `idPostagem` INT NOT NULL,
  `idDenunciante` INT NOT NULL,
  `descricaoDenuncia` VARCHAR(250) NULL,
  `dataDenuncia` DATETIME NOT NULL,
  `categoria` ENUM('spam', 'assedio', 'violencia') NOT NULL,
  PRIMARY KEY (`idDenuncia`),
  INDEX `fk_denuncia_1_idx` (`idPostagem` ASC) VISIBLE,
  INDEX `fk_denuncia_2_idx` (`idDenunciante` ASC) VISIBLE,
  CONSTRAINT `fk_denuncia_1`
    FOREIGN KEY (`idPostagem`)
    REFERENCES `procuraPet_v3`.`postagem` (`idPostagem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_denuncia_2`
    FOREIGN KEY (`idDenunciante`)
    REFERENCES `procuraPet_v3`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `procuraPet_v3`.`notificacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `procuraPet_v3`.`notificacao` ;

CREATE TABLE IF NOT EXISTS `procuraPet_v3`.`notificacao` (
  `idNotificacao` INT UNSIGNED NOT NULL,
  `idPostagem` INT NOT NULL,
  `idComentario` INT NULL,
  `tipoNotificacao` ENUM('comentario', 'alerta', 'denuncia') NOT NULL,
  `descricaoNotificacao` VARCHAR(180) NOT NULL,
  PRIMARY KEY (`idNotificacao`),
  INDEX `fk_notificacao_1_idx` (`idPostagem` ASC) VISIBLE,
  INDEX `fk_notificacao_2_idx` (`idComentario` ASC) VISIBLE,
  CONSTRAINT `fk_notificacao_1`
    FOREIGN KEY (`idPostagem`)
    REFERENCES `procuraPet_v3`.`postagem` (`idPostagem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_notificacao_2`
    FOREIGN KEY (`idComentario`)
    REFERENCES `procuraPet_v3`.`comentario` (`idComentario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `procuraPet_v3`.`avaliacao_denuncia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `procuraPet_v3`.`avaliacao_denuncia` ;

CREATE TABLE IF NOT EXISTS `procuraPet_v3`.`avaliacao_denuncia` (
  `idAvaliacao_denuncia` INT NOT NULL AUTO_INCREMENT,
  `idModerador` INT NOT NULL,
  `idDenuncia` INT NOT NULL,
  `statusDenuncia` ENUM('pendente', 'processada') NOT NULL,
  `dataModificacaoDenuncia` DATETIME NOT NULL,
  `vereditoDenuncia` ENUM('ignorada', 'aceita') NOT NULL,
  PRIMARY KEY (`idAvaliacao_denuncia`),
  INDEX `fk_avaliacao_denuncia_1_idx` (`idDenuncia` ASC) VISIBLE,
  INDEX `fk_avaliacao_denuncia_2_idx` (`idModerador` ASC) VISIBLE,
  CONSTRAINT `fk_avaliacao_denuncia_1`
    FOREIGN KEY (`idDenuncia`)
    REFERENCES `procuraPet_v3`.`denuncia` (`idDenuncia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_avaliacao_denuncia_2`
    FOREIGN KEY (`idModerador`)
    REFERENCES `procuraPet_v3`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;