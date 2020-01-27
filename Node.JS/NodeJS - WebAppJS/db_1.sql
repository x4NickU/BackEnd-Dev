/*
Navicat MySQL Data Transfer

Source Server         : Mia
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : db_1

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-01-27 13:16:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `composition`
-- ----------------------------
DROP TABLE IF EXISTS `composition`;
CREATE TABLE `composition` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `set` text DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of composition
-- ----------------------------
INSERT INTO `composition` VALUES ('1', 'Zaino1', '[[\"marca\",\"55556\",\"55557\"],[\"marca1\",\"Zaino12\",\"Zaino12\"]]');
INSERT INTO `composition` VALUES ('2', 'Zaino2', '[[\"marca1\",\"Zaino1\",\"Zaino1\"],[\"marca2\",\"Zaino2\",\"Zaino2\"]]');

-- ----------------------------
-- Table structure for `products`
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `serial` varchar(255) DEFAULT NULL,
  `price` float(10,5) DEFAULT 0.00000,
  `name` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `series` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('1', '55556', '1.20000', 'Uno', 'Uno', 'Uno');
INSERT INTO `products` VALUES ('2', '55557', '1.20000', 'Due', 'Uno', 'Uno');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` longtext DEFAULT NULL,
  `name` text DEFAULT NULL,
  `subname` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `created_at` text DEFAULT NULL,
  `payed` int(11) DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('44', 'nick', '$2b$05$ecI.Y2h5MzrlRNKefxjkg.StzY3i1mD1EiidN1N7XaR7m3lj2xnH.', 'Nicholas', 'Fialdini', 'ddjnick03@gmail.com', '2020/1/8', '1');
INSERT INTO `users` VALUES ('45', 'francesco', '$2b$05$NoErtubJ6ZvahKFLKfaZ7.bNx5CVozpBtcCR6lpRlXhQJtHFZXj2S', 'Francesco', 'Facchinetti', 'francesco@gmail.com', '2020/1/8', '1');
INSERT INTO `users` VALUES ('46', 'Alex', '$2b$05$zpGCVqVGYBPkuWag8qbf7ecK0InHmtZSVWIAmsKyG5XgmW9ms8qte', 'Alex', 'Delsarto', 'alexajsajsa@gmail.com', '2020/1/25', '0');
