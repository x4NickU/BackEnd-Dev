/*
Navicat MySQL Data Transfer

Source Server         : Mia
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : mrgio

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-01-10 23:10:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `wp_deeplosystem`
-- ----------------------------
DROP TABLE IF EXISTS `wp_deeplosystem`;
CREATE TABLE `wp_deeplosystem` (
  `ID` int(250) NOT NULL,
  `diamonds` int(250) NOT NULL DEFAULT 0,
  `moneySpent` int(250) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of wp_deeplosystem
-- ----------------------------
