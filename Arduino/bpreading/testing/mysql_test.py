# -*- coding: UTF-8 -*-

import MySQLdb

def db_execute(sql):
    db = MySQLdb.connect(host='localhost', user='root', passwd='Jinghan1', db='elec5622', port=3306)
    cursor = db.cursor()
    try:
   # 执行sql语句
       cursor.execute(sql)
   # 提交到数据库执行
       db.commit()
    except:
   # 发生错误时回滚
       db.rollback()


def read_file(file_path):
    sql_lines = []
    with open(file_path, 'r') as file:
        for line in file.readlines():
            sql = "INSERT INTO `testmodel_user_daily`(user_id, \
                  monitor_type, pulse, diastolic, systolic) \
                   VALUES ('%s', '%s', '%s', '%s', '%s' )" % \
                  ('Mac', '1', '70', '60', '90')
            sql_lines.append(sql)

    return '\r\n'.join(sql_lines)
    
    
def data_transfer():

    import MySQLdb


# 打开数据库连接
    db = MySQLdb.connect("localhost","root","Jinghan1","elec5622" )

# 使用cursor()方法获取操作游标 
    cursor = db.cursor()

# SQL 插入语句
    sql = "INSERT INTO `testmodel_user_daily`(user_id, \
       monitor_type, pulse, diastolic, systolic) \
       VALUES ('%s', '%s', '%s', '%s', '%s' )" % \
       ('Mac', '1', '70', '60', '90')
    try:
   # 执行sql语句
       cursor.execute(sql)
   # 提交到数据库执行
       db.commit()
    except:
   # 发生错误时回滚
       db.rollback()

# 关闭数据库连接
    db.close()

    return;

sql_lines = read_file('test-1.txt')
db_execute(sql_lines)    

