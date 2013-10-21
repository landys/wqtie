create database `weiqingtie` default character set = utf8;

use weiqingtie;

create table `tbl_user` (
`userId` int(10) unsigned NOT NULL auto_increment,
`userName` varchar(50) NOT NULL,
`userPwd` varchar(50) NOT NULL,
`priviledge` int(10) unsigned NOT NULL,
`createDate` datetime NOT NULL,
PRIMARY KEY using BTREE (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `tbl_place` (
`placeId` int(10) unsigned NOT NULL auto_increment,
`name` varchar(255),
`address` varchar(500),
`url` varchar(1000),
`phone` varchar(50),
`longitude` varchar(50),
`latitude` varchar(50),
PRIMARY KEY using btree (`placeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


create table `tbl_agent` (
`agentId` int(10) unsigned NOT NULL auto_increment,
`name` varchar(255) NOT NULL,
`phone` varchar(50),
`weixin` varchar(255),
`weibo` varchar(255),
`qq` varchar(50),
`qcodePath` varchar(255),
`address` varchar(255),
`webSite` varchar(255),
`createDate` datetime NOT NULL,
PRIMARY KEY using btree (`agentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


create table `tbl_wedding_card` (
`cardId` int(10) unsigned NOT NULL auto_increment,
`userId` int(10) unsigned NOT NULL,
`createDate` datetime NOT NULL,
`groom` varchar(50),
`bride` varchar(50),
`title` varchar(255),
`weddingDate` datetime,
`weddingDateDesc` varchar(255),
`phone` varchar(50),
`note` varchar(1000),
`story` varchar(3000),
`video` varchar(1000),
`placeId` int(10) unsigned,
`agentId` int(10) unsigned,
`templateId` int(10) unsigned,
`musicId` int(10) unsigned,
`status` int(10) unsigned,
PRIMARY KEY using btree (`cardId`),
CONSTRAINT `FK_tbl_wedding_card_tbl_user_userId` FOREIGN KEY (`userId`) REFERENCES `tbl_user` (`userId`),
CONSTRAINT `FK_tbl_wedding_card_tbl_place_placeId` FOREIGN KEY (`placeId`) REFERENCES `tbl_place` (`placeId`),
CONSTRAINT `FK_tbl_wedding_card_tbl_agent_agentId` FOREIGN KEY (`agentId`) REFERENCES `tbl_agent` (`agentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table tbl_asset (
`assetId` int(10) unsigned NOT NULL auto_increment,
`userId` int(10) unsigned NOT NULL,
`title` varchar(255),
`desc` varchar(1000),
`createDate` datetime NOT NULL,
`path` varchar(1000),
`type` int(10) unsigned NOT NULL,
PRIMARY KEY using btree (`assetId`),
CONSTRAINT `FK_tbl_asset_tbl_user_userId` FOREIGN KEY (`userId`) REFERENCES `tbl_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table tbl_card_asset (
`cardId` int(10) unsigned NOT NULL,
`assetId` int(10) unsigned NOT NULL,
PRIMARY KEY (`cardId`,`assetId`),
KEY `FK_tbl_card_asset_tbl_asset_assetId` (`assetId`),
CONSTRAINT `FK_tbl_card_asset_tbl_asset_assetId` FOREIGN KEY (`assetId`) REFERENCES `tbl_asset` (`assetId`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `FK_tbl_card_asset_tbl_wedding_card_cardId` FOREIGN KEY (`cardId`) REFERENCES `tbl_wedding_card` (`cardId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- feedback tables --
create table tbl_feedback (
`feedbackId` int(10) unsigned NOT NULL auto_increment,
`cardId` int(10) unsigned NOT NULL,
`guestName` varchar(255),
`attendees` int(10) unsigned,
`phone` varchar(50),
`wish` varchar(2000),
`createDate` datetime NOT NULL,
PRIMARY KEY  using btree (`feedbackId`),
CONSTRAINT `FK_tbl_feedback_tbl_wedding_card_cardId` FOREIGN KEY (`cardId`) REFERENCES `tbl_wedding_card` (`cardId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- insert initial date --
insert into tbl_user (userName, userPwd, priviledge, createDate) value ('admin', '654321', 0, '2013-10-10');
insert into tbl_agent (name, createDate) value("某某婚庆", '2013-10-10');
insert into tbl_agent (name, createDate) value("天天婚庆", '2013-10-10');

