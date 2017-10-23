#!/usr/bin/python
# -*- coding: UTF-8 -*-




def data_transfer():
    import MySQLdb



# 打开数据库连接
    db = MySQLdb.connect(host='localhost', user='root', passwd='Jinghan1', db='elec_test', port=3306 )

# 使用cursor()方法获取操作游标
    cursor = db.cursor()

# SQL 插入语句
    sql = "INSERT INTO elec_test.testmodel_exercise_monitor(user_id, \
       monitor_type, pulse, diastolic, systolic) \
       VALUES ('Mac', '1', '70', '80', '90');"
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

    return