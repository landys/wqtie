create database `app_wqtphp` default character set = utf8;

use app_wqtphp;

create table `tbl_user` (
`userId` int(10) unsigned NOT NULL auto_increment,
`userName` varchar(50),
`userPwd` varchar(50),
`priviledge` int(10) unsigned,
`createDate` datetime,
PRIMARY KEY using BTREE (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `tbl_wedding_card` (
`cardId` int(10) unsigned NOT NULL auto_increment,
`userId` int(10) unsigned,
`groom` varchar(50),
`bride` varchar(50),
`title` varchar(255),
`weddingDate` datetime,
`weddingDateDesc` varchar(255),
`phone` varchar(50),
`weixin` varchar(255),
`note` varchar(1000),
`story` varchar(3000),
`videoUrl` varchar(1000),
`musicUrl` varchar(1000),
`coverPhotoUrl` varchar(1000),
`placeName` varchar(255),
`placeAddress` varchar(500),
`placeUrl` varchar(1000),
`placePhone` varchar(50),
`placeLongitude` varchar(50),
`placeLatitude` varchar(50),
`agentName` varchar(255),
`agentPhone` varchar(50),
`agentWeixin` varchar(255),
`agentQcodePath` varchar(255),
`agentWebSite` varchar(255),
`agentWeibo` varchar(255),
`status` int(10) unsigned,
`createDate` datetime,
PRIMARY KEY using btree (`cardId`),
CONSTRAINT `FK_tbl_wedding_card_tbl_user_userId` FOREIGN KEY (`userId`) REFERENCES `tbl_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table tbl_photo (
`photoId` int(10) unsigned NOT NULL auto_increment,
`cardId` int(10) unsigned,
`title` varchar(255),
`url` varchar(1000),
`createDate` datetime,
PRIMARY KEY using btree (`photoId`),
CONSTRAINT `FK_tbl_photo_tbl_wedding_card_cardId` FOREIGN KEY (`cardId`) REFERENCES `tbl_wedding_card` (`cardId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- feedback tables --
create table tbl_feedback (
`feedbackId` int(10) unsigned NOT NULL auto_increment,
`cardId` int(10) unsigned,
`guestName` varchar(255),
`attendees` int(10) unsigned,
`phone` varchar(50),
`wish` varchar(2000),
`createDate` datetime,
PRIMARY KEY  using btree (`feedbackId`),
CONSTRAINT `FK_tbl_feedback_tbl_wedding_card_cardId` FOREIGN KEY (`cardId`) REFERENCES `tbl_wedding_card` (`cardId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- insert initial date --
insert into tbl_user (userName, userPwd, priviledge, createDate) value ('admin', '654321', 0, '2013-10-18');

