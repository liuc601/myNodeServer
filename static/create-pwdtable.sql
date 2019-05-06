SET NAMES UTF8;
DROP DATABASE IF EXISTS nodedb; 
CREATE DATABASE nodedb CHARSET=UTF8;
USE nodedb;
/*
    创建密码数据库，并且初始化相对应的字段
    自增id
    密码的命名
    账号
    密码
    创建时间
    修改时间
    备注
*/
CREATE TABLE pwdtable(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	pName VARCHAR(64),
	pAccount VARCHAR(64),
	pwd VARCHAR(128),
	createTime VARCHAR(128),
	mdfTime VARCHAR(128),
	msg VARCHAR(128)
);
INSERT INTO pwdtable VALUES(
    NULL,
    "测试银行",
    "ai66666",
    "ai7777777",
    1556960256760,
    1556960256760,
    '这里是备注'
);
INSERT INTO pwdtable VALUES(
    NULL,
    "测试数据",
    "ai98575545",
    "ai7777777",
    1556960256760,
    1556960256760,
    '这里是备注fsgrgsdr'
);
