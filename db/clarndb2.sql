-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 26-08-2020 a las 20:14:35
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL,
  `nombres` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `celular` int(11) NOT NULL,
  `direccion` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `idUsuarioCliente` int(11) NOT NULL,
  `idDistrito` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCliente`, `nombres`, `apellidos`, `celular`, `direccion`, `idUsuarioCliente`, `idDistrito`) VALUES
(1, 'Kael Ymir', 'Chambi Quispe', 954214323, 'Jr. Zepita Nº 562', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `distrito`
--

CREATE TABLE `distrito` (
  `idDistrito` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `detalles` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `distrito`
--

INSERT INTO `distrito` (`idDistrito`, `nombre`, `detalles`) VALUES
(1, 'Pacocha', 'Distrito principal de la ciudad de ILO'),
(2, 'Ilo', 'Distrito principal de la provincia de Ilo'),
(3, 'El Algarrobal', 'Distrito con el museo chiribaya');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodoPago`
--

CREATE TABLE `metodoPago` (
  `idMetodoPago` int(11) NOT NULL,
  `nombreMetodoPago` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `tipoMoneda` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `cantidad` int(11) NOT NULL,
  `subtotal` float(7,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`idPedido`, `idProducto`, `fecha`, `cantidad`, `subtotal`) VALUES
(1, 1, '2020-08-25 12:13:49', 2, 48.40);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `idTipoProducto` int(11) NOT NULL,
  `precio` float(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `idTipoProducto`, `precio`) VALUES
(1, 1, 24.50),
(2, 2, 36.50),
(3, 3, 42.00),
(4, 4, 24.50),
(5, 5, 36.00),
(6, 6, 41.50),
(7, 7, 23.50),
(8, 8, 34.50),
(9, 9, 40.00),
(10, 10, 23.50),
(11, 11, 36.00),
(12, 12, 41.50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoProducto`
--

CREATE TABLE `tipoProducto` (
  `idTipoProducto` int(11) NOT NULL,
  `nombreProducto` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `tamanoProducto` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tipoProducto`
--

INSERT INTO `tipoProducto` (`idTipoProducto`, `nombreProducto`, `tamanoProducto`) VALUES
(1, 'Hawaiana', 'Personal'),
(2, 'Hawaiana', 'Mediana'),
(3, 'Hawaiana', 'Familiar'),
(4, 'Pepperoni', 'Personal'),
(5, 'Pepperoni', 'Mediana'),
(6, 'Pepperoni', 'Familiar'),
(7, 'Napolitana', 'Personal'),
(8, 'Napolitana', 'Mediana'),
(9, 'Napolitana', 'Familiar'),
(10, 'Americana', 'Personal'),
(11, 'Americana', 'Mediana'),
(12, 'Americana', 'Familiar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioCliente`
--

CREATE TABLE `usuarioCliente` (
  `idUsuarioCliente` int(11) NOT NULL,
  `email` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `contrasena` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarioCliente`
--

INSERT INTO `usuarioCliente` (`idUsuarioCliente`, `email`, `contrasena`) VALUES
(1, 'cliente@gmail.com', 'cliente123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventaPedido`
--

CREATE TABLE `ventaPedido` (
  `idVentaPedido` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `idMetodoPago` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adminuser`
--
ALTER TABLE `adminuser`
  ADD PRIMARY KEY (`idUserAdmin`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`),
  ADD KEY `cliente_FK` (`idUsuarioCliente`),
  ADD KEY `cliente_FK_1` (`idDistrito`);

--
-- Indices de la tabla `distrito`
--
ALTER TABLE `distrito`
  ADD PRIMARY KEY (`idDistrito`);

--
-- Indices de la tabla `metodoPago`
--
ALTER TABLE `metodoPago`
  ADD PRIMARY KEY (`idMetodoPago`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `pedido_FK` (`idProducto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `producto_FK` (`idTipoProducto`);

--
-- Indices de la tabla `tipoProducto`
--
ALTER TABLE `tipoProducto`
  ADD PRIMARY KEY (`idTipoProducto`);

--
-- Indices de la tabla `usuarioCliente`
--
ALTER TABLE `usuarioCliente`
  ADD PRIMARY KEY (`idUsuarioCliente`);

--
-- Indices de la tabla `ventaPedido`
--
ALTER TABLE `ventaPedido`
  ADD PRIMARY KEY (`idVentaPedido`),
  ADD KEY `ventaPedido_FK` (`idPedido`),
  ADD KEY `ventaPedido_FK_1` (`idMetodoPago`),
  ADD KEY `ventaPedido_FK_2` (`idCliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adminuser`
--
ALTER TABLE `adminuser`
  MODIFY `idUserAdmin` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `distrito`
--
ALTER TABLE `distrito`
  MODIFY `idDistrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `metodoPago`
--
ALTER TABLE `metodoPago`
  MODIFY `idMetodoPago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `tipoProducto`
--
ALTER TABLE `tipoProducto`
  MODIFY `idTipoProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarioCliente`
--
ALTER TABLE `usuarioCliente`
  MODIFY `idUsuarioCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `ventaPedido`
--
ALTER TABLE `ventaPedido`
  MODIFY `idVentaPedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_FK` FOREIGN KEY (`idUsuarioCliente`) REFERENCES `usuarioCliente` (`idUsuarioCliente`),
  ADD CONSTRAINT `cliente_FK_1` FOREIGN KEY (`idDistrito`) REFERENCES `distrito` (`idDistrito`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_FK` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_FK` FOREIGN KEY (`idTipoProducto`) REFERENCES `tipoProducto` (`idTipoProducto`);

--
-- Filtros para la tabla `ventaPedido`
--
ALTER TABLE `ventaPedido`
  ADD CONSTRAINT `ventaPedido_FK` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`),
  ADD CONSTRAINT `ventaPedido_FK_1` FOREIGN KEY (`idMetodoPago`) REFERENCES `metodoPago` (`idMetodoPago`),
  ADD CONSTRAINT `ventaPedido_FK_2` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
