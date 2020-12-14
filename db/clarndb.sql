-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 16-08-2020 a las 00:39:33
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `clarndb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adminuser`
--

CREATE TABLE `adminuser` (
  `idUserAdmin` int(10) NOT NULL,
  `username` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(45) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `adminuser`
--

INSERT INTO `adminuser` (`idUserAdmin`, `username`, `password`) VALUES
(1, 'admin', 'admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adminuser`
--
ALTER TABLE `adminuser`
  ADD PRIMARY KEY (`idUserAdmin`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adminuser`
--
ALTER TABLE `adminuser`
  MODIFY `idUserAdmin` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- clarndb.adminuser definition



-- clarndb.usuarioCliente definition

CREATE TABLE `usuarioCliente` (
  `idUsuarioCliente` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `contrasena` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idUsuarioCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


-- clarndb.distrito definition

CREATE TABLE `distrito` (
  `idDistrito` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `detalles` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idDistrito`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


-- clarndb.metodoPago definition

CREATE TABLE `metodoPago` (
  `idMetodoPago` int(11) NOT NULL AUTO_INCREMENT,
  `nombreMetodoPago` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `tipoMoneda` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idMetodoPago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


-- clarndb.tipoProducto definition

CREATE TABLE `tipoProducto` (
  `idTipoProducto` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProducto` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `tamanoProducto` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idTipoProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


-- clarndb.cliente definition

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `celular` int(11) NOT NULL,
  `direccion` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `idUsuarioCliente` int(11) NOT NULL,
  `idDistrito` int(11) NOT NULL,
  PRIMARY KEY (`idCliente`),
  KEY `cliente_FK` (`idUsuarioCliente`),
  KEY `cliente_FK_1` (`idDistrito`),
  CONSTRAINT `cliente_FK` FOREIGN KEY (`idUsuarioCliente`) REFERENCES `usuarioCliente` (`idUsuarioCliente`),
  CONSTRAINT `cliente_FK_1` FOREIGN KEY (`idDistrito`) REFERENCES `distrito` (`idDistrito`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


-- clarndb.producto definition

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL AUTO_INCREMENT,
  `idTipoProducto` int(11) NOT NULL,
  `precio` float(5,2) NOT NULL,
  PRIMARY KEY (`idProducto`),
  KEY `producto_FK` (`idTipoProducto`),
  CONSTRAINT `producto_FK` FOREIGN KEY (`idTipoProducto`) REFERENCES `tipoProducto` (`idTipoProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


-- clarndb.pedido definition

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL AUTO_INCREMENT,
  `idProducto` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `cantidad` int(11) NOT NULL,
  `subtotal` float(7,2) NOT NULL,
  PRIMARY KEY (`idPedido`),
  KEY `pedido_FK` (`idProducto`),
  CONSTRAINT `pedido_FK` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


-- clarndb.ventaPedido definition

CREATE TABLE `ventaPedido` (
  `idVentaPedido` int(11) NOT NULL AUTO_INCREMENT,
  `idPedido` int(11) NOT NULL,
  `idMetodoPago` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  PRIMARY KEY (`idVentaPedido`),
  KEY `ventaPedido_FK` (`idPedido`),
  KEY `ventaPedido_FK_1` (`idMetodoPago`),
  KEY `ventaPedido_FK_2` (`idCliente`),
  CONSTRAINT `ventaPedido_FK` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`),
  CONSTRAINT `ventaPedido_FK_1` FOREIGN KEY (`idMetodoPago`) REFERENCES `metodoPago` (`idMetodoPago`),
  CONSTRAINT `ventaPedido_FK_2` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO clarndb.usuarioCliente
(email, contrasena)
VALUES('cliente@gmail.com', 'cliente123');

INSERT INTO clarndb.distrito
(nombre, detalles)
VALUES('Pacocha', 'Distrito principal de la ciudad de ILO');

INSERT INTO clarndb.cliente
(nombres, apellidos, celular, direccion, idUsuarioCliente, idDistrito)
VALUES('Kael Ymir', 'Chambi Quispe', 954214323, 'Jr. Zepita Nº 562', 1, 1);

INSERT INTO clarndb.tipoProducto
(nombreProducto, tamanoProducto)
VALUES('Hawaiana', 'Personal');

INSERT INTO clarndb.producto
(idTipoProducto, precio)
VALUES(1, 24.50);